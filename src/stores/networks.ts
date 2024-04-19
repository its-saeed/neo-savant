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
      console.log('here');
      const network = this.getByName(name);
      if (network) {
        this.selected = network;
      } else {
        console.log(`Failed to find ${name} in networks!`);
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
  },
});

interface Network {
  name: string;
  url: string;
  chainId: number;
}
