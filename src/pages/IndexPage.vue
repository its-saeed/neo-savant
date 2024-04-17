<template>
  <q-page class="column">
    <!-- <q-toolbar>
    <q-btn color="secondary" label="Check" />
    <q-btn color="primary" class="q-ml-sm" label="Deploy" />
    </q-toolbar> -->
      <q-bar class="bg-grey-1 text-grey-8">
        <q-btn dense flat label="Check" no-caps icon="check" />
        <q-separator vertical inset />
        <q-btn dense flat label="Deploy" no-caps icon="send" />
        <q-separator vertical inset />
        <q-btn dense flat label="Save" no-caps icon="save" disabled/>
      </q-bar>

    <div class="col row">
      <q-scroll-area class="col">
        <codemirror
            v-model="code"
            placeholder="Code goes here..."
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :lineWrapping="false"
            style="width: 100%;"
            :extensions="extensions"
        />
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { Codemirror } from 'vue-codemirror';
import { ref } from 'vue';

const extensions = ref([])
const code = ref('hello world')

defineOptions({
  name: 'IndexPage',
});

</script>
