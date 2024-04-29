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
        <q-btn no-caps flat icon="upload" color="primary" :loading="loading" @click="deploy"
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
import { useQuasar } from 'quasar';

const q = useQuasar();

const show = ref(true);
const amount = ref(0);
const gasPrice = ref(0);
const gasLimit = ref(0);
const abi = ref();
let params = [];
const blockchainStore = useBlockchainStore();
const loading = ref(false);

onMounted(async () => {
  const contractAbi = await getContractAbi(props.code);
  abi.value = contractAbi;
  params = contractAbi.params;

  try {
    const price = (await blockchainStore.minimumGasPrice) || '0';
    gasPrice.value = parseInt(price);
  } catch (error) {
    q.notify({
      type: 'warning',
      message: 'Failed to get the minimum gas price, 0 is set.'
    })
    gasPrice.value = 0;
  }
});

const props = defineProps(['file', 'code']);

const deploy = async () => {
  loading.value = true;
  try {
    const id = await blockchainStore.deployContract(props.code, {
      gasPrice: gasPrice.value,
      gasLimit: gasLimit.value,
      amount: amount.value
    }, params)
    q.notify({
      type: 'info',
      message: `Contract deployment started. ${id}`,
    });
    show.value = false;
  } catch (error) {
    console.log(error)
    q.notify({
      type: 'negative',
      message: `Failed to deploy. ${error}`,
    });
  } finally {
    loading.value = false;
  }
};
</script>
