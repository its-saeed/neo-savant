<template>
  <q-page class="column">
    <q-bar class="bg-grey-1 text-grey-8">
      <q-btn dense flat label="Deploy" no-caps icon="send" />
      <q-separator vertical inset />
      <q-btn dense flat label="Save" no-caps icon="save" disabled />
    </q-bar>

    <div class="col row">
      <q-scroll-area class="col">
        <scilla-editor v-model="code"></scilla-editor>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ScillaEditor from 'components/TextEditor/ScillaEditor.vue'
import { ref, onMounted } from 'vue';
import { eventBus } from 'src/event-bus';
import { ContractInfo } from 'src/contracts';

const code = ref('');

onMounted(() => {
  eventBus.on('contract-selected', (contract: ContractInfo) => {
    code.value = contract.code;
  });
});

defineOptions({
  name: 'EditorPage',
});
</script>
