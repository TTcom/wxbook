const book ={
	 state: {
	   fileName:''
	},
	mutations: {
	     'SET_FILENAME':(state,fileName) =>{
				 state.fileName = fileName
			 }
	},
	actions: {
	       setFileName:({commit},fileName)=>{
					  //  console.log(state.test,newTest);
						//执行mutations中的方法
						 return commit('SET_FILENAME',fileName);
				 }
	}
}

export default book