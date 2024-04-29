import { Zilliqa } from '@zilliqa-js/zilliqa';

export interface Network {
  name: string;
  url: string;
  chainId: number;
  msgVersion: number;
  zilliqa: Zilliqa;
}

export interface Contract {
  name: string;
  network: string;
  address: string;
  tags: Tag[];
}

export interface Tag {
  name: string;
  color: string;
}

export interface Account {
  name: string;
  address: string;
  balance: string;
  balanceRefreshInProgress: boolean;
  account: KeystoreAccount;
  networks: string[];
}

export interface KeystoreAccount {
  keystore: string;
  passphrase: string;
}

// export type TransactionStatus =
//   | 'Initialized'
//   | 'Pending'
//   | 'Confirmed'
//   | 'Rejected';
export interface WaitingTransaction {
  id: string;
  network: string;
  statusMessage: string;
}
