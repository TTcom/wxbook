<template>
	<div class="shelfItem shelf-item-shadow" @click="onItemClick">
		<component  
			class="shelf-item-comp"
			:is="item" :data="data"
			:class="{'is-edit': isEditMode && data.type !=3}" ></component>
		<div class="icon-selected" :class="{'is-selected':data.selected}" v-show="isEditMode && data.type!=3"></div>
	</div>
</template>

<script>
	import { storeShelfMixin } from '../../utils/mixin'
	import ShelfItemBook from './shelfItemBook'
	import ShelfItemCategory from './shelfItemCategory'
	import ShelfItemAdd from './shelfItemAdd'
	import { gotoStoreHome } from '../../utils/book'
	export default{
		mixins:[storeShelfMixin],
		props:{
			data:Object
		},
		computed:{
			item(){
				return  this.data.type === 1? this.book : (this.data.type === 2 ? this.category : this.add)
			}
		},
		data(){
			return{
				book:ShelfItemBook,
				category:ShelfItemCategory,
				add:ShelfItemAdd,
			}
		},
		methods:{
			 onItemClick(){
				 if(this.isEditMode){
					 this.data.selected=!this.data.selected;
					 if(this.data.selected){
						 this.shelfSelected.pushWithoutDuplicate(this.data);
					 }else{
						 this.setShelfSelected(this.shelfSelected.filter(item => item.id!==this.data.id))
					 }
				 }else{
					 if(this.data.type===3){
					 	 gotoStoreHome(this)
					 }else{
					 	 this.showBookDetail(this.data);
					 }
				 }
				 
			 }
		}
	}
	
	
</script>

<style lang="scss"  scoped>
  @import "../../assets/styles/global";
  .shelfItem{
	  width: 100%;
	  height: 100%;
	  position: relative;
	  &.shelf-item-shadow{
		 box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200, 200, 200, 1);
	  }
	  .shelf-item-comp{
		  opacity: 1;
		  &.is-edit{
			  opacity: .5;
		  }
	  }
	  .icon-selected{
		  position: absolute;
		  bottom: px2rem(2);
		  right: px2rem(2);
		  font-size: px2rem(18);
		  color: rgba(0,0,0,.4);
		  &.is-selected{
			  color: $color-blue;
		  }
	  }
  }
  
</style>
