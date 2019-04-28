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
	export default{
		components:{
			EookReader,
			EbookTitle,
			EbookMenu
		}
	}
</script>

<style lang="scss" scoped>
	.ebook{
		width: 100%;
		height: 100%;
	}
</style>
