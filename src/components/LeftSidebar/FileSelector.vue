<template>
  <q-tree
    dense
    :nodes="fileNodes"
    node-key="key"
    selected-color="orange"
    v-model:selected="selected"
    default-expand-all
    no-connectors
    @update:selected="change"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { eventBus } from 'src/event-bus';
import { ContractInfo, scillaDefaultContracts, getContractById } from '../../contracts';

const selected = ref('');

const fileNodes = computed(() => {
  return [
    {
      label: 'Default Contracts',
      key: 'default-contracts',
      selectable: false,
      expandable: true,
      children: scillaDefaultContracts.map((contract: ContractInfo) => ({
        label: contract.name,
        key: contract.id,
        icon: 'description',
        iconColor: 'grey-7'
      })),
    },
    {
      key: 'user-defined',
      selectable: false,
      expandable: true,
      label: 'User-defined',
    },
  ];
});

function change(target: string) {
  const contract = getContractById(target);
  if (contract) {
    eventBus.emit('contract-selected', contract);
  } else {
    console.error(`Failed to find ${target} in default contracts`)
  }
}
</script>
