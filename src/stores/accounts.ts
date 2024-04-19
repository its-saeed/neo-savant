import { defineStore } from 'pinia';

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [
      {
        name: 'Account 1',
        address: '0x11223344',
      },
      {
        name: 'Account 2',
        address: '0x11223344',
      },
      {
        name: 'Account 3',
        address: '0x11223344',
      },
    ] as Account[],
  }),
});

interface Account {
  name: string;
  address: string;
}
