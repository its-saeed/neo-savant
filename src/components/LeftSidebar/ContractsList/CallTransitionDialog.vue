<template>
  <q-dialog v-model="show">
    <q-card style="min-width: 500px">
      <q-card-section>
        <div class="text-h6 q-mb-md">
          <span class="text-weight-bolder">{{ props.contract.name }}</span>
          <span class="text-grey-7"> Transition Call</span>
        </div>
        <div v-if="transitions.length === 0">
          <q-skeleton type="text" class="text-subtitle1" />
          <q-skeleton type="text" class="text-caption" />
        </div>
        <q-option-group
          v-else
          v-model="selectedTransition"
          :options="transitions"
          color="primary"
          dense
          inline
        />
        <div v-if="selectedParams.length > 0">
          <div
            v-for="param in selectedParams"
            :key="param.vname"
            class="q-mt-sm column q-gutter-sm"
          >
            <q-input dense filled :label="param.vname" class="col" />
          </div>
          {{ selectedParams.params }}
        </div>
        <div v-else class="text-grey-5 q-mt-sm">
          <strong>{{ selectedTransition.vname }}</strong> does not need any
          parameters
        </div>
      </q-card-section>
      <q-card-actions class="bg-grey-2">
        <q-btn no-caps flat color="primary" @click="handleConversion"
          >Call Transition</q-btn
        >
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { getContractAbi } from 'src/scilla';
import { useBlockchainStore } from 'src/stores/blockchain';
import { ref, defineProps, onMounted, computed } from 'vue';

let contractCode = '';
const props = defineProps(['contract']);
const q = useQuasar();
const selectedTransition = ref('');
const transitions = ref([]);
const transitions2 = {};

const selectedParams = computed(() => {
  if (selectedTransition.value === '') {
    return [];
  }
  return transitions2[selectedTransition.value.vname].params;
});

onMounted(async () => {
  try {
    const blockchainStore = useBlockchainStore();
    contractCode = await blockchainStore.getSmartContractCode(
      props.contract.address
    );
    const abi = await getContractAbi(contractCode);
    transitions.value = abi.transitions.map((t) => {
      if (selectedTransition.value === '') {
        selectedTransition.value = t;
      }
      transitions2[t.vname] = t;
      return {
        label: t.vname,
        value: t,
      };
    });
    console.log(transitions.value);
  } catch (error) {
    q.notify({
      type: 'negative',
      message: `Failed to get the contract ABI. Error: ${error}`,
    });
  }
});

const show = ref(true);
</script>
