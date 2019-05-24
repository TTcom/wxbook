<template>
  <div class="shelf-list">
		 <div class="shelf-list-item-wrapper" v-for="(item,index) in shelfList" :key="index" style="font-size: 23px;">
              <ShelfItem :data="item" :style="{height:itemHeight}"></ShelfItem>   
							<div class="shelf-list-title-wrapper">
								  <span class="shelf-list-title title-small">{{item.title}}</span>
							</div>
		</div> 
		
		
		
		
		
		
		
		
     <!-- <transition-group name="list"
                      tag="div"
                      id="book-shelf-list"
                      v-if="showType === 0 || showType === 1">
      <div class="book-shelf-item" v-for="(item, index) in shelfList" :key="item.id" @click="onBookClick(item, index)">
        <div class="book-img-wrapper" :class="{'add-book': item.type === 3, 'category-book': item.type ===2}"
             ref="bookImg">
          <shelf-image :data="item" :isEditMode="isEditMode" v-if="item.type === 1"></shelf-image> -
          <shelf-category :data="item"></shelf-category>
          <span class="icon-add icon" v-else></span> 
        </div>
        <div class="book-title-wrapper">
          <span class="book-title title-small">{{item.title}}</span>
        </div>
      </div>
    </transition-group>
    <div class="book-shelf-label-list-wrapper" v-if="showType === 2 || showType === 3">
      <div class="book-shelf-list-wrapper" v-for="(item, index) in purchaseData" :key="index" ref="bookShelfList">
        <div class="book-shelf-label-item" :class="{'is-fixed': item.isFixed}">
          <span class="book-shelf-label-text">{{item.label}}</span>
        </div>
        <div class="book-shelf-item-wrapper">
          <div class="book-shelf-item" v-for="(subItem, subIndex) in item.bookList" :key="subItem.id"
               @click="onBookClick(subItem, subIndex)">
            <div class="book-img-wrapper" :class="{'add-book': subItem.type === 3, 'category-book': subItem.type ===2}"
                 ref="bookImg">
              <shelf-image :data="subItem" :isEditMode="isEditMode" v-if="subItem.type === 1"></shelf-image>
              <shelf-category :data="subItem" :isEditMode="isEditMode" v-else-if="subItem.type === 2"></shelf-category>
              <span class="icon-add icon" v-else></span>
            </div>
            <div class="book-title-wrapper">
              <span class="book-title title-small">{{subItem.title}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="book-shelf-statistics" v-show="showType === 0">{{$t('shelf.statistic').replace('$1', publicNumber).replace('$2', privateNumber)}}
    </div> -->
  </div>
</template>

<script>

  import { realPx } from '../../utils/utils'
  import { flatBookList } from '../../utils/book'
  import { storeShelfMixin } from '../../utils/mixin'
  import ShelfItem from './shelfItem'	
  export default {
		mixins:[storeShelfMixin],
    props: {
      data: Array,
      showType: {
        type: Number,
        default: 0
      }
    },
		mounted(){
			 console.log(this.shelfList)
		},
    components: {
         ShelfItem
    },
    computed: {
      itemHeight(){
				return ((window.innerWidth-realPx(120)) / 3) /250 * 350 + 'px'
			}
    },
    methods: {
      fixTitle(offsetY) {
        if (this.showType === 2 || this.showType === 3) {
          if (offsetY > realPx(10) && offsetY < this.bookShelfList) {
            if (this.purchaseData[0].isFixed === false) {
              this.purchaseData[0].isFixed = true
              this.purchaseData[1].isFixed = false
              this.$forceUpdate()
            }
          } else if (offsetY >= this.bookShelfList - realPx(42)) {
            if (this.purchaseData[1].isFixed === false) {
              this.purchaseData[0].isFixed = false
              this.purchaseData[1].isFixed = true
              this.$forceUpdate()
            }
          } else {
            this.purchaseData[0].isFixed = false
            this.purchaseData[1].isFixed = false
            this.$forceUpdate()
          }
        }
      },
      onBookClick(item, index) {
        if (item.type === 3) {
          this.$router.push('/book-store/home')
        } else if (item.type === 1) {
          if (this.isEditMode) {
            item.selected = !item.selected
          } else {
            this.$emit('onBookClick', item, index)
          }
        } else if (item.type === 2) {
          if (!this.isEditMode) {
            this.$router.push({
              path: '/book-store/category',
              query: {
                index: index
              }
            })
          }
        }
      }
    }
  }
</script>

<style lang="scss"  scoped>
  @import "../../assets/styles/global";

  .shelf-list{
    width: 100%;
    overflow: auto;
    font-size: px2rem(15);
		display:flex;
		flex-flow:row wrap;
		padding:0 px2rem(15);
		box-sizing:border-box;
    .shelf-list-item-wrapper{
			flex:0 0 33.33%;
			width:33.33%;
			padding:px2rem(15);
			box-sizing:border-box;
			.shelf-list-title-wrapper{
				margin-top: px2rem(10);
			}
		}
  }
</style>
