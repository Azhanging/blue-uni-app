<template>
	<div class="bz-f-28rpx"
	     :style="'padding-top:' + (menuButtonRect.top + menuButtonRect.height + menuButtonRect.paddingBottom) + 'px;'">
		<BvNavigation
				v-if="customNavigation"
				:background="navigationBackground"
				:color="navigationColor"
				@setMenuButtonRect="setMenuButtonRect">
			<slot name="title">
				{{ title }}
			</slot>
		</BvNavigation>
		<div>
			<slot/>
		</div>
	</div>
</template>

<script>
//自定义导航什么的
import BvNavigation from "../BvNavigation/BvNavigation";

export default {
  name: `bv-page`,
  components: {
    BvNavigation
  },
  props: {
    //自定义导航
    customNavigation: {
      type: Boolean,
      default: false
    },
    //标题
    title: {
      type: String,
      default: ``
    },
    navigationBackground: {
      default: `white`,
      type: String
    },
    navigationColor: {
      default: `black`,
      type: String
    }
  },
  data() {
    return {
      menuButtonRect: {
        height: 0
      }
    };
  },
  methods: {
    setMenuButtonRect(rect) {
      this.menuButtonRect = rect;
    }
  }
};
</script>