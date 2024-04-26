<template lang="">
  <div class="column full-height">
    <q-bar class="bg-dark text-white shadow-2">
      <q-toolbar-title>Files</q-toolbar-title>
      <q-space />
      <div class="q-gutter-xs">
        <q-btn class="gt-xs" size="10px" flat dense round icon="add">
          <q-tooltip>New scilla file</q-tooltip>
        </q-btn>
        <q-btn class="gt-xs" size="10px" flat dense round icon="file_download">
          <q-tooltip>Open scilla file</q-tooltip>
        </q-btn>
      </div>
    </q-bar>
    <q-scroll-area class="col">
      <file-selector />
    </q-scroll-area>
    <q-bar class="bg-dark text-white shadow-2">
      <q-toolbar-title>Contracts</q-toolbar-title>
    </q-bar>
    <q-scroll-area class="col">
      <contract-list />
    </q-scroll-area>
  </div>
</template>
<script setup lang="ts">
import ContractList from 'components/LeftSidebar/ContractList.vue';
import FileSelector from 'components/LeftSidebar/FileSelector.vue';
</script>
<style lang=""></style>
