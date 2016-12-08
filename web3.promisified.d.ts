// Type definitions for web3
// Project: https://github.com/ethereum/web3.js
// Definitions by: alesl https://github.com/alesl/
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "web3" {
  import BigNumber from "bignumber.js";
  import { Definition as AbiDefinition } from "web3/abi";

  type BlockNumberOrHash = number | string;
  type VersionCallback = (err: any, version: string) => void;
  type IsSyncingCallback = (err: any, sync: boolean | Web3.SyncingResult) => void;
  type GetSyncingCallback = (err: any, result: Web3.SyncingResult) => void;
  type GetBalanceCallback = (err: any, result: BigNumber) => void;
  type GetStorageAtCallback = (err: any, storage: string) => void;
  type GetCodeCallback = (err: any, storage: string) => void;
  type GetBlockCallback = (err: any, block: Web3.Block | null) => void;
  type GetBlockTxCountCallback = (err: any, count: number) => void;
  type GetUncleCallback = GetBlockCallback;
  type GetTransactionCallback = (err: any, transaction: Web3.Transaction | null) => void;
  type GetTxFromBlockCallback = GetTransactionCallback;
  type GetTxReceiptCallback = (err: any, receipt: Web3.TransactionReceipt | null) => void;
  type GetTxCountCallback = (err: any, count: number) => void;
  type SendTxCallback = (err: any, transaction: string) => void;
  type SignCallback = (err: any, signed: string) => void;
  type CallCallback = (err: any, result: string) => void;
  type EstimateGasCallback = (err: any, gasEstimation: number) => void;
  type FilterCallback = (err: any, result: string | Web3.Log) => void;
  type GetListeningCallback = (err: any, listening: boolean) => void;
  type GetPeerCountCallback = (err: any, peerCount: number) => void;
  type GetCompilerCallback = (err: any, compilers: string[]) => void;
  type CompileCallback = (err: any, contractAndCompilerInfo: any) => void;

  namespace Web3 {
    export type WeiUnit = "kwei" | "ada" | "mwei" | "babbage" | "gwei" | "shannon" | "szabo" | "finney" | "ether" | "kether" | "grand" | "einstein" | "mether" | "gether" | "tether";

    export class Version {
      /**
       * The ethereum js api version
       */
      readonly api: string;

      /**
       * The client/node version
       */
      readonly node: string;

      /**
       * The network protocol version
       */
      readonly network: string;

      /**
       * The ethereum protocol version
       */
      readonly ethereum: string;

      /**
       * The whisper protocol version
       */
      readonly whisper: string;

      /**
       * The client/node version
       */
      getNode(callback: VersionCallback): void;
      /**
       * The client/node version
      */
      getNodeAsync(): Promise<string>;

      /**
       * The network protocol version
       */
      getNetwork(callback: VersionCallback): void;
      /**
       * The network protocol version
      */
      getNetworkAsync(): Promise<string>;

      /**
       * The ethereum protocol version
       */
      getEthereum(callback: VersionCallback): void;
      /**
       * The ethereum protocol version
      */
      getEthereumAsync(): Promise<string>;

      /**
       * The whisper protocol version
       */
      getWhisper(callback: VersionCallback): void;
      /**
       * The whisper protocol version
      */
      getWhisperAsync(): Promise<string>;
    }

    export interface Sha3Options {
      /**
       * Set encoding to hex if the string to hash is encoded in hex. A leading 0x will be automatically ignored
       */
      encoding?: string;
    }

    export interface SyncingResult {
      /**
       * The block number where the sync started.
       */
      startingBlock: number;

      /**
       * The block number where at which block the node currently synced to already.
       */
      currentBlock: number;

      /**
       * The estimated block number to sync to.
       */
      highestBlock: number;
    }

    export class IsSyncing {
      /**
       * Adds another callback, which will be called when the node starts or stops syncing.
       */
      addCallback(callback?: GetSyncingCallback): IsSyncing;
      /**
       * Adds another callback, which will be called when the node starts or stops syncing.
      */
      addCallbackAsync(): Promise<Web3.SyncingResult>;

      /**
       * Stops the syncing callbacks.
       */
      stopWatching(): void;
    }

    export interface Block {
      /**
       * the block number. null when its pending block
       */
      number: number | null;

      /**
       * 32 Bytes - hash of the block. null when its pending block
       */
      hash: string | null;

      /**
       * 32 Bytes - hash of the parent block
       */
      parentHash: string;

      /**
       * 8 Bytes - hash of the generated proof-of-work. null when its pending block
       */
      nonce: string | null;

      /**
       * 32 Bytes - SHA3 of the uncles data in the block
       */
      sha3Uncles: string;

      /**
       * 256 Bytes - the bloom filter for the logs of the block. null when its pending block
       */
      logsBloom: string | null;

      /**
       * 32 Bytes - the root of the transaction trie of the block
       */
      transactionsRoot: string;

      /**
       * 32 Bytes - the root of the final state trie of the block
       */
      stateRoot: string;

      /**
       * 20 Bytes - the address of the beneficiary to whom the mining rewards were given
       */
      miner: string;

      /**
       * integer of the difficulty for this block
       */
      difficulty: BigNumber;

      /**
       * integer of the total difficulty of the chain until this block
       */
      totalDifficulty: BigNumber;

      /**
       * the "extra data" field of this block
       */
      extraData: string;

      /**
       * integer the size of this block in bytes
       */
      size: number;

      /**
       * the maximum gas allowed in this block
       */
      gasLimit: number;

      /**
       * the total used gas by all transactions in this block
       */
      gasUsed: number;

      /**
       * the unix timestamp for when the block was collated
       */
      timestamp: number;

      /**
       * Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter
       */
      transactions: string[] | Transaction[];

      /**
       * Array of uncle hashes
       */
      uncles: string[];
    }

    export interface Transaction {
      /**
       * 32 Bytes - hash of the transaction
       */
      hash: string;

      /**
       * the number of transactions made by the sender prior to this one
       */
      nonce: number;

      /**
       * 32 Bytes - hash of the block where this transaction was in. null when its pending
       */
      blockHash: string | null;

      /**
       * block number where this transaction was in. null when its pending
       */
      blockNumber: number | null;

      /**
       * integer of the transactions index position in the block. null when its pending
       */
      transactionIndex: number | null;

      /**
       * 20 Bytes - address of the sender
       */
      from: string;

      /**
       * 20 Bytes - address of the receiver. null when its a contract creation transaction
       */
      to: string | null;

      /**
       * value transferred in Wei
       */
      value: BigNumber;

      /**
       * gas price provided by the sender in Wei
       */
      gasPrice: BigNumber;

      /**
       * gas provided by the sender
       */
      gas: number;

      /**
       * the data sent along with the transaction
       */
      input: string;
    }

    export interface TransactionReceipt {
      /**
       * 32 Bytes - hash of the block where this transaction was in
       */
      blockHash: string;

      /**
       * block number where this transaction was in
       */
      blockNumber: number;

      /**
       * 32 Bytes - hash of the transaction
       */
      transactionHash: string;

      /**
       * integer of the transactions index position in the block
       */
      transactionIndex: number;

      /**
       * 20 Bytes - address of the sender
       */
      from: string;

      /**
       * 20 Bytes - address of the receiver. null when its a contract creation transaction
       */
      to: string;

      /**
       * The total amount of gas used when this transaction was executed in the block
       */
      cumulativeGasUsed: number;

      /**
       * The amount of gas used by this specific transaction alone
       */
      gasUsed: number;

      /**
       * 20 Bytes - The contract address created, if the transaction was a contract creation, otherwise null
       */
      contractAddress: string;

      /**
       * Array of log objects, which this transaction generated
       */
      logs: Log[];
    }

    export interface Log {
      /**
       * 32 Bytes - address from which this log originated
       */
      address: string;

      /**
       * 32 Bytes - hash of the block where this log was in. null when its pending. null when its pending log
       */
      blockHash: string;

      /**
       * the block number where this log was in. null when its pending. null when its pending log
       */
      blockNumber: number;

      /**
       * contains one or more 32 Bytes non-indexed arguments of the log
       */
      data: string;

      /**
       * integer of the log index position in the block. null when its pending log
       */
      logIndex: number;

      /**
       * Array of 0 to 4 32 Bytes DATA of indexed log arguments. (In solidity: The first topic is the hash of
       * the signature of the event (e.g. Deposit(address,bytes32,uint256)), except if you declared the event
       * with the anonymous specifier.)
       */
      topics: string[];

      /**
       * integer of the transactions index position log was created from. null when its pending log
       */
      transactionHash: string;

      /**
       * 32 Bytes - hash of the transactions this log was created from. null when its pending log
       */
      transactionIndex: number;
    }

    export interface TransactionRequest {
      /**
       * The address for the sending account. Uses the web3.eth.defaultAccount property, if not specified.
       */
      from?: string;

      /**
       * The destination address of the message, left undefined for a contract-creation transaction.
       */
      to?: string;

      /**
       * The value transferred for the transaction in Wei, also the endowment if it's a contract-creation transaction
       */
      value?: number | string | BigNumber;

      /**
       * The amount of gas to use for the transaction (unused gas is refunded)
       */
      gas?: number | string | BigNumber;

      /**
       * The price of gas for this transaction in wei, defaults to the mean network gas price
       */
      gasPrice?: number | string | BigNumber;

      /**
       * Either a byte string containing the associated data of the message, or in the case of a contract-creation transaction, the initialisation code
       */
      data?: string;

      /**
       * Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce
       */
      nonce?: number;
    }

    export interface FilterOptions {
      /**
       * The number of the earliest block (latest may be given to mean the most recent and pending currently mining, block). By default latest.
       */
      fromBlock?: BlockNumberOrHash;

      /**
       * The number of the latest block (latest may be given to mean the most recent and pending currently mining, block). By default latest.
       */
      toBlock?: BlockNumberOrHash;

      /**
       * An address or a list of addresses to only get logs from particular account(s).
       */
      address?: string | string[];

      /**
       *  An array of values which must each appear in the log entries. The order is important, if you want to leave topics out use null, e.g. [null, '0x00...']. You can also pass another array for each topic with options for that topic e.g. [null, ['option1', 'option2']]
       */
      topics?: any[];
    }

    export class Filter {
      get(callback: (err: any, result: any) => void): void;
      getAsync(): Promise<any>;
      watch(callback: FilterCallback): void;
      watchAsync(): Promise<string | Web3.Log>;
      stopWatching(): void;
    }

    export interface ContractFactory<T extends Contract> {
      /**
       * Deploy new contract
       */
      new (...args: any[]): T;

      /**
       * Instantiate contract by address
       */
      at(address: string): T;
    }

    export interface Method<R> {
      (): R;
    }

    export interface MethodObject<RET, CALL extends Method<RET>, REQUEST extends Method<any>, SEND extends Method<string>, DATA extends Method<string>> {
      call: CALL;
      request: REQUEST;
      sendTransaction: SEND;
      getData: DATA;
    }

    export class Contract {
      readonly abi: AbiDefinition;

      /**
       * Contract address
       */
      readonly address: string;

      /**
       * Transaction that mined this contract (only available at deploy)
       */
      readonly transactionHash: string | null;

      /**
       * Will call the callback for all events which are created by this contract
       */
      allEvents(options: "latest" | "pending" | FilterOptions, callback: FilterCallback): Filter;
      /**
       * Will call the callback for all events which are created by this contract
      */
      allEventsAsync(options: "latest" | "pending" | FilterOptions): Promise<string | Web3.Log>;
      /**
       * Will call the callback for all events which are created by this contract
       */
      allEvents(callback: FilterCallback): Filter;
      /**
       * Will call the callback for all events which are created by this contract
      */
      allEventsAsync(): Promise<string | Web3.Log>;
      /**
       * Will call the callback for all events which are created by this contract
       */
      allEvents(options?: "latest" | "pending" | FilterOptions, ): Filter;
    }

    module providers {
      export interface Provider {
        /**
         * Should be called to check if a connection to a node exists
         */
        isConnected(): boolean;
      }

      export class HttpProvider implements Provider {
        constructor(host?: string);
        isConnected(): boolean;
      }
      export class IpcProvider implements Provider {
        constructor(path: string, net: any);
        isConnected(): boolean;
      }
    }
  }



  class Web3 {
    readonly version: Web3.Version;

    /**
     * Contains the ethereum blockchain related methods.
     */
    readonly eth: Eth;

    /**
     * Contains the ethereum network related methods.
     */
    readonly net: Net;

    /**
     * Will contain the current provider, if one is set. This can be used to check if mist etc. set already a provider.
     */
    readonly currentProvider: Web3.providers.Provider;

    /**
     * The web3 object provides all methods.
     *
     * @example
     * // create an instance of web3 using the HTTP provider.
     * // NOTE in mist web3 is already available, so check
     * // first if its available before instantiating
     * var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
     */
    constructor(provider?: Web3.providers.Provider);

    /**
     * Should be called to check if a connection to a node exists
     */
    isConnected(): boolean;

    /**
     * Should be called to set provider
     */
    setProvider(provider: Web3.providers.Provider): void;

    /**
     * Should be called to reset state of web3. Resets everything except manager. Uninstalls all filters. Stops polling.
     */
    reset(keepSyncing?: boolean): void;

    /**
     * @param value The string to hash using the Keccak-256 SHA3 algorithm
     * @param options Set encoding to hex if the string to hash is encoded in hex. A leading 0x will be automatically ignored
     */
    sha3(value: string, options?: Web3.Sha3Options): string;

    /**
     * Converts any value into HEX
     *
     * @param value The value to parse to HEX. If its an object or array it will be JSON.stringify first.
     * If its a BigNumber it will make it the HEX value of a number.
     */
    toHex(value: any): string;

    /**
     * Converts a HEX string into a ASCII string
     *
     * @param value A HEX string to be converted to ascii
     */
    toAscii(value: string): string;

    /**
     * Converts any ASCII string to a HEX string.
     *
     * @param value An ASCII string to be converted to HEX.
     * @param padding The number of bytes the returned HEX string should have.
     */
    fromAscii(value: string, padding?: number): string;

    /**
     * Converts a HEX string to its number representation.
     *
     * @param value An HEX string to be converted to a number
     */
    toDecimal(value: string): number;

    /**
     * Converts a number or number string to its HEX representation.
     *
     * @param value A number to be converted to a HEX string.
     */
    fromDecimal(value: number | string): string;

    /**
     * Converts a number of wei into the following ethereum units:
     * - kwei/ada
     * - mwei/babbage
     * - gwei/shannon
     * - szabo
     * - finney
     * - ether
     * - kether/grand/einstein
     * - mether
     * - gether
     * - tether
     *
     * @param value
     * @param unit One of kwei/ada, mwei/babbage, gwei/shannon, szabo, finney, ether, kether/grand/einstein, mether, gether, tether
     */
    fromWei(value: number | string, unit: Web3.WeiUnit): String;

    /**
     * Converts a number of wei into the following ethereum units:
     * - kwei/ada
     * - mwei/babbage
     * - gwei/shannon
     * - szabo
     * - finney
     * - ether
     * - kether/grand/einstein
     * - mether
     * - gether
     * - tether
     *
     * @param value
     * @param unit One of kwei/ada, mwei/babbage, gwei/shannon, szabo, finney, ether, kether/grand/einstein, mether, gether, tether
     */
    fromWei(value: BigNumber, unit: Web3.WeiUnit): BigNumber;

    /**
     * Converts an ethereum unit into wei. Possible units are:
     * - kwei/ada
     * - mwei/babbage
     * - gwei/shannon
     * - szabo
     * - finney
     * - ether
     * - kether/grand/einstein
     * - mether
     * - gether
     * - tether
     *
     * @param value
     * @param unit One of kwei/ada, mwei/babbage, gwei/shannon, szabo, finney, ether, kether/grand/einstein, mether, gether, tether
     */
    toWei(value: number | string, unit: Web3.WeiUnit): String;

    /**
     * Converts an ethereum unit into wei. Possible units are:
     * - kwei/ada
     * - mwei/babbage
     * - gwei/shannon
     * - szabo
     * - finney
     * - ether
     * - kether/grand/einstein
     * - mether
     * - gether
     * - tether
     *
     * @param value
     * @param unit One of kwei/ada, mwei/babbage, gwei/shannon, szabo, finney, ether, kether/grand/einstein, mether, gether, tether
     */
    toWei(value: BigNumber, unit: Web3.WeiUnit): BigNumber;

    /**
     * Converts a given number into a BigNumber instance.
     */
    toBigNumber(value: number | string): BigNumber;
  }

  class Net {
    /**
     * This property is read only and says whether the node is actively listening for network connections or not.
     */
    readonly listening: boolean;

    /**
     * This property is read only and returns the number of connected peers.
     */
    readonly peerCount: number;

    /**
     * Is node actively listening for network connections or not.
     */
    getListening(callback: GetListeningCallback): void;
    /**
     * Is node actively listening for network connections or not.
    */
    getListeningAsync(): Promise<boolean>;

    /**
     * Number of connected peers.
     */
    getPeerCount(callback: GetPeerCountCallback): void;
    /**
     * Number of connected peers.
    */
    getPeerCountAsync(): Promise<number>;
  }

  class Compilers {
    /**
     * Compiles solidity source code
     */
    solidity(source: string): any;
    /**
     * Compiles solidity source code
     */
    solidity(source: string, callback: CompileCallback): void;
    /**
     * Compiles solidity source code
    */
    solidityAsync(source: string): Promise<any>;

    /**
     * Compiles LLL source code
     */
    lll(source: string): any;
    /**
     * Compiles LLL source code
     */
    lll(source: string, callback: CompileCallback): void;
    /**
     * Compiles LLL source code
    */
    lllAsync(source: string): Promise<any>;

    /**
     * Compiles serpent source code
     */
    serpent(source: string): any;
    /**
     * Compiles serpent source code
     */
    serpent(source: string, callback: CompileCallback): void;
    /**
     * Compiles serpent source code
    */
    serpentAsync(source: string): Promise<any>;
  }

  class Eth {
    /**
     * This default address is used for the following methods (optionally you can overwrite it by specifying the from property):
     * - web3.eth.sendTransaction()
     * - web3.eth.call()
     */
    defaultAccount: string | undefined;

    /**
     * This default block is used for the following methods (optionally you can override it by passing the defaultBlock parameter):
     * - web3.eth.getBalance()
     * - web3.eth.getCode()
     * - web3.eth.getTransactionCount()
     * - web3.eth.getStorageAt()
     * - web3.eth.call()
     * - contract.myMethod.call()
     * - contract.myMethod.estimateGas()
     *
     * Default block parameters can be one of the following:
     * - number - a block number
     * - string - "earliest", the genisis block
     * - string - "latest", the latest block (current head of the blockchain)
     * - string - "pending", the currently mined block (including pending transactions)
     *
     * Default is latest
     */
    defaultBlock: string | number;

    /**
     * This property is read only and returns the either a sync object, when the node is syncing or false.
     */
    readonly syncing: boolean | Web3.SyncingResult;

    /**
     * This property is read only and returns the coinbase address were the mining rewards go to.
     */
    readonly coinbase: string;

    /**
     * This property is read only and says whether the node is mining or not.
     */
    readonly mining: boolean;

    /**
     * This property is read only and returns the number of hashes per second that the node is mining with.
     */
    readonly hashrate: number;

    /**
     * This property is read only and returns the current gas price. The gas price is determined by the x latest blocks median gas price.
     */
    readonly gasPrice: BigNumber;

    /**
     * This property is read only and returns a list of accounts the node controls.
     */
    readonly accounts: string[];

    /**
     * This property is read only and returns the current block number.
     */
    readonly blockNumber: number;

    readonly version: Web3.Version;

    readonly compile: Compilers;

    /**
     * Call's callback with either a sync object, when the node is syncing or false.
     */
    getSyncing(callback: GetSyncingCallback): void;
    /**
     * Call's callback with either a sync object, when the node is syncing or false.
    */
    getSyncingAsync(): Promise<Web3.SyncingResult>;

    /**
     * This convenience function calls the callback everytime a sync starts, updates and stops.
     */
    isSyncing(callback?: IsSyncingCallback): Web3.IsSyncing;
    /**
     * This convenience function calls the callback everytime a sync starts, updates and stops.
    */
    isSyncingAsync(): Promise<boolean | Web3.SyncingResult>;

    /**
     * Call's callback with coinbase address were the mining rewards go to.
     */
    getCoinbase(callback: (err: any, address: string) => void): void;
    /**
     * Call's callback with coinbase address were the mining rewards go to.
    */
    getCoinbaseAsync(): Promise<string>;

    /**
     * Call's callback with the node is mining or not.
     */
    getMining(callback: (err: any, isMining: boolean) => void): void;
    /**
     * Call's callback with the node is mining or not.
    */
    getMiningAsync(): Promise<boolean>;

    /**
     * Call's callback with number of hashes per second that the node is mining with.
     */
    getHashrate(callback: (err: any, hashRate: number) => void): void;
    /**
     * Call's callback with number of hashes per second that the node is mining with.
    */
    getHashrateAsync(): Promise<number>;

    /**
     * Call's callback with current gas price. The gas price is determined by the x latest blocks median gas price.
     */
    getGasPrice(callback: (err: any, gasPrice: BigNumber) => void): void;
    /**
     * Call's callback with current gas price. The gas price is determined by the x latest blocks median gas price.
    */
    getGasPriceAsync(): Promise<BigNumber>;

    /**
     * Call's callback with list of accounts the node controls.
     */
    getAccounts(callback: (err: any, accounts: string[]) => void): void;
    /**
     * Call's callback with list of accounts the node controls.
    */
    getAccountsAsync(): Promise<string[]>;

    /**
     * Call's callback with current block number.
     */
    getBlockNumber(callback: (err: any, blockNumber: number) => void): void;
    /**
     * Call's callback with current block number.
    */
    getBlockNumberAsync(): Promise<number>;
    /**
     * Get the balance of an address at a given block.
     */
    getBalance(address: string, block: BlockNumberOrHash, callback: GetBalanceCallback): void;
    /**
     * Get the balance of an address at a given block.
    */
    getBalanceAsync(address: string, block: BlockNumberOrHash): Promise<BigNumber>;
    /**
     * Get the balance of an address at a given block.
     */
    getBalance(address: string, callback: GetBalanceCallback): void;
    /**
     * Get the balance of an address at a given block.
    */
    getBalanceAsync(address: string): Promise<BigNumber>;
    /**
     * Get the balance of an address at a given block.
     */
    getBalance(address: string, block?: BlockNumberOrHash): BigNumber;

    /**
     * Get the storage at a specific position of an address.
     */
    getStorageAt(address: string, position: number, block: BlockNumberOrHash, callback: GetStorageAtCallback): void;
    /**
     * Get the storage at a specific position of an address.
    */
    getStorageAtAsync(address: string, position: number, block: BlockNumberOrHash): Promise<string>;
    /**
     * Get the storage at a specific position of an address.
     */
    getStorageAt(address: string, position: number, callback: GetStorageAtCallback): void;
    /**
     * Get the storage at a specific position of an address.
    */
    getStorageAtAsync(address: string, position: number): Promise<string>;
    /**
     * Get the storage at a specific position of an address.
     */
    getStorageAt(address: string, position: number, block?: BlockNumberOrHash): string;

    /**
     * Get the code at a specific address.
     */
    getCode(address: string, block: BlockNumberOrHash, callback: GetCodeCallback): void;
    /**
     * Get the code at a specific address.
    */
    getCodeAsync(address: string, block: BlockNumberOrHash): Promise<string>;
    /**
     * Get the code at a specific address.
     */
    getCode(address: string, callback: GetCodeCallback): void;
    /**
     * Get the code at a specific address.
    */
    getCodeAsync(address: string): Promise<string>;
    /**
     * Get the code at a specific address.
     */
    getCode(address: string, block?: BlockNumberOrHash): string;

    /**
     * Returns a block matching the block number or block hash.
     */
    getBlock(block: BlockNumberOrHash, returnTransactionObjects: boolean, callback: GetBlockCallback): void;
    /**
     * Returns a block matching the block number or block hash.
    */
    getBlockAsync(block: BlockNumberOrHash, returnTransactionObjects: boolean): Promise<Web3.Block | null>;
    /**
     * Returns a block matching the block number or block hash.
     */
    getBlock(block: BlockNumberOrHash, callback: GetBlockCallback): void;
    /**
     * Returns a block matching the block number or block hash.
    */
    getBlockAsync(block: BlockNumberOrHash): Promise<Web3.Block | null>;
    /**
     * Returns a block matching the block number or block hash.
     */
    getBlock(block: BlockNumberOrHash, returnTransactionObjects?: boolean): Web3.Block | null;

    /**
     * Returns the number of transaction in a given block.
     */
    getBlockTransactionCount(block: BlockNumberOrHash, callback: GetBlockTxCountCallback): void;
    /**
     * Returns the number of transaction in a given block.
    */
    getBlockTransactionCountAsync(block: BlockNumberOrHash): Promise<number>;
    /**
     * Returns the number of transaction in a given block.
     */
    getBlockTransactionCount(block: BlockNumberOrHash): number;

    /**
     * Returns a blocks uncle by a given uncle index position
     */
    getUncle(block: BlockNumberOrHash, uncleNumber: number, returnTransactionObjects: boolean, callback: GetUncleCallback): void;
    /**
     * Returns a blocks uncle by a given uncle index position
    */
    getUncleAsync(block: BlockNumberOrHash, uncleNumber: number, returnTransactionObjects: boolean): Promise<Web3.Block | null>;
    /**
     * Returns a blocks uncle by a given uncle index position
     */
    getUncle(block: BlockNumberOrHash, uncleNumber: number, callback: GetUncleCallback): void;
    /**
     * Returns a blocks uncle by a given uncle index position
    */
    getUncleAsync(block: BlockNumberOrHash, uncleNumber: number): Promise<Web3.Block | null>;
    /**
     * Returns a blocks uncle by a given uncle index position
     */
    getUncle(block: BlockNumberOrHash, uncleNumber: number, returnTransactionObjects?: boolean): Web3.Block | null;

    /**
     * Returns a transaction matching the given transaction hash
     */
    getTransaction(transaction: string, callback: GetTransactionCallback): void;
    /**
     * Returns a transaction matching the given transaction hash
    */
    getTransactionAsync(transaction: string): Promise<Web3.Transaction | null>;
    /**
     * Returns a transaction matching the given transaction hash
     */
    getTransaction(transaction: string): Web3.Transaction | null;

    /**
     * Returns a transaction based on a block hash or number and the transactions index position.
     */
    getTransactionFromBlock(block: BlockNumberOrHash, index: number, callback: GetTxFromBlockCallback): void;
    /**
     * Returns a transaction based on a block hash or number and the transactions index position.
    */
    getTransactionFromBlockAsync(block: BlockNumberOrHash, index: number): Promise<Web3.Transaction | null>;
    /**
     * Returns a transaction based on a block hash or number and the transactions index position.
     */
    getTransactionFromBlock(block: BlockNumberOrHash, index: number): Web3.Transaction | null;

    /**
     * Returns the receipt of a transaction by transaction hash.
     * Note That the receipt is not available for pending transactions.
     */
    getTransactionReceipt(transaction: string, callback: GetTxReceiptCallback): void;
    /**
     * Returns the receipt of a transaction by transaction hash.
    */
    getTransactionReceiptAsync(transaction: string): Promise<Web3.TransactionReceipt | null>;
    /**
     * Returns the receipt of a transaction by transaction hash.
     * Note That the receipt is not available for pending transactions.
     */
    getTransactionReceipt(transaction: string): Web3.TransactionReceipt | null;

    /**
     * Get the numbers of transactions sent from this address
     */
    getTransactionCount(address: string, callback: GetTxCountCallback): void;
    /**
     * Get the numbers of transactions sent from this address
    */
    getTransactionCountAsync(address: string): Promise<number>;
    /**
     * Get the numbers of transactions sent from this address
     */
    getTransactionCount(address: string): number;

    /**
     * Sends a transaction to the network
     */
    sendTransaction(request: Web3.TransactionRequest, callback: SendTxCallback): void;
    /**
     * Sends a transaction to the network
    */
    sendTransactionAsync(request: Web3.TransactionRequest): Promise<string>;
    /**
     * Sends a transaction to the network
     */
    sendTransaction(request: Web3.TransactionRequest): string;

    /**
     * Sends an already signed transaction. For example can be signed using: https://github.com/SilentCicero/ethereumjs-accounts
     */
    sendRawTransaction(signedTransaction: string, callback: SendTxCallback): void;
    /**
     * Sends an already signed transaction. For example can be signed using: https://github.com/SilentCicero/ethereumjs-accounts
    */
    sendRawTransactionAsync(signedTransaction: string): Promise<string>;
    /**
     * Sends an already signed transaction. For example can be signed using: https://github.com/SilentCicero/ethereumjs-accounts
     */
    sendRawTransaction(signedTransaction: string): string;

    /**
     * Signs data from a specific account. This account needs to be unlocked.
     */
    sign(address: string, data: string, callback: SignCallback): void;
    /**
     * Signs data from a specific account. This account needs to be unlocked.
    */
    signAsync(address: string, data: string): Promise<string>;
    /**
     * Signs data from a specific account. This account needs to be unlocked.
     */
    sign(address: string, data: string): string;

    /**
     * Executes a message call transaction, which is directly executed in the VM of the node, but never mined into the blockchain.
     */
    call(request: Web3.TransactionRequest, block: BlockNumberOrHash, callback: CallCallback): void;
    /**
     * Executes a message call transaction, which is directly executed in the VM of the node, but never mined into the blockchain.
    */
    callAsync(request: Web3.TransactionRequest, block: BlockNumberOrHash): Promise<string>;

    /**
     * Executes a message call transaction, which is directly executed in the VM of the node, but never mined into the blockchain.
     */
    call(request: Web3.TransactionRequest, callback: CallCallback): void;
    /**
     * Executes a message call transaction, which is directly executed in the VM of the node, but never mined into the blockchain.
    */
    callAsync(request: Web3.TransactionRequest): Promise<string>;
    /**
     * Executes a message call transaction, which is directly executed in the VM of the node, but never mined into the blockchain.
     */
    call(request: Web3.TransactionRequest, block?: BlockNumberOrHash): string;

    /**
     * Executes a message call or transaction, which is directly executed in the VM of the node, but never mined into the blockchain and returns the amount of the gas used.
     */
    estimateGas(request: Web3.TransactionRequest, callback: EstimateGasCallback): void;
    /**
     * Executes a message call or transaction, which is directly executed in the VM of the node, but never mined into the blockchain and returns the amount of the gas used.
    */
    estimateGasAsync(request: Web3.TransactionRequest): Promise<number>;
    /**
     * Executes a message call or transaction, which is directly executed in the VM of the node, but never mined into the blockchain and returns the amount of the gas used.
     */
    estimateGas(request: Web3.TransactionRequest): number;

    /**
     * @param options The string "latest" or "pending" to watch for changes in the latest block or pending transactions respectively. Or a filter options object
     */
    filter(options: "latest" | "pending" | Web3.FilterOptions, callback: FilterCallback): Web3.Filter;
    filterAsync(options: "latest" | "pending" | Web3.FilterOptions): Promise<string | Web3.Log>;
    /**
     * @param options The string "latest" or "pending" to watch for changes in the latest block or pending transactions respectively. Or a filter options object
     */
    filter(options: "latest" | "pending" | Web3.FilterOptions): Web3.Filter;

    /**
     * Creates a contract object for a solidity contract, which can be used to initiate contracts on an address.
     */
    contract<T extends Web3.Contract>(abi: any[]): Web3.ContractFactory<T>;

    /**
     * Gets a list of available compilers.
     */
    getCompilers(callback: GetCompilerCallback): void;
    /**
     * Gets a list of available compilers.
    */
    getCompilersAsync(): Promise<string[]>;
    /**
     * Gets a list of available compilers.
     */
    getCompilers(): string[];
  }

  export = Web3;
}

