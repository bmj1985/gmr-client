<template>
  <div class="input-wrapper">
    <label :label="label" :for="name">{{ labelText }}</label>
    <input :name="name" :type="type" />
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'InputAndLabel',
  props: {
    vModel: { type: String },
    name: { type: String, default: '' },
    label: { type: String, default: '' },
    labelText: { type: String, default: '' },
    type: { type: String, default: 'text' }
  }
})
</script>

<style scoped lang="scss">
.input-wrapper {
  margin-top: 2rem;
  height: 45px;
  width: 90%;
  display: flex;
  align-items: center;
  color: black;
  position: relative;
  border: solid 1px rgb(166, 166, 166);
  font-size: 14px;
  /* font-family: ${theme.fonts.tertiary}; */
  line-height: 1.3em;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  -webkit-font-smoothing: subpixel-antialiased;
  /* color: ${theme.colors.inputText}; */
  /* background: ${theme.colors.inputBackground}; */
  @media screen and (max-width: 481px) {
    margin-top: 10%;
  }
  :focus-within {
    border: solid 1px green;
  }
  input {
    min-width: 150px;
    outline: none;
    border: 1px transparent solid;
    display: block;
    word-break: normal;
    font: inherit;
    margin: 0px;
    left: 0;
    background: transparent;
    line-height: 2rem;
    cursor: text;
    text-rendering: auto;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    text-align: start;
    -webkit-writing-mode: horizontal-tb !important;
    -webkit-box-direction: normal;
    /* font-family: ${theme.fonts.tertiary}; */
    font-size: 1.5rem;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 0.25rem;
    width: 100%;
    color: black;
    /* background: ${theme.colors.inputBackground}; */
    :focus {
      cursor: text;
    }
    ::placeholder {
      color: grey;
    }
  }
  label {
    font-size: 1rem;
    font-weight: normal;
    /* font-family: ${theme.fonts.tertiary}; */
    position: absolute;
    top: -25px;
    left: -2%;
    /* background: ${theme.colors.interactiveBackground}; */
    transform: none;
    opacity: 1;
    /* color: ${theme.colors.text}; */
    padding: 0 2%;
    z-index: 1;
    user-select: none;
    pointer-events: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
    text-align: left;
    cursor: default;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}
</style>
