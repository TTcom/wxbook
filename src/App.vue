<template>
  <div id="app">
		<!-- <Dragbox></Dragbox> -->
    <router-view/>
		
  </div>
</template>
<script>
	import Dragbox from './components/dragbox'
	import {timeout} from './utils/test'
	import axios from 'axios'
	export default{
		   components:{
				 Dragbox
			 },
			 mounted(){
				 
				// 实例一
				//  //通过使用async模拟异步
				// //后执行
				// timeout().then(result=>{
				// 	console.log(result);
				// 	//需要return才会触发下一次.then;
				//      return result+"111"
				// }).then(result=>{
				// 	console.log(result)
				// 	
				// })
				//  
				// //先执行
				// console.log("iaminbehind"); 
                  
				  // 实例二使用await
				  
				   // this.getAllData();
				   // console.log("helloword");
				   // 
				   // var a=5;
				   // function testa(a){
					  //  
					  // return   a == -1 ?  "未知" : (a == 0 ? "中性" : (a == 1 ? "男性" : "女性"))        
				   // }
				   //  
				   // console.log(testa(a));
				   
				   
				   axios.get('/api/getImg').then(res=>{
					   
					    console.log(res);
				   })
				   
				   
				   
				   
				   
				   
				   
				   
				   
				   
				   
			 },
			 methods:{
				 async getAllData() {
				   var a= await this.getnumberone(12);
				   var b= await this.getnumbertwo(22);
				   var c= await this.getnumberthree(32);
				   console.log(a,b,c)
                   console.log("cccc",a+b+c)
				},
				getnumberone(num) {
					return num
				},
				getnumbertwo(num) {
					return new Promise((resolve, reject) => {
						setTimeout(() => {
							resolve(2 * num)
						}, 2000);
					} )
				},
				getnumberthree(num) {
					return new Promise((resolve, reject) => {
						setTimeout(() => {
							resolve(2 * num)
						}, 2000);
					} )
				}
				 
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
			 background: dimgray;
		 }
</style>
