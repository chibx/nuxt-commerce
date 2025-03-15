<script setup>
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'

const editor = useEditor({
    content: `<p>I'm running Tiptap with Vue.js. 🎉</p>\n<p>A Vue.js wrapper component for tiptap to use <code>v-model</code>.</p>`,
    extensions: [
        StarterKit,
    ],
});

onBeforeUnmount(() => {
    editor.value.destroy();
})
function toggleBold() {
    editor.value.chain().focus().toggleBold().run()
}
</script>

<template>
    <div>
        <button @click="toggleBold">Toggle Bold</button>
        <EditorContent :editor="editor" />
    </div>
</template>

<style scoped></style>