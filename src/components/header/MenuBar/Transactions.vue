<template>
  <q-btn-dropdown
    dense
    icon="dns"
    unelevated
    no-caps
    label="Transactions"
  >
    <q-list dense>
      <div
        v-for="transaction in blockchainStore.transactions"
        :key="transaction.id"
      >
        <q-item>
          <q-item-section>
            <q-item-label>
              <truncated-text :text="transaction.id" :length="40" :position="20" />
              <copy-to-clipboard-btn :content="transaction.id"/>
            </q-item-label>
            <q-item-label caption>
              <q-badge
                :color="txStatusColor(transaction.statusMessage)"
                class="text-bold"
              >
                {{ transaction.statusMessage }}
              </q-badge><br/>
              From: {{ transaction.from }} <br/>
              To: {{ transaction.to }} <br/>
              Amount: {{ transaction.amount }} <br/>
              <q-badge color="primary" class="text-bold">
                {{ transaction.network }}
              </q-badge>
            </q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label>
              <transaction-status-refresher-btn :tx-hash="transaction.id" />
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
import CopyToClipboardBtn from 'src/components/CopyToClipboardBtn.vue';
import TruncatedText from 'components/TruncatedText.vue';

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
};
</script>
