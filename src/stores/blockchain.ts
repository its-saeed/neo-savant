import { defineStore } from 'pinia';
import {
  Account,
  KeystoreAccount,
  Network,
  WaitingTransaction,
} from '../utils/models';
import { useAccountsStore } from './accounts';
import { useNetworksStore } from './networks';
import { BN, bytes, units } from '@zilliqa-js/util';
import {
  Init,
  TxParams,
  Value,
  Zilliqa,
  toChecksumAddress,
} from '@zilliqa-js/zilliqa';
import Long from 'long';

export const useBlockchainStore = defineStore('blockchain', {
  state: () => ({
    selectedAccount: null as Account | null,
    selectedNetwork: null as Network | null,
    zilliqa: null as Zilliqa | null,
    transactions: [] as WaitingTransaction[],
  }),
  getters: {
    getTransactionById: (state) => (id: string) => {
      return state.transactions.find((item) => item.id === id);
    },
    getBalance: (state) => {
      return async (address: string) => {
        if (state.zilliqa === null) {
          throw new Error('Please select a network');
        }
        const balance = await state.zilliqa.blockchain.getBalance(address);
        if (
          balance === undefined ||
          (balance.error && balance.error.code === -5)
        ) {
          return '0';
        } else {
          return units.fromQa(new BN(balance.result.balance), units.Units.Zil);
        }
      };
    },
    minimumGasPrice: async (state) => {
      if (state.zilliqa === null) {
        throw new Error('Please select a network');
      }
      return (await state.zilliqa.blockchain.getMinimumGasPrice()).result;
    },
    selectedNetworkName: (state) => {
      if (state.selectedNetwork === null) {
        throw new Error('Please select a network');
      }
      return state.selectedNetwork.name;
    },
    selectedNetworkVersion(state): number {
      if (state.selectedNetwork === null) {
        throw new Error('Please select a network');
      }

      return bytes.pack(
        state.selectedNetwork.chainId,
        state.selectedNetwork.msgVersion
      );
    },
  },
  actions: {
    addKeystoreAccount(account: KeystoreAccount) {
      if (this.zilliqa === null) {
        throw new Error('Please select a network.');
      }
      this.zilliqa.wallet.addByKeystore(account.keystore, account.passphrase);
    },
    setSelectedAccount(name: string) {
      const accountsStore = useAccountsStore();
      const account = accountsStore.getByName(name);
      if (account === undefined) {
        throw new Error(`No account with name of ${name}`);
      }
      this.selectedAccount = account;
    },
    setSelectedNetwork(name: string) {
      const networksStore = useNetworksStore();
      const network = networksStore.getByName(name);
      if (network) {
        this.selectedAccount = null;
        this.selectedNetwork = network;
        this.zilliqa = new Zilliqa(network.url);
      } else {
        throw new Error(`No network named ${name}`);
      }
    },
    async transferZil(recipientAddress: string, amount: BN) {
      if (this.zilliqa === null) {
        throw new Error('Please select a network.');
      }

      if (this.selectedAccount === null) {
        throw new Error('Please select an account.');
      }

      const tx = this.zilliqa.transactions.new({
        version: this.selectedNetworkVersion,
        toAddr: toChecksumAddress(recipientAddress),
        amount: amount,
        gasPrice: units.toQa('2000', units.Units.Li),
        gasLimit: Long.fromNumber(50),
      });

      const txn = await this.zilliqa.blockchain.createTransactionWithoutConfirm(
        tx
      );
      this.transactions.push({
        id: txn.id || 'NO_ID',
        statusMessage: 'Initialized',
        network: this.selectedNetworkName,
        from: this.zilliqa.wallet.defaultAccount?.bech32Address || 'N/A',
        to: recipientAddress,
        amount: amount.toString(),
      });

      return txn.id;
    },
    async refreshTransactionStatus(txHash: string) {
      if (this.zilliqa === null) {
        throw new Error('Please select a network.');
      }

      const txn = this.getTransactionById(txHash);
      if (txn == null) {
        throw new Error(`No transaction with hash ${txHash}`);
      }

      const response = await this.zilliqa.blockchain.getTransactionStatus(
        txHash
      );
      txn.statusMessage = response.statusMessage;
    },
    async refreshSelectedAccountBalance() {
      if (this.selectedAccount === null) {
        throw new Error('Please select an account.');
      }

      const balance = await this.getBalance(this.selectedAccount.address);
      this.selectedAccount.balance = balance;
    },
    async deployContract(
      contractName: string,
      code: string,
      txParams: TxParams,
      params: Value[]
    ) {
      if (this.zilliqa == null) {
        throw new Error('Please select a network for contract deployment');
      }
      const init: Init = [
        ...params,
        {
          vname: '_scilla_version',
          type: 'Uint32',
          value: '0',
        },
      ];
      const tx = this.zilliqa.transactions.new(
        {
          version: this.selectedNetworkVersion,
          toAddr: '0x0000000000000000000000000000000000000000',
          amount: new BN(txParams.amount),
          gasPrice: new BN(txParams.gasPrice), // in Qa
          gasLimit: txParams.gasLimit,
          code: code,
          data: JSON.stringify(init).replace(/\\"/g, '"'),
        },
        true
      );

      const txn = await this.zilliqa.blockchain.createTransactionWithoutConfirm(
        tx
      );

      this.transactions.push({
        id: txn.id || 'NO_ID',
        statusMessage: 'Initialized',
        network: this.selectedNetworkName,
        amount: txParams.amount,
        from: this.zilliqa.wallet.defaultAccount?.bech32Address || 'N/A',
        to: '0x0000000000000000000000000000000000000000',
      });
      return txn.id;
    },
  },
});
