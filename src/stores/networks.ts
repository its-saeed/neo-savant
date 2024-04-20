import { defineStore } from 'pinia';

export const useNetworksStore = defineStore('networks', {
  state: () => ({
    networks: [
      {
        name: 'Simulated ENV',
        url: 'https://scilla-server.zilliqa.com/contract/check',
        chainId: 222,
      },
      {
        name: 'Testnet',
        url: 'https://dev-api.zilliqa.com',
        chainId: 333,
      },
      {
        name: 'Mainnet',
        url: 'https://api.zilliqa.com',
        chainId: 1,
      },
    ] as Network[],
    selected: null as null | Network,
  }),
  getters: {
    getByName:
      (state) =>
      (name: string): Network | undefined => {
        return state.networks.find((item: Network) => item.name === name);
      },
  },
  actions: {
    setSelected(name: string) {
      const network = this.getByName(name);
      if (network) {
        this.selected = network;
      } else {
        throw new Error(`No network named ${name}`);
      }
    },
    addNetwork(name: string, url: string, chainId: number) {
      if (this.getByName(name) !== undefined) {
        throw new Error('There is already another network with the same name.');
      }
      this.networks.push({
        name,
        url,
        chainId,
      });
    },
    deleteNetwork(name: string) {
      const network = this.getByName(name);
      if (network === undefined) {
        throw new Error('Network not found.');
      } else if (this.selected && network.name === this.selected.name) {
        throw new Error('Not possible to delete currently selected network.');
      } else {
        this.networks;
      }
      this.networks = this.networks.filter((network) => network.name !== name);
    },
  },
});

interface Network {
  name: string;
  url: string;
  chainId: number;
}
