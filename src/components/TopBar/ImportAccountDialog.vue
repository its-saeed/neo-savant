<template>
  <q-dialog v-model="show" :persistent="false" :no-esc-dismiss="false" backdrop-filter="blur(4px)">
    <q-card style="width: 400px; max-width: 80vw;">
      <q-tabs
        v-model="tab"
        dense
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="keystore" label="Keystore" />
        <q-tab name="ledger" label="Ledger" />
        <q-tab name="zilpay" label="Zilpay" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="keystore">
          <div class="text-h6">Import Keystore File</div>
          <div class="column q-gutter-md">
            <q-input class="col" label="Name" v-model="accountName" />
            <q-file v-model="keystoreFile" label="Pick a keystore file" />
            <q-input class="col" label="Passphrase" type="password" v-model="secret" />
            <div class="col row">
              <q-space/>
              <q-btn class="col-4" type="submit" color="primary" @click="load">Import</q-btn>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="ledger">
          <div class="text-h6">Alarms</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="zilpay">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>

      <q-card-section class="q-pt-none">
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { Account } from '@zilliqa-js/account';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import {useAccountsStore} from 'stores/accounts'

const secret = ref('');
const keystoreFile = ref<File | null >(null)
const accountName = ref('Account 1')
const q = useQuasar();
const store = useAccountsStore();
const show = ref(true)
const tab = ref('keystore');

const load = async () => {
  if (keystoreFile.value == null) {
    q.notify({
      type: 'warning',
      message: 'Please select a valid keystore file.'
    })
    return;
  }

  const keystore = await readUploadedFileAsText(keystoreFile.value)
  try {
    const account = await Account.fromFile(keystore.toString(), secret.value)
    store.add(accountName.value, account.address, {
      keystoreFile: keystoreFile.value
    });
    q.notify({
      type: 'info',
      message: `${account.address} imported successfully.`
    })
    show.value = false;
  } catch (error) {
    q.notify({
      type: 'negative',
      message: `Failed to import. ${error}`
    })
  }
}

const readUploadedFileAsText = async (inputFile: File): Promise<string | ArrayBuffer> => {
  console.log(inputFile)
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new Error('Problem parsing input file.'));
    };

    temporaryFileReader.onload = () => {
      if (temporaryFileReader.result !== null) {
        resolve(temporaryFileReader.result);
      }
    };
    temporaryFileReader.readAsText(inputFile);
  });
}

</script>

