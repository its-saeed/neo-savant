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
      <q-btn dense flat icon="dns">
        Network
        <q-icon name="arrow_drop_down" size="16px" />

        <q-menu auto-close>
          <q-list dense>
            <q-item clickable>
              <q-item-section>
                <div>Import Account</div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>0x9805026f37fA....</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-btn flat dense icon="account_balance_wallet">
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
            <q-item clickable>
              <q-item-section>0x9805026f37fA....</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </q-toolbar>
</template>
<script setup lang="ts">
</script>
<style lang="">

</style>
