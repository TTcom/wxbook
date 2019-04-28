const actions={
	             setFileName:({commit},fileName)=>{
					  //  console.log(state.test,newTest);
						//执行mutations中的方法
						 return commit('SET_FILENAME',fileName);
				 },
				 setMenuVisible:({commit},menuVisible)=>{
				 					  //  console.log(state.test,newTest);
				 						//执行mutations中的方法
				 			 return commit('SET_MENUVISIBLE',menuVisible);
				 }
	}
export default actions;