const book ={
	 state: {
	   fileName:'',
		 menuVisible:false
	},
	mutations: {
	     'SET_FILENAME':(state,fileName) =>{
				 state.fileName = fileName
			 },
			  'SET_MENUVISIBLE':(state,menuVisible) =>{
			 				 state.menuVisible = menuVisible
			 }
	},
	actions: {
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
}

export default book