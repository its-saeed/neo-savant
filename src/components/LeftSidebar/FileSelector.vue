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
import { useFilesStore } from 'src/stores/files';
import { ScillaContract } from 'src/utils';
import { eventBus } from 'src/event-bus';

const selected = ref('');
const filesStore = useFilesStore();

const fileNodes = computed(() => {
  return [
    {
      label: 'Contracts',
      key: 'default-contracts',
      selectable: false,
      expandable: true,
      children: filesStore.files.map((contract: ScillaContract) => ({
        label: contract.name,
        key: contract.name,
        icon: 'description',
        iconColor: 'grey-7',
      })),
    },
  ];
});

function change(target: string) {
  filesStore.setSelected(target);
  const contract = filesStore.getByName(target);
  if (contract)
    eventBus.emit('contract-selected', contract);
}
</script>
