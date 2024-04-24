<template>
  <q-bar class="bg-grey-3 text-grey-8">
    <q-btn dense flat label="Tools" no-caps icon="construction">
      <q-menu auto-close>
        <q-list dense>
          <q-item clickable>
            <q-item-section @click="showAddressConvertor">Address Convertor</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section @click="showUnitConvertor()">Units Convertor</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable>
            <q-item-section>Transfer Zil</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable>
            <q-item-section @click="showKeystoreGenerator()">Create keystore file</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <q-separator vertical inset />
    <q-btn dense flat label="Network Explorer" no-caps icon="dns" />
    <q-separator vertical inset />
    <q-btn dense flat label="Faucet" no-caps icon="account_balance" />
    <q-separator vertical inset />
    <q-btn dense flat label="Help" no-caps icon="help">
      <q-menu auto-close>
        <q-list dense>
          <q-item clickable>
            <q-item-section>Scilla Docs</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>Tutorial</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

  </q-bar>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import UnitsConverter from '../Tools/UnitsConverter.vue';
import AddressConverter from '../Tools/AddressConverter.vue';
import GenerateKeystoreFileDialog from '../Tools/GenerateKeystoreFileDialog.vue';

const q = useQuasar()

function showUnitConvertor() {
  q.dialog({
    component: UnitsConverter,
  })
}

function showAddressConvertor() {
  q.dialog({
    component: AddressConverter,
  })
}

function showKeystoreGenerator() {
  q.dialog({
    component: GenerateKeystoreFileDialog,
  })
}

</script>
<style lang="">

</style>
