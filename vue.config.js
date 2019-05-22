function mock(app, url, data) {
  app.get(url, (request, response) => {
    response.json(data)
  })
}
const HomeData = require('./src/mock/bookHome')
const ShelfData = require('./src/mock/bookShelf')
const ListData = require('./src/mock/bookList')
const FlatListData = require('./src/mock/bookFlatList')



module.exports={

	  publicPath: process.env.NODE_ENV === 'production'
		? './'
		: '/',
		devServer: {  //创建接口
		  before(app) {
		    mock(app, '/book/home', HomeData)
		    mock(app, '/book/shelf', ShelfData)
		    mock(app, '/book/list', ListData)
		    mock(app, '/book/flat-list', FlatListData)
		  }
		}
}