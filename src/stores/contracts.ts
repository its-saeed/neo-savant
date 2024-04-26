import { defineStore } from 'pinia';
import { Contract } from '../utils/models';

export const useContractsStore = defineStore('contracts', {
  state: () => ({
    contracts: [] as Contract[],
  }),
  actions: {},
  getters: {},
});
