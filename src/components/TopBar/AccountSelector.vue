<template>
  <q-btn-dropdown
    dense
    color="blue-grey-9"
    unelevated
    split
    no-caps
    @click="refreshSelectedAccountBalance"
  >
    <template v-slot:label>
      <q-icon left name="wallet" />
      <template v-if="store.selected">
        {{ store.selected?.name }}
        <q-badge color="orange" class="text-bold q-ml-sm">
          {{ store.selected?.balance }} ZIL
          <q-spinner
            v-if="
              store.selected !== null && store.selected.balanceRefreshInProgress
            "
            size="12px"
          />
        </q-badge>
      </template>
      <div v-else>Import an Account</div>
    </template>

    <q-list bordered separator>
      <q-item-label header class="bg-grey-3 text-bold text-uppercase">
        <div class="row q-gutter-xs items-center justify-between">
          <span>Accounts</span>
          <div>
            <q-btn
              v-close-popup
              class="gt-xs"
              size="14px"
              label="Import"
              flat
              dense
              icon="person_add"
              @click="importKeystore"
            >
              <q-tooltip> Import new account </q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-item-label>
      <div v-if="store.accounts.length > 0">
        <div v-for="account in store.accountsForCurrentNetwork" :key="account.name">
          <q-item clickable :active="store.selected?.name === account.name">
            <q-item-section @click="selectAccount(account.name)" v-close-popup>
              <q-item-label>
                <span class="text-bold q-mr-sm">{{ account.name }}</span>
                <q-badge color="orange" class="text-bold">
                  {{ account.balance }} ZIL
                </q-badge>
              </q-item-label>
              <q-item-label caption>
                <div>
                  {{ account.address }}
                  <q-btn
                    icon="content_copy"
                    round
                    flat
                    size="8px"
                    @click.stop="copyAddressToClipboard(account.address)"
                  >
                    <q-tooltip>
                      {{ addressCopiedToClipboard ? 'Copied' : 'Copy Address' }}
                    </q-tooltip>
                  </q-btn>
                </div>
              </q-item-label>
            </q-item-section>
            <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn
                  class="gt-xs"
                  size="10px"
                  flat
                  dense
                  round
                  icon="delete"
                />
                <q-btn class="gt-xs" size="10px" flat dense round icon="edit" />
                <q-btn
                  class="gt-xs"
                  size="10px"
                  :loading="account.balanceRefreshInProgress"
                  flat
                  dense
                  round
                  icon="autorenew"
                  @click="refreshBalance(account.name)"
                >
                  <q-tooltip> Refresh balance </q-tooltip>
                </q-btn>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
        </div>
      </div>
      <q-item v-else>
        <q-item-section>
          <div>Click <strong>IMPORT</strong> to add a new account</div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import ImportAccountDialog from './ImportAccountDialog.vue';
import { useAccountsStore } from 'stores/accounts';
import { useQuasar } from 'quasar';
import { copyToClipboard } from 'quasar';
import { ref } from 'vue';

const q = useQuasar();
const store = useAccountsStore();
const addressCopiedToClipboard = ref(false);

const importKeystore = () => {
  q.dialog({
    component: ImportAccountDialog,
  });
};

const selectAccount = (name: string) => {
  try {
    store.setSelected(name);
    q.notify({
      type: 'info',
      message: `<strong>${name}</strong> account selected`,
      html: true,
    });
  } catch (error) {
    q.notify({
      type: 'negative',
      message: `Failed to select <strong>${name}</strong> account. ${error}`,
      html: true,
    });
  }
};

const refreshBalance = (address: string) => {
  try {
    store.refreshBalance(address);
  } catch (error) {}
  return;
};

const refreshSelectedAccountBalance = () => {
  if (store.selected === null) {
    return;
  }

  try {
    store.refreshBalance(store.selected.name);
  } catch (error) {}
  return;
};

const copyAddressToClipboard = async (address: string) => {
  await copyToClipboard(address.toLowerCase());
  addressCopiedToClipboard.value = true;
  await new Promise((r) => setTimeout(r, 2000));
  addressCopiedToClipboard.value = false;
};
</script>

<style lang=""></style>
