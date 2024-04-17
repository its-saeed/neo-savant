<template>
  <q-dialog persistent="false" no-esc-dismiss="false" backdrop-filter="blur(4px)">
    <q-card style="width: 500px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Unit Convertor</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="column q-gutter-md">
          <q-input class="col" label="Bech32 Address" v-model="bech32"/>
          <q-input class="col" label="Base16 Address" v-model="base16" />
          <div class="col row">
            <q-space/>
            <q-btn class="col-2" type="primary" color="primary" @click="handleConversion">Convert</q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { toBech32Address, fromBech32Address } from '@zilliqa-js/crypto';
import { validation } from '@zilliqa-js/util';
import { ref } from 'vue';

const bech32 = ref('');
const base16 = ref('');

const handleConversion = () => {
  if (bech32.value.length > 0) {
    if (!validation.isBech32(bech32.value)) {
      return 'The string is not a valid Bech32 address.';
    } else {
      base16.value = fromBech32Address(bech32.value);
    }
  } else if (base16.value.length > 0) {
    if (!validation.isAddress(base16.value)) {
      return 'The string is not a valid Base16 address.';
    } else {
      bech32.value = toBech32Address(base16.value);
    }
  } else {

  }
}
</script>

