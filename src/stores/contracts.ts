import { defineStore } from 'pinia';
import { Contract } from '../utils/models';

export const useContractsStore = defineStore('contracts', {
  state: () => ({
    contracts: [
      {
        name: 'Hello world',
        network: 'Testnet',
        address: '0x64b6579fd78a5df3a1811b611c93d88aee41129f',
        tags: [
          { name: 'test', color: 'red' },
          { name: 'hello', color: 'green' },
        ],
      },
    ] as Contract[],
  }),
  actions: {},
  getters: {},
});
