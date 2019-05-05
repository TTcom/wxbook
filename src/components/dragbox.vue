<template>
	<div class="dragBox"  @mousedown="drag" ref="dragBox">
		
	</div>
</template>

<script>
	export default{
		methods:{
			drag(e){
				console.log(e)
				var oDiv=this.$refs.dragBox;
				var disX = e.clientX;
				var oDivoffsetLeft=oDiv.offsetLeft;
				var disY = e.clientY;
				var oDivoffsetTop=oDiv.offsetTop;
				console.log("drag",e.clientX)
				document.onmousemove=function(e){
						e.preventDefault();
						console.log("onmousemove",e.clientX);
						
						var l =e.clientX-disX+oDivoffsetLeft;
						
						
						if(l<0){
							oDiv.style.left = 0;
						}else{
							if(l<=window.innerWidth-oDiv.offsetWidth){
								oDiv.style.left = l+'px';
							}
						}
						
						var t =e.clientY-disY+oDivoffsetTop;
						if(t<0){
							oDiv.style.top = 0;
						}else{
							if(t<=window.innerHeight-oDiv.offsetHeight){
								oDiv.style.top = t+'px';
							}
							
						}
						
						
				}

				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;
				}
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.dragBox{
		width: 1080px;
		height: 560px;
		position: absolute;
		// top: 50%;
		// left: 50%;
		// margin-top: -280px;
		// margin-left:-540px;

		
		background: blueviolet;
		cursor: move;
	}
</style>
