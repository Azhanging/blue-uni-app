export function formModelMixin() {
  return {
    props: {
      value: {
        type: [String, Number, Array],
        default: ''
      }
    },
    watch: {
      value(val) {
        this.currentValue = val;
      },
      currentValue(val) {
        this.$emit('input', val)
      }
    },
    data() {
      return {
        currentValue: ''
      };
    },
    created() {
      this.currentValue = this.value;
    },
  };
}