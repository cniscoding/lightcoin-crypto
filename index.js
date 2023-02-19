// let balance = 500.00;
class Transaction {
  constructor( amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    // checks balance to see if transaction is allowed
    if(!this.isAllowed()){
      return false
    }
    //keep track of the time of the transaction
    this.time = new Date();
    // add the transaction to the account
    this.account.addTransaction(this)
    return true
  }
}

class Deposit extends Transaction {
  //update the balance in the account
  // commit() {
  //   this.account.balance += this.amount;
  // }
  get value() {
    return this.amount;
  }
  //deposits always allowed
  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  // Pass in the account that the withdrawal is for
  get value() {
    return -this.amount;
  }
  // check balance to allow or not
  isAllowed() {
    return(this.account.balance - this.amount >=0)
  }
}

class Account {
  constructor() {
    this.transactions = [];
    // have the account balance start at $0 since that makes more sense.
  }

  get balance() {
    // calculate the balance using transaction objects
    let balance = 0;
    for (let t of this.transactions) {
    	balance += t.value;
    }
    return balance;
  }


  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
// const myAccount = new Account('snow-patrol')

// t1 = new Withdrawal(50.25, myAccount);
// t1.commit();
// console.log('Transaction 1:', t1);

// t2 = new Withdrawal(9.99, myAccount);
// t2.commit();
// console.log('Transaction 2:', t2);

// console.log('Balance:', myAccount.balance);

// t3 = new Deposit(120, myAccount);
// t3.commit();
// console.log('Transaction 3:', t3)
// console.log('Balance:', myAccount.balance);

// const myAccount = new Account('billybob');

// console.log('Starting Balance:', myAccount.balance);

// const t1 = new Deposit(120.00, myAccount);
// t1.commit();

// const t2 = new Withdrawal(50.00, myAccount);
// t2.commit();

// console.log('Ending Balance:', myAccount.balance);

const myAccount = new Account();

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);
