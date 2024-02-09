use starknet::ContractAddress;

#[starknet::interface]
trait IWantIt<TContractState> {
    fn lfgoooo(ref self: TContractState, token_address: ContractAddress, amount: u256);
    // TODO: implement a lfgoooo_from.
    fn payout(ref self: TContractState, token_addresses: Array<ContractAddress>);
    // This function 'should' return the funds in the pool to the
    // participants. However, this is likely much too expensive
    // due to the storage costs of all the participant addresses.
    // Instead I suggest hardcoding a 'stale' handler address
    // which is managed by the foundation behind wantit
    // who's responsibility it is to collect via indexing
    // all transfers that have gone into this pool and
    // publishing this list publicly before redistributing
    // the funds to the participants in this list.
    // State proofs may be cheap enough to do this in future.
    // fn stale(self: @TContractState);
}

#[starknet::contract]
mod want_pool {
  use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
  use starknet::{get_contract_address, get_caller_address, ContractAddress};
  use alexandria_storage::list::{List, ListTrait};

  #[derive(Drop, Clone, Serde, Store)]
  struct Recipient {
    address: ContractAddress,
    shares: u256,
  }

  #[storage]
  struct Storage {
    wish: felt252, // TODO: Use ByteArray
    title: felt252, // TODO: Use ByteArray
    oracle: ContractAddress,
    recipients: List<ContractAddress>,
    // The sum of all shares cannot exceed 2^256
    recipient_shares: List<u256>,
    // TODO: remove this and replace with an indexing solution
    // Type: (UserAddress, TokenAddress) -> u256
    participation_tracker: LegacyMap<(ContractAddress, ContractAddress), u256>,
  }

  #[constructor]
  fn constructor(
    ref self: ContractState,
    // The title of the event
    title: felt252,
    // A short description of what is required to trigger the payout
    wish: felt252,
    // The accounts which will be rewarded for the event occuring
    recipients: Array<ContractAddress>,
    // The share of the total pool each recipient will receive
    recipient_shares: Array<u256>,
    // The oracle which will trigger the payout
    oracle: ContractAddress,
  ) {
    self.title.write(title);
    self.wish.write(wish);
    let mut recipients_list = self.recipients.read();
    let _ = recipients_list.append_span(recipients.span());
    let mut recipient_shares_list = self.recipient_shares.read();
    let _ = recipient_shares_list.append_span(recipient_shares.span());
    self.oracle.write(oracle);
  }

  #[abi(embed_v0)]
  impl WantIMPL of super::IWantIt<ContractState> {

    fn lfgoooo(ref self: ContractState, token_address: ContractAddress, amount: u256) {
      let this = get_contract_address();
      let sender = get_caller_address();
      IERC20Dispatcher{ contract_address: token_address }.transfer_from(sender, this, amount);
      let given = self.participation_tracker.read((sender, token_address));
      self.participation_tracker.write((sender, token_address), given + amount);
    }

    fn payout(ref self: ContractState, token_addresses: Array<ContractAddress>) {
      let caller = get_caller_address();
      let oracle = self.oracle.read();
      let this = get_contract_address();

      assert(caller == oracle, 'Only oracle can trigger payout');
      // We will compute the total number of proportional shares
      let recipient_shares = @self.recipient_shares.read();
      let recipients = @self.recipients.read();

      let mut i = 0;
      let mut total_shares: u256 = 0;
      loop {
        if i == recipient_shares.len() {
          break;
        }
        total_shares += recipient_shares[i];
      };

      // Similar to below but we loop through tokens first and then recipients
      let mut i = 0;
      loop {
        if i == token_addresses.len() {
          break;
        }
        let token_address = *token_addresses.at(i);
        let total_amount = IERC20Dispatcher{ contract_address: token_address }.balance_of(this);
        let mut j = 0;
        loop {
          if j == recipient_shares.len() {
            break;
          }
          let recipient_shares = recipient_shares[j];
          let amount = (total_amount * recipient_shares) / total_shares;
          IERC20Dispatcher{ contract_address: token_address }.transfer(recipients[j], amount);
        };
      };
    }
  }
}