declare module "web3/abi" {
  export type UIntType = "uint8" | "uint16" | "uint24" | "uint32" | "uint40" | "uint48" | "uint56" | "uint64" | "uint72" | "uint80" | "uint88" | "uint96" | "uint104" | "uint112" | "uint120" | "uint128" | "uint136" | "uint144" | "uint152" | "uint160" | "uint168" | "uint176" | "uint184" | "uint192" | "uint200" | "uint208" | "uint216" | "uint224" | "uint232" | "uint240" | "uint248" | "uint256";
  export type IntType = "int8" | "int16" | "int24" | "int32" | "int40" | "int48" | "int56" | "int64" | "int72" | "int80" | "int88" | "int96" | "int104" | "int112" | "int120" | "int128" | "int136" | "int144" | "int152" | "int160" | "int168" | "int176" | "int184" | "int192" | "int200" | "int208" | "int216" | "int224" | "int232" | "int240" | "int248" | "int256";
  export type BytesType =  "bytes1" | "bytes2" | "bytes3" | "bytes4" | "bytes5" | "bytes6" | "bytes7" | "bytes8" | "bytes9" | "bytes10" | "bytes11" | "bytes12" | "bytes13" | "bytes14" | "bytes15" | "bytes16" | "bytes17" | "bytes18" | "bytes19" | "bytes20" | "bytes21" | "bytes22" | "bytes23" | "bytes24" | "bytes25" | "bytes26" | "bytes27" | "bytes28" | "bytes29" | "bytes30" | "bytes31" | "bytes32";
  export type Type = UIntType | IntType | "address" | "bool" | "bytes" | "string" | BytesType;

  export interface Argument {
    name: string;
    type: Type;
  }

  export interface Function {
    constant: boolean;
    inputs: Argument[];
    name: string;
    outputs: Argument[];
    payable: boolean;
    type: "function";
  }

  export interface Constructor {
    inputs: Argument[];
    type: "constructor";
  }

  interface Indexed {
    indexed: boolean;
  }

  export type LogArgument = Argument & Indexed;

  export interface Event {
    anonymous: boolean;
    inputs: LogArgument[];
    name: string;
    type: "event";
  }

  export type DefinitionItem = Function | Constructor | Event;
  export type Definition = DefinitionItem[];
}

