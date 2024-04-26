<template>
  <q-btn size="12px" :loading="loading" flat dense round icon="refresh" @click="refreshTransactionStatus()">
    <q-badge
      v-if="errorMessage"
      color="red"
      transparent
      floating
    >
      !
      <q-tooltip>{{ errorMessage }}</q-tooltip>
    </q-badge>
  </q-btn>
</template>

<script setup>
import {defineProps, ref} from 'vue';
import { useBlockchainStore } from 'src/stores/blockchain';
const props = defineProps(['txHash'])
const blockchainStore = useBlockchainStore();
const loading = ref(false)
const errorMessage = ref(null)

const refreshTransactionStatus = async () => {
  loading.value = true;
  errorMessage.value = null;
  try {
    await blockchainStore.refreshTransactionStatus(props.txHash)
  } catch (error) {
    errorMessage.value = error;
  } finally {
    loading.value = false;
  }
}
</script>
