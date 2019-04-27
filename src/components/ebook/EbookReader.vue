<template>
	<div class="ebookreader" >
		<div id="read">
			
		</div>
	</div>
</template>

<script>
	import {mapGetters} from "vuex"
	import Epub from 'epubjs'
	global.epub = Epub
	export default{
		computed:{
			...mapGetters(['fileName','menuVisible'])
		},
		methods:{
            prevPage(){
				if(this.rendition){
					this.rendition.prev();
				}
			},
			nextPage(){
				if(this.rendition){
					this.rendition.next();
				}
			},
			toggleTitleAndMenu(){
				console.log("sdasd");
				this.$store.dispatch("setMenuVisible",!this.menuVisible)
			},
			initEpub(){      //创建图书实例
				const url = "http://localhost:9000/" + this.fileName;
				console.log("url",url);
				this.book = new Epub(url);
				this.rendition = this.book.renderTo('read',{
					width:innerWidth,
					height:innerHeight,
					method:"default"
				})
				this.rendition.display();
				this.rendition.on('touchstart',event=>{      //图书开始滑动事件
					//console.log(event);
					this.touchStartX=event.changedTouches[0].clientX
					this.touchStartTime = event.timeStamp;
				});
				this.rendition.on('touchend',event=>{    //图书结束滑动事件
				//	console.log(event);
					const offsetX = event.changedTouches[0].clientX - this.touchStartX;
					const time = event.timeStamp - this.touchStartTime;
					console.log(offsetX,time);
					if(time < 500 && offsetX > 40){
						this.prevPage();
					}else if(time < 500 && offsetX < -40){
						this.nextPage();
					}else{
						this.toggleTitleAndMenu();
					}
					event.preventDefault();
					event.stopPropagation();
				});
				
				
			}
		},
		mounted(){ 
			
			const fileName = this.$route.params.fileName.split('|').join('/');
			console.log(fileName);
			this.$store.dispatch('setFileName',fileName).then(()=>{
				this.initEpub();
			})
		}
	}
</script>

<style lang="scss" scoped>
   @import "../../assets/styles/global";
   .ebookreader{
	   height: 100%;
	   width: 100%;
   }
</style>
