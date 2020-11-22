<template>
	<div class="navigation"
	     :style="
	     'padding-top:' + menuButton.top +'px;'+
	     'background:'+ background + ';' "
	>
		<div class="navigation-container"
		     :style="
		     'line-height:' + menuButton.height + 'px;' +
		     'height:'+ menuButton.height + 'px;'+
		     'color:' + color + ';'">
			<div class="left-control-container" :style="
			     'padding-left:' + (systemInfo.screenWidth - menuButton.width - menuButton.left) + 'px;' +
			     'width:' + (systemInfo.screenWidth - menuButton.left) + 'px;'">
				<div v-if="backMenuStatus || showHomeMenuStatus" class="left-control" :style="
				'width:' + (systemInfo.screenWidth -  menuButton.left - (systemInfo.screenWidth - menuButton.width - menuButton.left)) + 'px;' +
				'height:' + menuButton.height + 'px;'">
					<div class="icon-container" v-if="backMenuStatus" @click="routerBack">
						<!-- 返回按钮 -->
						<img
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABeElEQVRYR8XWMUscQRiH8d+hYi0ipAhiIWLhJzAYbCwklZ2VnY0oFmolSELAJhYBbbSySKWFoijWapKvIMTCUjAfQgbuYFk4b2d27px2Z/d53v/7sjMN77wa78zXDYFZXOAJK7h/q8jcAnO4xGATeoP5XgkE+BUGCsAdfO+FwBecleB72Oo0YzlasIAT9BdgleBhf12BAD9FXwq8rsAifpXgX/GtU+zF56kJLOG4lGDod4g+aqUILOMwBzylBQF+VCoxqfLWN2ISWMV+TnhMApv4kRteVWAdP0vwNRxETVubzVVa8B/Dhfd3sZ0DXjWBcJp9KgAfMYPnHBJVEhjFb3zshkQVgcAdw103JKoKtCT+4kPOJGIEAne8mURZYhovKTMRK9BO4gGfUyRSBLJKpAq0JP5gpBB9dBJ1BAJ3Erd1JOoK1JbIIVBLIpdAO4lrhBtz25VToCURBnOoSfyHiV4KBNZU8+ISzpANnPdaIOqHmLsFUfCw+RXTCUQhpPimNwAAAABJRU5ErkJggg=="
								class="icon"/>
					</div>
					<div class="icon-container" v-if="showHomeMenuStatus" @click="routerHome">
						<!-- 首页按钮 -->
						<img
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABMklEQVRYR+2WsUoDQRBAX35BhDRBwUbSpbAKQiBNCrHyS6zyDSnyJ3aSJl2ImCJIypBGULAQ9BsSFu5gXTLZ3bldDuSuvZ15b4YZdlvU/LVq5lNF4ByYFQXcAT+aYrQCBv4CXBfQHXCrkdAIuPCycJVErIAEV0vECPjgKolQgVB4tESIQBtYWAMXOuxBM+ETMPBX4CqU6pwzEgPgW4o/JVAVXjLfgb4kIQmkgnsljgmkhp+UcAVywUUJWyA3/KiELbAGbpTTHhv2VrJsgSfgITaT8vwcGJlYaQt+gTNlcinsC+i4PxuBpgNNBzQdeAbGwNZZqS4wAe6FPUy2hpfApwC5AD5yC/geMft/IbABekIl2g6sipfRn7RSsiEwFSQ0Aub2ewSWoXdB4ntITuerJrvIAUgATiEUj8qOAAAAAElFTkSuQmCC"
								class="icon"/>
					</div>
				</div>
			</div>
			<div class="title">
				<slot/>
			</div>
			<div :style="
			'width:' + (systemInfo.screenWidth -  menuButton.left) + 'px;'"></div>
		</div>
	</div>
</template>

<script>

//自定义导航底部padding值
const navPaddingBottom = 10;
//首页地址
const homePath = `/pages/home/index`;

function getMenuButton() {
  return {
    top: 0,
    width: 0,
    height: 0,
    paddingBottom: 0
  };
}

export default {
  name: `bv-navigation`,
  props: {
    color: {
      default: `#000`,
      type: String
    },
    background: {
      default: `white`,
      type: String
    }
  },
  computed: {
    backMenuStatus() {
      return getCurrentPages().length > 1;
    }
  },
  data() {
    return {
      menuButton: getMenuButton(),
      systemInfo: {
        screenWidth: 0
      },
      showHomeMenuStatus: false
    };
  },
  methods: {
    init() {
      //获取右上胶囊位置
      try {
        const rect = uni.getMenuButtonBoundingClientRect();
        rect.paddingBottom = navPaddingBottom;
        /*rect.top += 2;*/
        this.menuButton = rect;
      } catch (e) {
      }
      this.systemInfo = uni.getSystemInfoSync();
      this.$emit(`setMenuButtonRect`, this.menuButton);
    },
    //后退
    routerBack() {
      uni.navigateBack();
    },
    routerHome() {
      uni.reLaunch({
        url: homePath
      });
    },
    setShowMenuStatus() {
      const pageRoutes = getCurrentPages();
      const currentPage = pageRoutes[pageRoutes.length - 1];
      this.showHomeMenuStatus = (`/${currentPage.route}` !== homePath);
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.setShowMenuStatus();
    console.log(this.showHomeMenuStatus);
  }
};
</script>

<style lang="scss" scoped>
.navigation {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5;
	box-sizing: border-box;
	width: 100%;
	font-size: 18px;
	background-color: #c7c7c7;
	padding-bottom: 10px;

	.navigation-container {
		display: flex;
		justify-content: space-between;
	}

	.title {
		flex: 1;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		padding: 0 rpx(10);
	}


	.left-control-container {
		box-sizing: border-box;

		.left-control {
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			border: 0.5px solid rgb(221, 221, 221);
			border-radius: 50px;
			background-color: rgba(255, 255, 255, .72);
		}

		.icon-container {
			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;

			&:not(:last-child) {
				border-right: 0.5px solid #666;
			}
		}

		.icon {
			$area: 15px;
			width: $area;
			height: $area;
		}
	}
}
</style>