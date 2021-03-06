const mutations={
	     'SET_FILENAME':(state,fileName) =>{
			 state.fileName = fileName
		 },
		 'SET_MENU_VISIBLE':(state,menuVisible) =>{
			 state.menuVisible = menuVisible
		 },
		 'SET_SETTING_VISIBLE':(state,settingVisible) =>{
		 			 state.settingVisible = settingVisible
		 },
		 'SET_DEFAULT_FONTSIZE':(state,defaultFontSize) =>{    //设置默认字体
		 			 state.defaultFontSize = defaultFontSize
		 },
		 'SET_DEFAULT_FONT_FAMILY': (state, font) => {
		   state.defaultFontFamily = font
		 },
		 'SET_FONT_FAMILY_VISIBLE': (state, visible) => {
		   state.fontFamilyVisible = visible
		 },
		 'SET_DEFAULT_THEME': (state, theme) => {
		   state.defaultTheme = theme
		 },
		 'SET_BOOK_AVAILABLE': (state, bookAvailable) => {
		   state.bookAvailable = bookAvailable
		 },
		 'SET_PROGRESS': (state, progress) => {
		   state.progress = progress
		 },
		 'SET_SECTION': (state, section) => {
		   state.section = section
		 },
		 'SET_IS_PAGINATING': (state, isPaginating) => {
		   state.isPaginating = isPaginating
		 },
		 'SET_CURRENT_BOOK': (state, currentBook) => {
		   state.currentBook = currentBook
		 },
		 'SET_NAVIGATION': (state, navigation) => {
		   state.navigation = navigation
		 },
		 'SET_COVER': (state, cover) => {
		   state.cover = cover
		 },
		 'SET_METADATA': (state, metadata) => {
		   state.metadata = metadata
		 },
		 'SET_PAGINATE': (state, paginate) => {
		   state.paginate = paginate
		 },
		 'SET_PAGELIST': (state, pagelist) => {
		   state.pagelist = pagelist
		 },
		 'SET_OFFSETY': (state, offsetY) => {
		   state.offsetY = offsetY
		 },
		 'SET_IS_BOOKMARK': (state, isBookmark) => {
		   state.isBookmark = isBookmark
		 },
		 'SET_HOT_SEARCH_OFFSETY':(state,hotSearchOffsetY)=>{
			   state.hotSearchOffsetY = hotSearchOffsetY
		 },
		 'SET_FLAP_CARD_VISIBLE':(state,visible)=>{
		 			   state.flapCardVisible = visible
		 },  
		 'SET_IS_EDIT_MODE':(state,isEditMode)=>{
		 			   state.isEditMode = isEditMode
		 },
		 'SET_SHELF_LIST':(state,shelfList)=>{
		 			   state.shelfList = shelfList
		 },
		 'SET_SHELF_SELECTED':(state,shelfSelected)=>{
		 			   state.shelfSelected = shelfSelected
		 },
		 'SET_SHELF_TITLE_VISIBLE':(state,shelfTitleVisible)=>{
		 			   state.shelfTitleVisible = shelfTitleVisible
		 },
		 
	}
export default 	mutations;