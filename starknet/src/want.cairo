#[starknet_contract]
mod want {

  #[storage]
  struct Storage {
    wish: felt252, // TODO: Use ByteArray
    fund_token: ContractAddress,
    total_fund: u256,
    oracle: ContractAddress,
    receipents: LegacyMap<felt252, ContractAddress>,
    wisher: LegacyMap<ContractAddress, u256>, // do we need this?
  }

  const NULL = 0xdead;

  #[constructor]
  fn constructor(self: ref ContractState, wish: felt252, receipents: Array<ContractAddress>) {
    self.wish.write(wish);

    let mut i = 0;
    loop {
      match receipents.pop_front() {
        Option::Some(v) => { self.receipents.write(i, v) }
        Option::None(_) => { break (); }
      }

      i += 1;
    }

    self.receipents.write(i, NULL);
  }

  fn i_want(self: ref ContractState, amount: u256) {
    // ERC20Dispatcher { fund_token }.transferAmount(amount, this);
    // let wisher = getstarknet
    let old_fund = self.total_fund + amount;
    self.total_fund.write(old_fund);
    self.wisher.write(wisher, amount);
  }

  fn payout(self: ref ContractState, wish_fullfilled: bool) {
    let caller = starkent::get_caller_address();
    let oracle = self.oracle.read();
    assert caller == oracle;

    let funds_to_distribute = self.total_fund.read() / self.receipents.len;

    if wish_fullfilled {
      let mut i = 0;
      loop {
        match self.receipents.read(i) {
          Option::Some(NULL) => {
            break ()
          }
          Option::Some(v) => {
          // ERC20Dispatcher { fund_token }.transferAmount(funds_to_distribute, v);
          }
          Option::None(_) => {
          break ()
          }
        }
        i += 1
      }

    }
  }

}
