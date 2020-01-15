<template>
  <div class="bc-form-item">
    <div class="bc-form-item-label" v-if="label">
      {{label}}
    </div>
    <div class="form-item-elm">
      <slot name="input">
        <input :type="type" :placeholder="placeholder" :maxlength="maxlength" v-model="currentValue"/>
      </slot>
    </div>
    <!-- 尾部插槽 -->
    <slot name="append"/>
  </div>
</template>

<script>

  import { formModelMixin } from './form-mixins';

  export default {
    name: "bc-input",
    mixins: [formModelMixin()],
    props: {
      type: {
        type: String,
        default: 'text'
      },
      label: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '请输入内容'
      },
      maxlength: {
        type: Number,
        default: 999999
      }
    }
  }
</script>