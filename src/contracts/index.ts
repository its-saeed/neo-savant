import zrc6 from './zrc6.scilla?raw';
import auction from './auction.scilla?raw';
import bookstore from './bookstore.scilla?raw';
import crowdfunding from './crowdfunding.scilla?raw';
import ecdsa from './ecdsa.scilla?raw';
import fungibleToken from './fungible_token.scilla?raw';
import helloWorld from './hello_world.scilla?raw';
import nonFungibleToken from './nonfungible_token.scilla?raw';
import schnorr from './schnorr.scilla?raw';
import zilGame from './zil_hash_game.scilla?raw';
import asciiart from './asciiart.scilla?raw';

export type ContractInfo = {
  id: string;
  name: string;
  code: string;
};

export const scillaDefaultContracts: ContractInfo[] = [
  { id: 'hello-world', name: 'HelloWorld', code: helloWorld },
  { id: 'zrc6', name: 'ZRC-6', code: zrc6 },
  { id: 'book-store', name: 'BookStore', code: bookstore },
  { id: 'crowd-funding', name: 'CrowdFunding', code: crowdfunding },
  { id: 'auction', name: 'Auction', code: auction },
  { id: 'fungible-token', name: 'FungibleToken', code: fungibleToken },
  { id: 'non-fungible', name: 'NonFungible', code: nonFungibleToken },
  { id: 'zil-game', name: 'ZilGame', code: zilGame },
  { id: 'schnorr-test', name: 'SchnorrTest', code: schnorr },
  { id: 'ecdsa-test', name: 'ECDSATest', code: ecdsa },
  { id: 'asciiart', name: 'AsciiArt', code: asciiart },
];

export const getContractById = (id: string): ContractInfo | undefined => {
  return scillaDefaultContracts.find((contract) => contract.id === id);
};
