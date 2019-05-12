<template>
	<div class="ebook">
		<EbookTitle></EbookTitle>
		<EookReader></EookReader>
		<EbookMenu></EbookMenu>
	</div>
</template>

<script>
	import EookReader from "../../components/ebook/EbookReader"
	import EbookTitle from "../../components/ebook/EbookTitle"
	import EbookMenu from "../../components/ebook/EbookMenu"
	import {getReadTime,saveReadTime} from '../../utils/localStorage'
	import { ebookMixin } from '../../utils/mixin'
	export default{
		mixins:[ebookMixin],
		components:{
			EookReader,
			EbookTitle,
			EbookMenu
		},
		methods:{
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
	}
</style>
