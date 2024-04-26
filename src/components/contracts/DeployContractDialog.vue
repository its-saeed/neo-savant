<template>
  <q-dialog
    v-model="show"
    :persistent="false"
    :no-esc-dismiss="false"
    backdrop-filter="blur(4px)"
  >
    <q-card style="width: 600px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">Deploy {{ props.file }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1 text-grey-7">Transaction Parameters</div>
        <div class="column">
          <div class="row q-gutter-sm">
            <q-input
              dense
              filled
              class="col"
              label="Amount"
              type="number"
              v-model="amount"
            />
            <q-input
              dense
              filled
              class="col"
              label="Gas Price"
              type="number"
              v-model="gasPrice"
            />
            <q-input
              dense
              filled
              class="col"
              label="Gas Limit"
              type="number"
              v-model="gasLimit"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-subtitle1 text-grey-7">Initialization Parameters</div>
        <div v-if="abi && abi.params" class="column q-gutter-md">
          <contract-input
            v-for="param in abi.params"
            :key="param.vname"
            class="col"
            :vname="param.vname"
            :type="param.type"
          />
        </div>
        <q-skeleton v-else type="QInput" />
      </q-card-section>
      <q-separator />
      <q-card-actions class="bg-grey-2">
        <q-btn no-caps flat icon="upload" color="primary" @click="deploy"
          >Deploy</q-btn
        >
        <q-space />
        <q-btn no-caps flat icon="delete_forever" color="red">Reset</q-btn>
        <q-btn no-caps flat icon="close" color="warning">Cancel</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { defineProps } from 'vue';
import { onMounted } from 'vue';
import { getContractAbi } from 'src/scilla';
import { ref } from 'vue';
import { useBlockchainStore } from 'src/stores/blockchain';
import ContractInput from './ContractInput.vue';

const amount = ref(0);
const gasPrice = ref(0);
const gasLimit = ref(0);
const abi = ref(null);
const blockchainStore = useBlockchainStore();

onMounted(async () => {
  abi.value = await getContractAbi(props.code);
  console.log(abi.value);

  try {
    const price = (await blockchainStore.minimumGasPrice) || '0';
    gasPrice.value = parseInt(price);
  } catch (error) {
    gasPrice.value = 0;
  }
});

const props = defineProps(['file', 'code']);

const deploy = () => {
  return;
};
</script>
