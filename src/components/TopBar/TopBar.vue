<template>
  <q-toolbar class="text-white" style="background: #24292e">
    <img src="https://ide.zilliqa.com/img/logo.193e9b62.png" style="height: 48px" />
    <div class="text-weight-bolder text-h5">Neo Savant</div>
    <q-space />
    <div class="q-gutter-sm row items-center no-wrap">
      <q-btn round dense flat color="white" icon="notifications">
        <q-badge color="red" text-color="white" floating>
          2
        </q-badge>
        <q-tooltip>Notifications</q-tooltip>
      </q-btn>
      <q-separator dark vertical inset />
      <network-selector></network-selector>
      <account-selector></account-selector>
    </div>
  </q-toolbar>
</template>
<script setup lang="ts">
import NetworkSelector from './NetworkSelector.vue'
import AccountSelector from './AccountSelector.vue'
</script>
<style lang="">

</style>
