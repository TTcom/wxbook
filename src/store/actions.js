const actions={
	             setFileName:({commit},fileName)=>{
					  //  console.log(state.test,newTest);
						//执行mutations中的方法
						 return commit('SET_FILENAME',fileName);
				 },
				 setMenuVisible:({commit},menuVisible)=>{
				 			 return commit('SET_MENUVISIBLE',menuVisible);
				 },
				  setSettingVisble:({commit},settingVisble)=>{
				 			 return commit('SET_SETTINGVISIBLE',settingVisble);
				 },
				 setDefaultFontSize:({commit},defaultFontSize)=>{
				 			 return commit('SET_DEFAULT_FONTSIZE',defaultFontSize);
				 },
				 setDefaultTheme: ({ commit }, theme) => {
				   return commit('SET_DEFAULT_THEME', theme)
				 },
				 setBookAvailable: ({ commit }, bookAvailable) => {
				   return commit('SET_BOOK_AVAILABLE', bookAvailable)
				 },
				 setProgress: ({ commit }, progress) => {
				   return commit('SET_PROGRESS', progress)
				 },
				 setSection: ({ commit }, section) => {
				   return commit('SET_SECTION', section)
				 },
				 setIsPaginating: ({ commit }, isPaginating) => {
				   return commit('SET_IS_PAGINATING', isPaginating)
				 },
				 setCurrentBook: ({ commit }, book) => {
				   return commit('SET_CURRENT_BOOK', book)
				 },
				 setNavigation: ({ commit }, navigation) => {
				   return commit('SET_NAVIGATION', navigation)
				 },
				 setCover: ({ commit }, cover) => {
				   return commit('SET_COVER', cover)
				 },
				 setMetadata: ({ commit }, metadata) => {
				   return commit('SET_METADATA', metadata)
				 },
				 setPaginate: ({ commit }, paginate) => {
				   return commit('SET_PAGINATE', paginate)
				 },
				 setPagelist: ({ commit }, pagelist) => {
				   return commit('SET_PAGELIST', pagelist)
				 },
				 setIsBookmark({ commit }, isBookmark) {
				   return commit('SET_IS_BOOKMARK', isBookmark)
				 },
				 setOffsetY({ commit }, offsetY) {
				   return commit('SET_OFFSETY', offsetY)
				 }
				 
	}
export default actions;