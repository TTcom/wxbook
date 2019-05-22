<template>
	<div class="store-home">
		<SearchBar></SearchBar>
		<FlapCard :data="random"></FlapCard>
		<Scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
			<div class="banner-wrapper">
				<div class="banner-img" :style="{backgroundImage:`url('${banner}')`}"></div>
			</div>
			<GuessYouLike :data="guessYouLike"></GuessYouLike>
			<Recommend class="recommend" :data="recommend"></Recommend>
			<Featured class="recommend" :titleText="$t('home.featured')" :btnText="$t('home.seeAll')" :data="featured"></Featured>
		  <div class="category-list-wrapper" v-for="(item, index) in categoryList" :key="index">
		    <CategoryBook :data="item"></CategoryBook>
		  </div>
		  <category class="recommend" :data="categories"></category>
		
		</Scroll>
	</div>
</template>

<script>
	import SearchBar from '../../components/home/searchBar'
	import FlapCard from '../../components/home/flapCard'
	import GuessYouLike from '../../components/home/guessYouLike'
	import Recommend from '../../components/home/recommend'
	import Featured from '../../components/home/featured'
	import CategoryBook from '../../components/home/categoryBook'
	import Category from '../../components/home/category'
	import Scroll from '../../components/common/Scroll'
	import { storehomeMixin } from '../../utils/mixin'
	import {home} from '../../api/store'
	export default{
		mixins: [storehomeMixin],
		components:{
			SearchBar,
			Scroll,
			FlapCard,
			GuessYouLike,
			Recommend,
			Featured,
			CategoryBook,
			Category
			
		},
		data(){
			return{
				scrollTop:94,
				random:null,
				banner:null,
				guessYouLike:null,
				recommend:null,
				featured:null,
				categoryList:null,
				categories:null
			}
		},
		mounted(){
			home().then(res=>{
				console.log(res);
				const data = res.data;
				const randomIndex = Math.floor(Math.random() * data.random.length);
				this.random=data.random[randomIndex];
				this.banner=data.banner;
				this.guessYouLike=data.guessYouLike;
				this.recommend=data.recommend;
				this.featured=data.featured
				this.categoryList=data.categoryList;
				this.categories=data.categories;
			})
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
				   //this.$refs.scroll.refresh();
			}
		},
		
		
		
		
		
	}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .store-home{
	  background: white;
	  width: 100%;
	  height: 100%;
	  .banner-wrapper{
		  width:100%;
		  padding:px2rem(10);
		  box-sizing:border-box;
		  .banner-img{width: 100%;height: px2rem(150);background-repeat:no-repeat;background-size:100% 100%;}
	  }
	  .recommend{margin-top: 20px;}
  }
</style>
