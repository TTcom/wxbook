<template>
  <div class="search-bar-wrapper">
    <div class="title-search-wrapper" :class="{'show-search': ifShowSearchPage, 'hide-shadow': ifHideShadow}" ref="titleSearchWrapper">
      <transition name="title">
        <div class="title-search-page-wrapper" v-show="!ifShowSearchPage">
          <span class="title-text">{{$t('home.title')}}</span>
          <div class="icon-shake-wrapper" @click="showFlapCard">
            <span class="icon-shake icon"></span>
          </div>
        </div>
      </transition>
      <div class="icon-back-wrapper" :class="{'show-search': ifShowSearchPage}" @click="back">
        <span class="icon-back icon"></span>
      </div>
      <div class="search-wrapper" :class="{'show-search': ifShowSearchPage}">
        <div class="search-back-wrapper" :class="{'show-search': ifShowSearchPage}">
          <span class="icon-back icon" :class="{'show-search': ifShowSearchPage}"></span>
        </div>
        <div class="search-bg">
          <span class="icon-search icon"></span>
          <input type="text" class="search" :placeholder="$t('home.hint')" v-model="searchText" 
					@click="showHotSearch" @keyup.13.exact="search">
        </div>
      </div>
    </div>
    <HotSearchList v-show="HotSearchVisible"></HotSearchList>
		
		
		
  </div>
</template>

