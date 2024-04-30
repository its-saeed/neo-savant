<template>
  <q-list dense separator>
    <div v-for="contract in store.contracts" :key="contract.address">
      <q-item>
        <q-item-section>
          <q-item-label>
            <div class="text-bold q-mr-sm">{{ contract.name }}</div>
          </q-item-label>
          <q-item-label caption>
            <div>
              <truncated-text :text="contract.address" :length="24" :position="12"/>
              <copy-to-clipboard-btn :content="contract.address"/>
            </div>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator/>
    </div>
  </q-list>
</template>

<script setup lang="ts">
import { useContractsStore } from 'src/stores/contracts';
import CopyToClipboardBtn from 'components/CopyToClipboardBtn.vue';
import TruncatedText from 'components/TruncatedText.vue';
import { onMounted, onUnmounted } from 'vue';

const store = useContractsStore();
let intervalId: NodeJS.Timeout;

onMounted(() => {
  intervalId = setInterval(async () => {
    await store.refreshPendingContracts();
  }, 5000);
});

onUnmounted(() => clearInterval(intervalId))

</script>

<style lang=""></style>
