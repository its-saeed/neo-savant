<template>
  <q-dialog v-model="show" persistent>
  <q-card style="min-width: 400px">
    <q-card-section>
      <div class="text-h6">Import Contract</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input filled dense label="Contract Address" v-model="address" autofocus/>
    </q-card-section>

    <q-card-actions align="right" class="bg-grey-2">
      <q-btn no-caps flat color="primary" @click="importContract"
        >Import</q-btn
      >
      <q-btn no-caps color="negative" flat label="Cancel" v-close-popup />
    </q-card-actions>
  </q-card>
</q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const address = ref('')
const show = ref(true)

const importContract = () => {
  return;
}
</script>
