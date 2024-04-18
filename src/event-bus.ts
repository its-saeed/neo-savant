import { EventBus } from 'quasar';
import { ContractInfo } from './contracts';

export const eventBus = new EventBus<{
  'contract-selected': (contract: ContractInfo) => void;
}>();
