<template>
  <q-dialog v-model="show" persistent="false" no-esc-dismiss="false" backdrop-filter="blur(4px)">
    <q-card style="width: 500px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Add New Network</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="column q-gutter-md">
          <q-input class="col" label="Name" v-model="name"/>
          <q-input class="col" label="URL" v-model="url"/>
          <q-input class="col" label="Chain ID" type="number" v-model="chaiId"/>
          <div class="col row">
            <q-space/>
            <q-btn class="col-2" type="primary" color="primary" @click="addNetwork">Add</q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useNetworksStore } from 'src/stores/networks';
import { useQuasar } from 'quasar'

const quasar = useQuasar();
const store = useNetworksStore();

// TODO: Handle validation
// TODO: Check if the network reachable.
const show = ref(true)
const name = ref('')
const url = ref('')
const chaiId = ref(0)

const addNetwork = () => {
  try {
    store.addNetwork(name.value, url.value, chaiId.value)
    quasar.notify({
      type: 'positive',
      message: `${name.value} added to the networks.`
    })
    show.value = false
  } catch (error) {
    quasar.notify({
      type: 'negative',
      message: `Failed to add ${name.value}. ${error}`
    })
  }
}

</script>


