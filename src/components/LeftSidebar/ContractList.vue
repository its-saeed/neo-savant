<template>
  <q-list dense separator>
    <q-item clickable v-ripple v-for="file in scillaFiles" :key="file">
      <q-item-section>
        {{ file }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const scillaFiles = ref([
  'HelloWorld.scilla',
  'ZRC-6.scilla',
  'BookStore.scilla',
  'CrowdFunding.scilla',
  'Auction.scilla',
  'FungibleToken.scilla',
  'NonFungible.scilla',
  'ZilGame.scilla',
  'SchnorrTest.scilla',
  'ECDSATest.scilla',
  'AsciiArt.scilla',
]);

</script>

<style lang=""></style>
