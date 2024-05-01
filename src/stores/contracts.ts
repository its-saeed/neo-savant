import { defineStore } from 'pinia';
import { Contract, PendingContract } from '../utils/models';
import { Init, TxParams, Value } from '@zilliqa-js/zilliqa';
import { useBlockchainStore } from './blockchain';
import { useTransactionsStore } from './transactions';
import { Notify } from 'quasar';

export const useContractsStore = defineStore('contracts', {
  state: () => ({
    contracts: [] as Contract[],
    pending: [] as PendingContract[],
  }),
  actions: {
    async refreshPendingContracts() {
      if (this.pending.length === 0) {
        return;
      }

      const transactions = useTransactionsStore();
      const responses = await Promise.all(
        this.pending.map((c) => {
          return transactions.refreshTransactionStatus(c.txHash);
        })
      );

      this.pending = this.pending.filter((c, i) => {
        const statusMessage = responses[i].statusMessage;
        const id = responses[i].ID;
        if (statusMessage === 'Confirmed') {
          Notify.create({
            type: 'info',
            message: `Contract deployment finished, ${id}`,
          });

          this.contracts.push({
            name: c.name,
            network: c.network,
            address: responses[i].ID,
          });
          return false; // To filter out
        } else if (statusMessage.startsWith('Rejected')) {
          // TODO: Show the exact message.
          Notify.create({
            type: 'warning',
            message: `Contract deployment failed, id: ${id}, reason: ${statusMessage}`,
          });
          return false; // To filter out
        }

        return true;
      });
    },
    async deploy(
      name: string,
      code: string,
      txParams: TxParams,
      params: Value[]
    ): Promise<string> {
      const blockchain = useBlockchainStore();
      const init: Init = [
        ...params,
        {
          vname: '_scilla_version',
          type: 'Uint32',
          value: '0',
        },
      ];

      txParams.toAddr = '0x0000000000000000000000000000000000000000';
      const id = await blockchain.sendTransaction(
        txParams,
        code,
        JSON.stringify(init).replace(/\\"/g, '"')
      );

      if (id === undefined) {
        throw new Error('Invalid transaction hash: ', id);
      }

      this.pending.push({
        name,
        txHash: id,
        network: blockchain.selectedNetwork?.name || 'N/A',
      });

      return id;
    },
    async import(name: string, address: string) {
      const blockchainStore = useBlockchainStore();

      await blockchainStore.getSmartContractCode(address);
      this.contracts.push({
        name,
        address,
        network: blockchainStore.selectedNetwork?.name || 'N/A',
      });
    },
  },
  getters: {},
});
