import { defineStore } from 'pinia';
import { Zilliqa, bytes } from '@zilliqa-js/zilliqa';
import { useAccountsStore } from './accounts';

export const useNetworksStore = defineStore('networks', {
  state: () => ({
    networks: [
      {
        name: 'Simulated ENV',
        url: 'https://scilla-server.zilliqa.com/contract/check',
        chainId: 222,
        msgVersion: 1,
        zilliqa: new Zilliqa(
          'https://scilla-server.zilliqa.com/contract/check'
        ),
      },
      {
        name: 'Testnet',
        url: 'https://dev-api.zilliqa.com',
        chainId: 333,
        msgVersion: 1,
        zilliqa: new Zilliqa('https://dev-api.zilliqa.com'),
      },
      {
        name: 'Mainnet',
        url: 'https://api.zilliqa.com',
        chainId: 1,
        msgVersion: 1,
        zilliqa: new Zilliqa('https://api.zilliqa.com'),
      },
    ] as Network[],
    selected: null as null | Network,
  }),
  getters: {
    getVersion(): number {
      if (this.selected === null) {
        throw new Error('No notwork selected!');
      }

      return bytes.pack(this.selected.chainId, this.selected.msgVersion);
    },
    getByName: (state) => (name: string) => {
      return state.networks.find((network) => network.name === name);
    },
  },
  actions: {
    setSelected(name: string) {
      const network = this.getByName(name);
      if (network) {
        const accountsStore = useAccountsStore();
        accountsStore.selected = null;
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
        msgVersion: 1,
        zilliqa: new Zilliqa(url),
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
  msgVersion: number;
  zilliqa: Zilliqa;
}
