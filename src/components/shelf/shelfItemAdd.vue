<template>
	<div class="shelfItemAdd">
		 <span class="icon-add"></span>
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
  .shelfItemAdd {
    width: 100%;
    height: 100%;
		border:1px solid #ccc;
		box-sizing:border-box;
		@include center;
    .icon-add{
			font-size:px2rem(40);
			color:#ccc;
		}
  }
</style>
