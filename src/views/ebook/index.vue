<template>
	<div class="ebook" ref="ebook">
		<EbookTitle></EbookTitle>
		<EookReader></EookReader>
		<EbookMenu></EbookMenu>
		<EbookBookmark></EbookBookmark>
		<EbookHeader></EbookHeader>
		<EbookFooter></EbookFooter>
	</div>
</template>

<script>
	import EookReader from "../../components/ebook/EbookReader"
	import EbookTitle from "../../components/ebook/EbookTitle" 
	import EbookMenu from "../../components/ebook/EbookMenu"
	import EbookHeader from "../../components/ebook/EbookHeader"
	import EbookFooter from "../../components/ebook/EbookFooter"
	import EbookBookmark from "../../components/ebook/EbookBookmark"
	import {getReadTime,saveReadTime} from '../../utils/localStorage'
	import { ebookMixin } from '../../utils/mixin'
	export default{
		mixins:[ebookMixin],
		components:{
			EookReader,
			EbookTitle,
			EbookMenu,
			EbookBookmark,
			EbookFooter,
			EbookHeader
		},
		watch:{
			offsetY(v){
				if(v>0){
					this.move(v);
				}else if(v===0){
					this.restore();
				}
			}
		},
		methods:{
			restore(){
				this.$refs.ebook.style.top= 0;
				this.$refs.ebook.style.transition = 'all .2s linear';
				setTimeout(()=>{
					this.$refs.ebook.style.transition = '';
				},200)
			},
			move(v){
				this.$refs.ebook.style.top= v+'px';
				
			},
			startLoopReadTime(){
				let readTime = getReadTime(this.fileName);
				if(!readTime){
					readTime=0
				}
				this.task = setInterval(()=>{
					readTime++;
					if(readTime % 30 ===0){
						saveReadTime(this.fileName,readTime);
					}
				},1000)
			}
		},
		mounted(){
			this.startLoopReadTime();
		},
		beforeDestroy(){
			if(this.task){
				clearInterval(this.task);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ebook{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
