const state = {
	    fileName:'',
		menuVisible:false,
		settingVisible:-1,    //-1不显示，0字号。1主题。2进度。3目录
		defaultFontSize:16,
		defaultFontFamily: 'Default',
		fontFamilyVisible: false,
		defaultTheme: 'Default',
		bookAvailable: false,
		progress: 0,
		section: 0,
		isPaginating: true,
		currentBook: null,
		navigation: null,
		cover: null,
		metadata: null,
		paginate: '',
		pagelist: null,
		offsetY: 0,
		isBookmark: null,
		hotSearchOffsetY:0,
		flapCardVisible:false,
		isEditMode:false,  //是否进入编辑模式
		shelfList:[],      //书架的图书列表
		shelfSelected:[],  //书架图书选中的列表
		shelfTitleVisible:true  //书架标题的显示状态
}

export default state;