<template>
  <div id="app">
		<!-- <Dragbox></Dragbox> -->
    <router-view/>
		
  </div>
</template>
<script>
	import Dragbox from './components/dragbox'
	export default{
		   components:{
				 Dragbox
			 }
			 
	}
			document.addEventListener('DOMContentLoaded',()=>{
					const html = document.querySelector('html');
					let fontSize = window.innerWidth / 10;
					fontSize = fontSize>50 ? 50 : fontSize;
					html.style.fontSize = fontSize + 'px';
					
					console.log("window.innerWidth",window.innerWidth)
					console.log("fontSize",fontSize)
			})
	 

</script>
<style lang="scss" scoped>
     #app{
			 width: 100%;
			 height: 100%;
			 overflow: hidden;
		 }
</style>
