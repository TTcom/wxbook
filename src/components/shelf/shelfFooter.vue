<template>
     <div class="shelfFooter" v-show="isEditMode">
		<div class="shelf-footer-tab-wrapper" v-for="item in tabs" @click="onTabClick(item)"
		 :class="{'is-selected':isSelected}"
		>
			<div class="shelf-footer-tab">
				<div class="icon-private tab-icon" v-if="item.index===1"></div>
				<div class="icon-download tab-icon" v-if="item.index===2"></div>
				<div class="icon-move tab-icon" v-if="item.index===3"></div>
				<div class="icon-shelf tab-icon" v-if="item.index===4"></div>
				<div class="tab-text">{{item.label1}}</div>
			</div>
			
		</div>	 
	 </div>
</template>

<script>
	import { storeShelfMixin } from '../../utils/mixin'
	export default{
		mixins:[storeShelfMixin],
		methods:{
			onTabClick(item){
				
			}
		},
		computed: {
			isSelected(){
				return this.shelfSelected && this.shelfSelected.length>0
			},
		  tabs() {
		    return [
		      {
		        label1:this.$t('shelf.private'),
				label2:this.$t('shelf.noprivate'),
				index:1,
				},
			  {
			    label1:this.$t('shelf.download'),
				label2:this.$t('shelf.delete'),
				index:2
			  },
			  {
			    label1:this.$t('shelf.move'),
				index:3
			 } ,
			  {
			    label1:this.$t('shelf.remove'),
				index:4
			  },
		     
		    ]
		  }
		},
	}
</script>

<style lang="scss"  scoped>
	@import "../../assets/styles/global";
  .shelfFooter{
	  position: fixed;
	  bottom: 0;
	  left: 0;
	  z-index: 120;
	  display: flex;
	  width: 100%;
	  height: px2rem(48);
	  background: white;
	  box-shadow: 0 px2rem(-2) px2rem(4) 0 rgba(0,0,0,.1);
	  .shelf-footer-tab-wrapper{
		  flex: 1;
		  width: 25%;
		  height: 100%;
		 
		  .shelf-footer-tab{
			  width: 100%;
			  height: 100%;
			  @include columnCenter;
		     .tab-icon{
				 font-size: px2rem(20);
				 color: #666;
				 opacity: .5;
			 }
			 .tab-text{
				 margin-top: px2rem(5);
				 font-size: px2rem(12);
				 color: #666;
				 opacity: .5;
			 }
			 
		  }
		   .is-selected{
		  	 opacity: 1;
		  }
	  }
	  
  }
  
</style>
