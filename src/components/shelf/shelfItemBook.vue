<template>
	<div class="shelfItemBook">
		<img class="shelf-item-book-cover" :src="data.cover" >
	</div>
</template>

<script>
	export default{
		props:{
			data:Object
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss"  scoped>
  @import "../../assets/styles/global";
  .shelfItemBook{
		width: 100%;
		height: 100%;
		.shelf-item-book-cover{
			width: 100%;
			height: 100%;
		}
	}
  
</style>
