<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div class="menu-wrapper" :class="{'hide-box-shadow':!menuVisible || settingVisible>=0}" v-show="menuVisible">
        <div class="icon-wrapper">
          <span class="icon-menu" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-A" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
		<EbookSettingFont></EbookSettingFont>
		<EbookSettingFontPopup></EbookSettingFontPopup>
		<EbookSettingTheme></EbookSettingTheme>
		<EbookSettingProgress></EbookSettingProgress>
    <!-- <transition name="slide-up">
    <div class="setting-wrapper" v-show="ifSettingShow">
  </transition>
    <content-view :ifShowContent="ifShowContent"
                    v-show="ifShowContent"
                    :navigation="navigation"
                    :bookAvailable="bookAvailable"
                    @jumpTo="jumpTo"></content-view>
    <transition name="fade">
      <div class="content-mask"
            v-show="ifShowContent"
            @click="hideContent"></div>
    </transition> -->
  </div>
</template>

<script>
//import ContentView from '@/components/Content'
import EbookSettingFont from './EbookSettingFont'
import EbookSettingFontPopup from './EbookSettingFontPopup'
import EbookSettingTheme from './EbookSettingTheme'
import EbookSettingProgress from './EbookSettingProgress'
import {ebookMixin} from '../../utils/mixin'
export default {
	mixins:[ebookMixin],
  components: {
   EbookSettingFont,
	 EbookSettingFontPopup,
	 EbookSettingTheme,
	 EbookSettingProgress
  },
  data() {
    return {

    }
  },
  methods: {
    // 隐藏目录
    hideContent() {
      this.ifShowContent = false
    },
    // 跳转方法，调用父组件方法
    jumpTo(target) {
      this.$emit('jumpTo', target)
    },
    // 拖动进度条时触发事件
    onProgressInput(progress) {
      this.progress = progress
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    },
    // 进度条松开后触发事件，根据进度条数值跳转到指定位置
    onProgressChange(progress) {
      this.$emit('onProgressChange', progress)
    },
    // 设置主题
    setTheme(index) {
      this.$emit('setTheme', index)
    },
    // 设置字号
    setFontSize(fontSize) {
      this.$emit('setFontSize', fontSize)
    },
    // 显示设置面板
    showSetting(key) {
				this.setSettingVisible(key);
    },
    hideSetting() {
      this.ifSettingShow = false
    }
  }
}

</script>

<style lang='scss' scoped>
@import '../../assets/styles/global';
.menu-bar {
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 102;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
	font-size: px2rem(20);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: px2rem(24);
      }
      .icon-bright {
        font-size: px2rem(22);
      }
    }
  }
  .content-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: 100%;
    background: rgba(51, 51, 51, .8);
  }
}
</style>
