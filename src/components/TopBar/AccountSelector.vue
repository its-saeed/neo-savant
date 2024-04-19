<template>
  <q-btn dense flat icon="dns">
    Account
    <q-icon name="arrow_drop_down" size="16px" />

    <q-menu auto-close>
      <q-list dense>
        <q-item clickable>
          <q-item-section>
            <div>Import Account</div>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-for="account in store.accounts" :key="account.name">
          <q-item-section>{{ account.name }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import {useAccountsStore} from 'stores/accounts'

const store = useAccountsStore();

</script>

<style lang="">
</style>

