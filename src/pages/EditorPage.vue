<template>
  <q-page class="column">
    <q-bar class="bg-grey-1 text-grey-8 q-pt-sm">
      <q-btn dense flat label="Save" no-caps icon="save" disabled />
      <q-separator vertical inset />
      <q-btn
        dense
        flat
        label="Find/Replace"
        no-caps
        icon="search"
        @click="toggleSearchPanel"
      />
      <q-separator vertical inset />
      <q-btn
        dense
        flat
        label="Code Lints"
        no-caps
        icon="healing"
        @click="toggleLintPanel"
      />
      <q-space />
      <q-btn
        dense
        flat
        label="Deploy"
        icon="send"
        @click="deployContract"
        :disable="contractFile == ''"
      >
        <user-network-not-selected />
      </q-btn>
    </q-bar>

    <div class="col row">
      <q-scroll-area class="col">
        <scilla-editor v-model="code" ref="editor"></scilla-editor>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ScillaEditor from 'components/TextEditor/ScillaEditor.vue';
import DeployContractDialog from 'components/contracts/DeployContractDialog.vue';
import UserNetworkNotSelected from 'components/UserNetworkNotSelectedAlarm.vue';

import { ref, onMounted } from 'vue';
import { eventBus } from 'src/event-bus';
import { ContractInfo } from 'src/contracts';
import { useQuasar } from 'quasar';

const code = ref('');
const contractFile = ref('');
const editor = ref<InstanceType<typeof ScillaEditor>>();
const q = useQuasar();

onMounted(() => {
  eventBus.on('contract-selected', (contract: ContractInfo) => {
    code.value = contract.code;
    contractFile.value = contract.name;
  });
});

defineOptions({
  name: 'EditorPage',
});

const toggleSearchPanel = () => {
  if (editor.value) {
    editor.value.toggleSearchPanel();
  }
};

const toggleLintPanel = () => {
  if (editor.value) {
    editor.value.toggleLintPanel();
  }
};

const deployContract = () => {
  q.dialog({
    component: DeployContractDialog,
    componentProps: { file: contractFile.value, code: code.value },
  });
};
</script>