<script>
  import { realPx } from '../../utils/utils'
	import { storehomeMixin } from '../../utils/mixin'
  
  import HotSearchList from '../../components/home/HotSearchList'
  export default {
		mixins: [storehomeMixin],
    components: {
			HotSearchList
    },
		watch:{
			    offsetY(offsetY){
						console.log(offsetY);
						if(offsetY>0){
							this.hideTitle();
							this.showShadow();
						}else{
							this.showTitle();
							this.hideShadow();
						}
					},
					hotSearchOffsetY(offsetY){
						console.log(offsetY);
						if(offsetY>0){
							this.hideTitle();
							this.showShadow();
						}else{
							this.showTitle();
							this.hideShadow();
						}
					},
		},
    // props: {
    //   ifShowSearchPage: {
    //     type: Boolean,
    //     default: false
    //   },
    //   ifShowHotSearch: {
    //     type: Boolean,
    //     default: true
    //   },
    //   bookListOffsetY: Number
    // },
    data() {
      return {
				HotSearchVisible:false,
				ifShowSearchPage:false,
				ifShowHotSearch:true,
				bookListOffsetY:Number,
        ifHideShadow: true,
        searchText: null
      }
    },
    methods: {
			showHotSearch() {
				this.HotSearchVisible=true;
				this.hideShadow()
				
				if(this.hotSearchOffsetY>0){
					this.hideTitle();
					this.showShadow();
				}else{
					this.showTitle();
					this.hideShadow();
				}
			  // this.showSearchPage()
			  // this.hideShadow()
			  // this.$emit('update:ifShowHotSearch', true)
			  // this.$nextTick(() => {
			  //   this.initHotSearch()
			  // });
				
				
				
			},
			hideTitle(){
				this.ifShowSearchPage=true;
			},
			showTitle(){
				this.ifShowSearchPage=false;
			},
      setKeyword(keyword) {
        this.searchText = keyword
        this.searchList.historySearch.push(keyword)
      },
      search() {
        this.$router.push({
          path: '/store/list',
          query: {
            keyword: this.searchText
          }
        })
				
				
      },
      hideHotSearch() {
				this.HotSearchVisible=false;
				if(this.offsetY>0){
					this.hideTitle()
					this.showShadow();
				}else{
					this.showTitle();
					this.hideShadow();
				}
				
       // this.$emit('update:ifShowHotSearch', false)
      },
      showShadow() {
        this.ifHideShadow = false
      },
      hideShadow() {
        this.ifHideShadow = true
      },
      back() {
				
				if(this.offsetY>0){
					this.showShadow();
				}else{
					this.hideShadow();
				}
				if(this.HotSearchVisible){
					this.hideHotSearch()
				}else{
					   this.$router.push({
							  path:'/store/shelf'
						 })
				}
				
				
        // this.searchText = ''
        // if (this.ifShowSearchPage) {
        //   if (this.bookListOffsetY <= 0) {
        //     this.hideSearchPage()
        //   } else {
        //     if (this.ifShowHotSearch) {
        //       this.hideHotSearch()
        //       this.showShadow()
        //     } else {
        //       this.$router.push('/book-store/shelf')
        //     }
        //   }
        // } else {
        //   this.$router.push('/book-store/shelf')
        // }
        // this.$emit('back')
      },
      hideSearchPage() {
        this.$emit('update:ifShowSearchPage', false)
        this.ifHideShadow = true
      },
      showSearchPage() {
        this.$emit('update:ifShowSearchPage', true)
      },
      showFlapCard() {
        this.setFlapCardVisible(true)
      },
      handleScroll(e) {
        const target = e.target
        if (target) {
          if (target.scrollTop > 0) {
            this.ifHideShadow = false
          } else {
            this.ifHideShadow = true
          }
        }
      },
      initHotSearch() {
        if (this.$refs.searchMaskWrapper) {
          this.$refs.searchMaskWrapper.style.height = window.innerHeight - realPx(52) + 'px'
          this.$refs.searchMaskWrapper.addEventListener('scroll', this.handleScroll)
          this.$refs.searchMaskWrapper.scrollTo(0, 0)
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .search-bar-wrapper {
    .title-search-wrapper {
      position: relative;
      z-index: 110;
      width: 100%;
      height: px2rem(94);
      background: white;
      box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
      &.show-search {
        height: px2rem(52);
      }
      &.hide-shadow {
        box-shadow: none;
      }
      .title-search-page-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 105;
        width: 100%;
        height: px2rem(42);
        @include center;
        .title-text {
          font-weight: bold;
					font-size: px2rem(20);
        }
        .icon-shake-wrapper {
          position: absolute;
          right: 0;
          top: 0;
          z-index: 110;
          padding-right: px2rem(10);
          height: 100%;
          @include center;
        }
      }
      .icon-back-wrapper {
        position: absolute;
        left: px2rem(10);
        top: 0;
        z-index: 110;
        height: px2rem(42);
        @include center;
        transition: all $homeAnimationTime linear;
        &.show-search {
          height: px2rem(52);
        }
      }
      .search-wrapper {
        position: absolute;
        top: px2rem(42);
        left: 0;
        z-index: 100;
        display: flex;
        padding: px2rem(10);
        width: 100%;
        box-sizing: border-box;
        transition: all $homeAnimationTime linear;
        &.show-search {
          top: 0;
        }
        .search-back-wrapper {
          flex: 0;
          width: 0;
          @include center;
          transition: all $homeAnimationTime linear;
          visibility: hidden;
          &.show-search {
            margin-right: px2rem(10);
            flex: 0 0 px2rem(20);
            width: px2rem(20);
          }
          .icon-back {
            font-size: 0;
            &.show-search {
              font-size: px2rem(20);
            }
          }
        }
        .search-bg {
          flex: 1;
          background: #f4f4f4;
          border-radius: px2rem(20);
          border: px2rem(1) solid #eee;
          box-sizing: border-box;
          padding: px2rem(5) px2rem(15);
          transition: all $homeAnimationTime linear;
          @include left;
          .icon-search {
            font-size: px2rem(16);
            color: #999;
          }
          .search {
            color: #666;
            width: 100%;
            height: px2rem(22);
            background: transparent;
            font-size: px2rem(12);
            margin-left: px2rem(10);
            border: none;
            &:focus {
              outline: none;
            }
            &::-webkit-input-placeholder {
              color: #ccc;
            }
          }
        }
      }
    }
    .hot-search-wrapper {
      width: 100%;
      height: 100%;
      background: white;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none;
      }
      .line {
        width: 100%;
        height: 0;
        border-top: px2rem(1) solid #eee;
        margin: px2rem(10) 0;
      }
    }
  }
</style>
