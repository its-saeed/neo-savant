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
        <div class="column">
          <div class="row q-gutter-sm">
            <q-input
              dense
              filled
              class="col"
              label="Contract Name"
              hint="For easier reference"
              v-model="contractName"
            />
          </div>
        </div>
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
            v-model="initializationParameters[param.vname]"
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
import { onMounted } from 'vue';
import { getContractAbi } from 'src/scilla';
import { ref } from 'vue';
import { useBlockchainStore } from 'src/stores/blockchain';
import ContractInput from './ContractInput.vue';
import { useQuasar } from 'quasar';
import { useContractsStore } from 'src/stores/contracts';
import { BN, Long} from '@zilliqa-js/util';

const q = useQuasar();

const loading = ref(false);
const show = ref(true);
const amount = ref(0);
const gasPrice = ref(0);
const gasLimit = ref(30000);
const contractName = ref('')

const abi = ref();
let abiParams = [];
const initializationParameters = ref({})
const blockchainStore = useBlockchainStore();
const contractsStore = useContractsStore();

onMounted(async () => {
  const contractAbi = await getContractAbi(props.code);
  abi.value = contractAbi;
  abiParams = contractAbi.params;
  abiParams.forEach(item => initializationParameters.value[item.vname] = '')

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
    const id = await contractsStore.deploy(contractName.value, props.code, {
      gasPrice: new BN(gasPrice.value),
      gasLimit: Long.fromNumber(gasLimit.value),
      amount: new BN(amount.value),
    }, abiParams.map(param => ({
      ...param,
      value: initializationParameters.value[param.vname]
    })))
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
