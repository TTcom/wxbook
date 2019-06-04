function mock(app, url, data) {
  app.get(url, (request, response) => {
    response.json(data)
  })
}
const HomeData = require('./src/mock/bookHome')
const ShelfData = require('./src/mock/bookShelf')
const ListData = require('./src/mock/bookList')
const FlatListData = require('./src/mock/bookFlatList')

const axios = require('axios');
const express = require('express');
const apiRoutes = express.Router();
const request = require("request");

const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports={
     
		chainWebpack: (config)=>{
        config.resolve.alias
            .set('src', resolve('src'))
            .set('components',resolve('src/components'))
            .set('common',resolve('src/common'))
						.set('base',resolve('src/base'))

     }, 
	  publicPath: process.env.NODE_ENV === 'production'
		? './'
		: '/',
		devServer: {  //创建接口
				
			before(app){   
				
				  mock(app, '/book/home', HomeData)
				  mock(app, '/book/shelf', ShelfData)
				  mock(app, '/book/list', ListData)
				  mock(app, '/book/flat-list', FlatListData)
					app.get('/api/getImg',(req,res)=>{
						
						const uri = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN';
						
						request(uri, (error, response, body) => {
							if (!error && response.statusCode === 200) {
									 res.json(response.body);
							} else {
								res.send("request error!");
							}
						});
						
					});
			
			
			
			
			}
			
		}
}