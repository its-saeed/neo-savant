<template>
  <q-btn dense flat icon="dns">
    <span v-if="store.selected">{{ store.selected.name }}</span>
    <span v-else>Network</span>
    <q-icon name="arrow_drop_down" size="16px" />

    <q-menu auto-close>
      <q-list dense>
        <q-item clickable @click="showNewNetworkDialog">
          <q-item-section>
            Add new network
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-for="network in store.networks" :key="network.name" @click="setSelectedNetwork(network.name)">
          <q-item-section>{{ network.name }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import NewNetworkDialog from './NewNetworkDialog.vue'
import {useNetworksStore} from 'stores/networks'
import { useQuasar } from 'quasar';

const q = useQuasar()
const store = useNetworksStore();

const setSelectedNetwork = (name: string) => {
  store.setSelected(name)
}

const showNewNetworkDialog = () => {
  q.dialog({
    component: NewNetworkDialog,
  })
}

</script>

<style lang="">
</style>

