<template>
	<div class="store-home">
		<SearchBar></SearchBar>
		<FlapCard></FlapCard>
		<Scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
			<div v-for="item in 50">1111111111111111</div>
			
		</Scroll>
	</div>
</template>

<script>
	import SearchBar from '../../components/home/searchBar'
	import FlapCard from '../../components/home/flapCard'
	import Scroll from '../../components/common/Scroll'
	import { storehomeMixin } from '../../utils/mixin'
	export default{
		mixins: [storehomeMixin],
		components:{
			SearchBar,
			Scroll,
			FlapCard
		},
		methods:{
			onScroll(offsetY){
			       console.log(offsetY);	
				   this.setOffsetY(offsetY);
				   if(offsetY>0){
					   this.scrollTop=52;
				   }else{
					   this.scrollTop=94; 
				   }
				   this.$refs.scroll.refresh();
			}
		},
		data(){
			return{
				scrollTop:94
			}
		},
		
		
		
		
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .store-home{
	  background: white;
	  width: 100%;
	  height: 100%;
  }
</style>
