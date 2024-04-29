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
              <span class="ellipsis">
                {{ smartTruncate(contract.address, 23, { position: 10}) }}
                <q-tooltip>{{ contract.address }}</q-tooltip>
              </span>
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
import { smartTruncate } from 'src/utils';
import CopyToClipboardBtn from 'components/CopyToClipboardBtn.vue';

const store = useContractsStore();

</script>

<style lang=""></style>
