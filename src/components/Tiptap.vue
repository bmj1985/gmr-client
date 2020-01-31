<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click.prevent="commands.bold"
        >
          <font-awesome-icon :icon="['fas', 'bold']" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click.prevent="commands.italic"
        >
          <font-awesome-icon :icon="['fas', 'italic']" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click.prevent="commands.strike"
        >
          <font-awesome-icon :icon="['fas', 'strikethrough']" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click.prevent="commands.underline"
        >
          <font-awesome-icon :icon="['fas', 'underline']" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click.prevent="commands.paragraph"
        >
          <font-awesome-icon :icon="['fas', 'paragraph']" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click.prevent="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click.prevent="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click.prevent="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click.prevent="commands.bullet_list"
        >
          <font-awesome-icon :icon="['fas', 'list-ul']" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click.prevent="commands.ordered_list"
        >
          <font-awesome-icon :icon="['fas', 'list-ol']" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click.prevent="commands.blockquote"
        >
          <font-awesome-icon :icon="['fas', 'quote-right']" />
        </button>
        <button class="menubar__button" @click.prevent="commands.undo">
          <font-awesome-icon :icon="['fas', 'undo']" />
        </button>

        <button class="menubar__button" @click.prevent="commands.redo">
          <font-awesome-icon :icon="['fas', 'redo']" />
        </button>
      </div>
    </editor-menu-bar>
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'
export default Vue.extend({
  name: 'Tiptap',
  props: { clear: Boolean },
  components: {
    EditorContent,
    EditorMenuBar
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: '<p>Details go here....</p>',
        onFocus: () => {
          this.editor.clearContent()
        },
        onUpdate: ({ getHTML }) => {
          const htmlContent = getHTML()
          this.$store.commit('updateDetails', htmlContent)
        }
      })
    }
  },
  watch: {
    clear() {
      this.editor.setContent('<p>Details go here....</p>')
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  }
})
</script>

<style lang="scss">
.editor {
  height: 250px;
  display: flex;
  flex-direction: column;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.editor__content {
  border-top: 2px solid rgba(0, 0, 0, 0.2);
  overflow: scroll;
  height: 100%;
  padding: 0.5rem;
}
.editor__content .ProseMirror-focused {
  height: 100%;
  outline: 1px solid lightblue;
  color: black;
  font-size: 1.1rem;
}
</style>
