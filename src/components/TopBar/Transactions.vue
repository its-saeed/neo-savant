<template>
  <q-btn-dropdown
    dense
    icon="dns"
    color="blue-grey-9"
    unelevated
    no-caps
    label="Transactions"
  >
    <q-list dense>
      <div v-for="transaction in blockchainStore.transactions" :key="transaction.id">
        <q-item
        >
          <q-item-section>
            <q-item-label>
              <div class="q-gutter-sm row items-center">
                <span>
                  {{ transaction.id }}
                </span>
                <q-badge color="primary" class="text-bold">
                  {{ transaction.network }}
                </q-badge>
                <q-badge :color="txStatusColor(transaction.statusMessage)" class="q-ml-sm text-bold">
                  {{ transaction.statusMessage }}
                </q-badge>
                <q-space/>
                <transaction-status-refresher-btn :tx-hash="transaction.id"/>
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { useBlockchainStore } from 'src/stores/blockchain';
import TransactionStatusRefresherBtn from './TransactionStatusRefresherBtn.vue';

const blockchainStore = useBlockchainStore();
const txStatusColor = (statusMessage: string) => {
  switch (statusMessage) {
    case 'Initialised':
      return 'blue';
    case 'Confirmed':
      return 'green';
    case 'Pending':
      return 'yellow';
    case 'Rejected':
      return 'red';
  }
}

</script>
