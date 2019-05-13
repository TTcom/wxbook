1<template>
	<div class="ebookreader" >
		<div id="read">
			
		</div>
	</div>
</template>

<script>
	import {ebookMixin} from '../../utils/mixin'
	import Epub from 'epubjs'
	import {getFontFamily,saveFontFamily,
	getFontSize,saveFontSize,getTheme,
	saveTheme,
	getLocation
	} from '../../utils/localStorage'
	global.epub = Epub
	export default{
		mixins:[ebookMixin],
		methods:{
			
            prevPage(){
				if(this.rendition){
					this.rendition.prev().then(()=>{
						this.refreshLocation();
					})
					this.hideTitleAndMenu();
				}
			},
			nextPage(){
				if(this.rendition){
					this.rendition.next().then(()=>{
						this.refreshLocation();
					});
					this.hideTitleAndMenu();
				}
			},
			toggleTitleAndMenu(){
				console.log("sdasd");
				this.setMenuVisible(!this.menuVisible);
				if(this.menuVisible){
					this.setSettingVisible(-1);
				}
				this.setFontFamilyVisible(false);
			},
			hideTitleAndMenu(){
				this.setMenuVisible(false);
				this.setSettingVisible(-1);
				this.setFontFamilyVisible(false);
			},
			initTheme(){
				let defaultTheme = getTheme(this.fileName);
				if(!defaultTheme){
					defaultTheme = this.themeList[0].name;
					saveTheme(this.fileName,defaultTheme)
				}
				this.setDefaultTheme(defaultTheme);
				this.themeList.forEach(theme=>{
					this.rendition.themes.register(theme.name,theme.style)
				})
				this.rendition.themes.select(defaultTheme)
			},
			initRendition(){
				this.rendition = this.book.renderTo('read',{
					width:innerWidth,
					height:innerHeight,
					method:"default"
				});
				const location = getLocation(this.fileName);
				this.display(location,()=>{
						this.initTheme();
						let fontSize=getFontSize(this.fileName);
						if(!fontSize){
							saveFontSize(this.fileName,this.defaultFontSize)
						}else{
							this.currentBook.rendition.themes.fontSize(fontSize);
							this.setDefaultFontSize(fontSize);
						}
						
						let font=getFontFamily(this.fileName);
						if(!font){
							saveFontFamily(this.fileName,'default')
						}else{
							this.currentBook.rendition.themes.font(font);
							this.setDefaultFontFamily(font);
						}
						this.initGlobalStyle();
				})
				
				this.rendition.hooks.content.register(contents =>{
					contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`)
					contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`)
					contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`)
					contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
				})
				
			},
			initGesture(){     //页面手势
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
			},
			parseBook(){
				this.book.loaded.cover.then(cover=>{
					console.log(cover);
					this.book.archive.createUrl(cover).then(url=>{
						this.setCover(url);
						console.log(url)
					})
				});
				this.book.loaded.metadata.then(metadata=>{ 
					this.setMetadata(metadata);
				});
			},
			initEpub(){      //创建图书实例
				const url =process.env.VUE_APP_RES_URL+'/'+this.fileName;
				console.log("url",url);
				this.book = new Epub(url);
				this.setCurrentBook(this.book);
				this.initRendition();
				this.initGesture();
				this.parseBook();
				this.book.ready.then(()=>{
					return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16)).then(locations=>{
						//console.log(locations);
						this.setBookAvailable(true);
						this.refreshLocation()
					})
					
				})
				
			}
		},
		mounted(){ 
			
			const fileName = this.$route.params.fileName.split('|').join('/');
			console.log(fileName);
			this.setFileName(fileName).then(()=>{
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
