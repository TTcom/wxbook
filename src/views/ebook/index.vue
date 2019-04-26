<template>
	<div class="ebook">
		<EookReader></EookReader>
	</div>
</template>

<script>
	import EookReader from "../../components/ebook/EbookReader"
	export default{
		components:{
			EookReader
		}
	}
</script>

<style lang="scss" scoped>
	.ebook{
		width: 100%;
		height: 100%;
	}
</style>
