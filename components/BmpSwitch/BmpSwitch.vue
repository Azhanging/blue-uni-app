<template>
	<div class="switch" @click="changeStatus">
		<div class="switch-btn" :class="value.status ? 'active' : ''"></div>
		<div class="switch-bg" :class="value.status ? 'active' : ''"></div>
	</div>
</template>

<script>
	export default {
		name: "bmp-switch",
		props: {
			//状态
			value: {
				type: Object,
				default() {
					return {
						status: false
					}
				}
			},
			index: {
				type: Number,
				default: 0
			}
		},
		methods: {
			changeStatus() {
				this.$emit('change', {
					status: !this.value.status,
					index: this.index,
					value: this.value
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.switch {
		position: relative;
		display: inline-block;
		width: 50px;
		height: 25px;
		border: 1px solid #c7c7c7;
		border-radius: 30px;
		box-sizing: border-box;
		overflow: hidden;
		.switch-btn {
			border: 1px solid #f4f4f4;
			border-radius: 30px;
			height: 100%;
			width: 25px;
			background-color: #ebebeb;
			box-sizing: border-box;
			transition: 200ms ease all;
			&.active {
				transform: translateX(25px);
			}
		}
		.switch-bg {
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
			height: 100%;
			transition: 200ms ease all;
			width: 10px;
			background-color: $color-base;
			&.active {
				width: 35px;
			}
		}
	}
</style>