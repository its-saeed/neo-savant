<template>
  <q-dialog persistent="false" no-esc-dismiss="false" backdrop-filter="blur(4px)">
    <q-card style="width: 400px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Generate Keystore File</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="column q-gutter-md">
          <q-input class="col" label="Passphrase" type="password" v-model="secret" />
          <div class="col row">
            <q-space/>
            <q-btn class="col-4" type="submit" color="primary" @click="generateKeystore">Generate</q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Account } from '@zilliqa-js/account';
import { schnorr } from '@zilliqa-js/crypto';
import { ref } from 'vue';
import { exportFile, useQuasar } from 'quasar';

const secret = ref('');
const q = useQuasar();

const generateKeystore = async () => {
  const privateKey = schnorr.generatePrivateKey();
  const account = new Account(privateKey);
  try {
    const keystore = await account.toFile(secret.value)
    const status = exportFile(`${account.address}.json`, keystore, {
      mimeType: 'application/json'
    })
    if (!status) {
      q.notify({
        type: 'negative',
        message: 'Failed to create the keystore file.'
      })
    }
  } catch (error) {
    q.notify({
      type: 'negative',
      message: `Failed to create the keystore file. ${error}`
    })
  }
}

</script>

