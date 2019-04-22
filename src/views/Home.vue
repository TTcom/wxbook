<template>
  <div class="home">
   <div id="read">
		 <span class="icon-cart"></span>
		 <span class="icon-clock"></span>
	 </div>
  </div>
</template>

<script>

import Epub from 'epubjs'
global.epub = Epub
export default {
  name: 'home',
	mounted(){
// 		  this.book = new Epub('/shanhaijing.epub')
// 			this.book.renderTo('read',{
// 				width:window.innerWidth,
// 				height:window.innerHeight
// 			}).display()
	}
}
</script>
