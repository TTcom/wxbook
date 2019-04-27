<template>
	<div class="ebook">
		<EbookTitle></EbookTitle>
		<EookReader></EookReader>
	</div>
</template>

<script>
	import EookReader from "../../components/ebook/EbookReader"
	import EbookTitle from "../../components/ebook/EbookTitle"
	export default{
		components:{
			EookReader,
			EbookTitle
		}
	}
</script>

<style lang="scss" scoped>
	.ebook{
		width: 100%;
		height: 100%;
	}
</style>
