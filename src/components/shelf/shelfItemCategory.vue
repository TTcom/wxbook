<template>
  <div class="shelfItemCategory">
    
		<img class="shelf-item-book-cover" v-lazy="data.cover" >
		
		
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
  .shelfItemCategory {
    width: 100%;
    height: 100%;
    .shelf-item-book-cover{
			 width: 100%;
			height: 100%;
		}
  }
</style>
