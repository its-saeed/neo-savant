import { defineStore } from 'pinia';
import { useNetworksStore } from './networks';
import { BN, units } from '@zilliqa-js/util';

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
    selected: null as null | Account,
  }),
  actions: {
    add(name: string, address: string, account: KeystoreAccount) {
      this.accounts.push({
        name,
        address,
        account,
        balance: '0',
        balanceRefreshInProgress: false,
      });
    },
    setSelected(name: string) {
      const account = this.getByName(name);
      if (account === undefined) {
        throw new Error(`No account with name of ${name}`);
      }
      this.selected = account;
    },
    async refreshBalance(name: string) {
      const account = this.getByName(name);
      if (account === undefined) {
        throw new Error(`No account with name of ${name}`);
      }

      const networks = useNetworksStore();
      account.balanceRefreshInProgress = true;
      try {
        networks.zilliqa?.blockchain.getBalance(account.address);
        const balance = await networks.zilliqa?.blockchain.getBalance(
          account.address
        );
        if (
          balance === undefined ||
          (balance.error && balance.error.code === -5)
        ) {
          account.balance = '0';
        } else {
          const zils = units.fromQa(
            new BN(balance.result.balance),
            units.Units.Zil
          );
          account.balance = zils;
        }
      } catch (error) {
      } finally {
        account.balanceRefreshInProgress = false;
      }
    },
  },
  getters: {
    getByName:
      (state) =>
      (name: string): Account | undefined => {
        return state.accounts.find((item: Account) => item.name === name);
      },
  },
});

interface Account {
  name: string;
  address: string;
  balance: string;
  balanceRefreshInProgress: boolean;
  account: KeystoreAccount;
}

export interface KeystoreAccount {
  keystoreFile: File;
}
