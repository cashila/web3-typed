# Web3 declaration file

## Install

```
typings install --save bignumber.js
npm install --save-dev git+https://git@github.com/cashila/web3-typed
```

## Usage

### Basic Usage

```typescript
import * as Web3  from 'web3';

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')),
    eth = web3.eth;

// fethc latest block
eth.getBlock('latest', (err, block) => {
    if (err || !block) {
        return;
    }
    console.log(`Gas used: ${block.gasUsed}`);    
});

// send 1 wei
eth.sendTransaction({
    to: '0x1212121212121212121212121212121212121212',
    value: 1
}, (err, txHash) => {
    if (err) {
        return;
    }
    console.log(`Transaction hash: ${txHash}`);
});
```

### Interacting with contracts
```typescript
import BigNumber from 'bignumber.js';
import {Contract, TransactionRequest} from 'web3/types';

// here we define contract interface
interface Token extends Contract {
    totalSupply(): BigNumber;
    transfer(to: string, value: number|BigNumber, transactionRequest?: TransactionRequest): void;
    balanceOf(address: string): BigNumber;
}

// instantiate contract
var token = web3.eth.contract<Token>(abi).at('0x888666ca69e0f178ded6d75b5726cee99a87d698');

// fetch total supply
var totalSupply = token.totalSupply();
console.info(`Total supply: ${totalSupply.toFixed()}`);

// fetch balance of some user 
var balance = token.balanceOf('0x1212121212121212121212121212121212121212');
console.info(`Total supply: ${balance.toFixed()}`);
```

If you need access to request, call or sendTransaction method on contract functions:
```typescript

// Specify transfer arguments
interface TransferMethodMethod {
  (address: string, value: BigNumber | number, options?: TransactionRequest): boolean;
}
// Actual transfer type needs to extends both above interface and Method
interface TransferMethod extends TransferMethodMethod, Method<TransferMethodMethod> {}

interface Token extends Contract {
  currency: string;
  address: string;
  coldAddress: string;
  transfer: TransferMethod;
}

let request = token.transfer.request('0x1212121212121212121212121212121212121212', 123);
```