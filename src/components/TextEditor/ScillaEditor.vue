<template>
  <div ref="editor"></div>
</template>

<script setup lang="ts">
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import {
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { bracketMatching, foldGutter, foldKeymap } from '@codemirror/language';
import { lintKeymap, linter, Diagnostic, lintGutter } from '@codemirror/lint';
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
} from '@codemirror/view';

import { onMounted, ref, defineModel, watch } from 'vue';
import { scillaCheck, Warning as CheckerWarning, Error as CheckerError } from 'src/scilla';

const editor = ref<Element>();
const model = defineModel({ type: String });

let editorView: EditorView;

watch(model, (newVal) => {
  if (newVal) {
    editorView.dispatch({
      changes: {
        from: 0,
        to: editorView.state.doc.length,
        insert: newVal,
      },
    });
  }
});

const scillaLinter = linter(async (view): Promise<Diagnostic[]> => {

  let response = await scillaCheck(view.state.doc.toString());
  console.log(response)

  let diagnostics: Diagnostic[] = [];
  if (response.warnings) {
    response.warnings.forEach((err: CheckerWarning) => {
      diagnostics.push({
        from: view.state.doc.line(err.start_location.line).from + err.start_location.column - 1,
        to: view.state.doc.line(err.start_location.line).from + err.start_location.column+1,
        severity: 'warning',
        message: err.warning_message,
      });
    });
  }

  if (response.errors) {
    response.errors.forEach((err: CheckerError) => {
      diagnostics.push({
        from: view.state.doc.line(err.line).from + err.column - 1,
        to: view.state.doc.line(err.line).from + err.column+1,
        severity: 'error',
        message: err.msg,
      });
    });
  }

  return diagnostics;
});

onMounted(() => {
  editorView = new EditorView({
    state: EditorState.create({
      doc: model.value,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter(),
        drawSelection(),
        dropCursor(),
        bracketMatching(),
        closeBrackets(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        scillaLinter,
        lintGutter(),
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          ...lintKeymap,
        ]),
      ],
    }),
    parent: editor.value,
  });
});
</script>
