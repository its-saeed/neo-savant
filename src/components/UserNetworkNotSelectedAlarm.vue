<template>
  <q-badge
    v-if="networksStore.selected === null || accountsStore.selected === null"
    color="red"
    floating
  >
    !
    <q-tooltip>Network and/or Account not selected!</q-tooltip>
  </q-badge>
</template>

<script setup>
import { useNetworksStore } from 'stores/networks';
import { useAccountsStore } from 'stores/accounts';

const networksStore = useNetworksStore();
const accountsStore = useAccountsStore();
</script>
