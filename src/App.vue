<template>
  <div id="app">
		<span class="daysone">ABCDEFG</span>
    <router-view/>
  </div>
</template>
<script>
	import {mapGetters} from 'vuex'
	export default{
		   computed:{
			 ...mapGetters(['test'])
		   },
		   mounted(){
				 this.$store.dispatch('setTest',122).then(()=>{
					   console.log(this.test);
				 })
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
	@import "./assets/styles/global";
   .daysone{
		 font-family: 'Days One';
		 font-size:px2rem(20);
		 color: orange;
	 }
</style>
