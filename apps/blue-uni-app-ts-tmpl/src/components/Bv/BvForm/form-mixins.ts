export function formModelMixin () {
	return {
		props: {
			value: {
				type: [String, Number, Array],
				default: ''
			}
		},
		watch: {
			value ( val: any ) {
				this.currentValue = val;
			},
			currentValue ( val: any ) {
				// @ts-ignore
				this.$emit('input', val)
			}
		},
		data () {
			return {
				currentValue: ''
			};
		},
		created () {
			// @ts-ignore
			this.currentValue = this.value;
		},
	};
}