<template>
  <q-btn-dropdown dense flat icon="dns" :label="store.selected?store.selected.name:'Network'">
    <q-list dense>
      <q-item-label header class="bg-grey-3 text-bold text-uppercase">
        <div class="row q-gutter-xs items-center justify-between">
          <span>Networks</span>
          <div>
            <q-btn v-close-popup class="gt-xs" size="14px" label="Add" flat dense icon="add_circle_outline" @click="showNewNetworkDialog">
              <q-tooltip>
                Add new network
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-item-label>
      <div v-for="network in store.networks" :key="network.name">
        <q-item clickable v-close-popup :active="store.selected?.name === network.name">
          <q-item-section @click="setSelectedNetwork(network.name)">
            <q-item-label>
              <span class="text-bold">{{ network.name }}</span>
            </q-item-label>
            <q-item-label caption>
              {{ network.url }}
            </q-item-label>
          </q-item-section>
          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn class="gt-xs" size="10px" flat dense round icon="delete" @click="deleteNetwork(network.name)" />
              <q-btn class="gt-xs" size="10px" flat dense round icon="edit" />
            </div>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import NewNetworkDialog from './NewNetworkDialog.vue'
import {useNetworksStore} from 'stores/networks'
import { useQuasar } from 'quasar';

const q = useQuasar()
const store = useNetworksStore();

const setSelectedNetwork = (name: string) => {
  try {
    store.setSelected(name)
    q.notify({
      type: 'info',
      message: `<strong>${name}</strong> network selected`,
      html: true
    })
  } catch (error) {
    q.notify({
      type: 'negative',
      message: `Failed to select <strong>${name}</strong> network. ${error}`,
      html: true
    })
  }
}

const deleteNetwork = (name: string) => {
  q.dialog({
    title: 'Delete Network',
    message: `Are you sure to delete <strong>${name}</strong>?`,
    html: true,
    cancel: true,
  }).onOk(() => {
    try {
      store.deleteNetwork(name)
      q.notify({
        type: 'info',
        message: `<strong>${name}</strong> network deleted.`,
        html: true
      })
    } catch (error) {
      q.notify({
        type: 'negative',
        message: `Failed to delete <strong>${name}</strong> network. ${error}`,
        html: true
      })
    }
  })
}

const showNewNetworkDialog = () => {
  q.dialog({
    component: NewNetworkDialog,
  })
}

</script>

<style lang="">
</style>

