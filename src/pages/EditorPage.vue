<template>
  <q-page class="column">
    <q-bar class="bg-grey-1 text-grey-8">
      <q-btn dense flat label="Save" no-caps icon="save" disabled />
      <q-separator vertical inset />
      <q-btn dense flat label="Find/Replace" no-caps icon="search" @click="toggleSearchPanel"/>
      <q-separator vertical inset />
      <q-btn dense flat label="Code Lints" no-caps icon="healing" @click="toggleLintPanel"/>
      <q-space/>
      <q-btn dense flat label="Deploy" icon="send" />
    </q-bar>

    <div class="col row">
      <q-scroll-area class="col">
        <scilla-editor v-model="code" ref="editor"></scilla-editor>
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
const editor = ref<InstanceType<typeof ScillaEditor>>();

onMounted(() => {
  eventBus.on('contract-selected', (contract: ContractInfo) => {
    code.value = contract.code;
  });
});

defineOptions({
  name: 'EditorPage',
});

const toggleSearchPanel = () => {
  if (editor.value) {
    editor.value.toggleSearchPanel();
  }
}

const toggleLintPanel = () => {
  if (editor.value) {
    editor.value.toggleLintPanel();
  }
}
</script>
