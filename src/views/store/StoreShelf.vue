<template>
  <div class="storeshelf">
    <shelf-title class="shelf-title" ref="shelfTitle"v-show="ifShowTitle"></shelf-title>
    <scroll class="book-shelf-scroll-wrapper"
                 :top="0"
                 :bottom="scrollBottom"
                 :initPosition="initPosition"
                 @onScroll="onScroll"
                 ref="scroll">
      <shelf-search @onTabClick="onSearchTabClick"ref="shelfSearch"></shelf-search>
      <ShelfList class="book-shelf-list"
                  :data="bookList"
                  :showType="showType"
                  :isEditMode="isEditMode"
                  @onBookClick="onBookClick"
                  ref="bookShelf"
                  ></ShelfList>
                 <!-- <book-shelf-empty
                  class="book-shelf-empty"
                  v-if="isDataEmpty"></book-shelf-empty> -->
    </scroll>
    <!-- <book-shelf-footer class="book-shelf-footer"
                       :data="bookList"
                       :bookList="bookList"
                       :isInGroup="false"
                       @setPrivate="setPrivate"
                       @setDownload="setDownload"
                       @removeBook="removeBook"
                       @groupEdit="groupEdit"
                       v-show="isEditMode"></book-shelf-footer>
    <toast :text="toastText" ref="toast"></toast> -->
  </div>
</template>

<script>
  import ShelfTitle from '../../components/shelf/shelfTitle'
  import ShelfSearch from '../../components/shelf/shelfSearch'
  import ShelfList from '../../components/shelf/shelfList'
  import Scroll from '../../components/common/Scroll'
  import BookShelfFooter from '../../components/shelf/bookShelfFooter'
  import BookShelfEmpty from '../../components/shelf/bookShelfEmpty'
  import Toast from '../../components/shelf/toast'
  import { shelf, download } from '../../api/store'
  import { getLocalStorage, setLocalStorage, clearLocalStorage } from '../../utils/localStorage'
  import { getLocalForage, clearLocalForage } from '../../utils/localForage'
  import { removeBookCache } from '../../utils/book'
  import Epub from 'epubjs'
  import { realPx } from '../../utils/utils'
	import { storeShelfMixin } from '../../utils/mixin'
  import {home} from '../../api/store'
	import { list } from '../../api/store'
  global.ePub = Epub

  const BOOK_SHELF_KEY = 'bookShelf'
  export default {
		mixins:[storeShelfMixin],
    components: {
      ShelfTitle,
      ShelfSearch,
      ShelfList,
      Scroll,
      BookShelfFooter,
      BookShelfEmpty,
      Toast
    },
		mounted(){
			  
				list().then(response => {
         this.list = response.data.data
				  const category = "Physics"
				  if (category) {
				    const key = Object.keys(this.list).filter(item => item === category)[0]
				    const data = this.list[key]
				    this.list = {}
				    this.list[key] = data
				  } 
					 console.log(this.list);
					 const arr=this.list.Physics.slice();
					 this.setShelfList(arr);
					 
					
					
				})
			 
			
		},
    computed: {
      isDataEmpty() {
        return !this.bookList || this.bookList.filter(item => item.type !== 3).length === 0
      }
    },
    data() {
      return {
				list:[],
          bookList: [],
           ifShowTitle: true,
        // isEditMode: false,
        // ifShowBack: false,
        // ifShowClear: true,
           scrollBottom: 0,
         toastText: '',
         showType: 0,
        initPosition: {
          x: 0,
          y: 0
        }
      }
    },
    methods: {
      onSearchTabClick(id) {
        this.showType = id
      },
      groupEdit(operation, group) {
        switch (operation) {
          case 1:
            this.moveToGroup(group)
            break
          case 2:
            this.newGroup(group)
            this.moveToGroup(group)
            break
          case 3:
            this.moveOutGroup()
            break
        }
      },
      getSelectedBooks() {
        const selectedBooks = this.bookList.filter(item => {
          return item.selected
        })
        this.bookList.filter(item => {
          if (item.type === 2 && item.itemList) {
            item.itemList.filter(subItem => {
              if (subItem.selected) {
                selectedBooks.push(subItem)
              }
            })
          }
        })
        return selectedBooks
      },
      clearSelectedBooks() {
        this.bookList = this.bookList.filter(item => {
          return !item.selected
        })
        this.bookList.forEach(item => {
          if (item.type === 2 && item.itemList) {
            item.itemList = item.itemList.filter(subItem => {
              return !subItem.selected
            })
          }
        })
      },
      appendBookToList(selectedBooks) {
        let id = this.bookList[this.bookList.length - 1].id + 1
        selectedBooks.forEach(item => {
          item.id = id++
          this.bookList.push(item)
        })
      },
      moveOutGroup() {
        this.clearAddFromBookList()
        const selectedBooks = this.getSelectedBooks()
        this.clearSelectedBooks()
        this.appendBookToList(selectedBooks)
        this.appendAddToBookList()
        this.onEditClick(false)
        this.saveBookShelfToLocalStorage()
        this.showToast(this.$t('shelf.moveBookOutSuccess'))
      },
      newGroup(group) {
        this.clearAddFromBookList()
        this.bookList.push(group)
        this.appendAddToBookList()
      },
      moveToGroup(group) {
        const selectedBooks = this.getSelectedBooks()
        this.clearSelectedBooks()
        if (group && group.itemList) {
          group.itemList = [...group.itemList, ...selectedBooks]
          group.itemList.forEach((item, index) => {
            item.id = index + 1
          })
        }
        this.onEditClick(false)
        this.saveBookShelfToLocalStorage()
        this.showToast(this.$t('shelf.moveBookInSuccess').replace('$1', group.title))
      },
      appendAddToBookList() {
        this.bookList.push({
          cover: '',
          title: '',
          type: 3,
          // id: this.bookList[this.bookList.length - 1].id + 1
          id: Number.MAX_SAFE_INTEGER
        })
      },
      clearAddFromBookList() {
        this.bookList = this.bookList.filter(item => {
          return item.type !== 3
        })
      },
      removeBook() {
        this.bookList = this.bookList.filter(item => {
          if (item.itemList) {
            item.itemList = item.itemList.filter(subItem => {
              return !subItem.selected
            })
          }
          return !item.selected
        })
        // this.$refs.bookShelf.showRemoveAnimation()
        this.onEditClick(false)
        this.saveBookShelfToLocalStorage()
      },
      clearCache() {
        clearLocalStorage()
        clearLocalForage(() => {
          console.log('清除localForage成功...')
          this.getBookShelf()
        })
        this.showToast(this.$t('shelf.clearCacheSuccess'))
      },
      onBookClick(item, index) {
        this.$router.push({
          path: '/book-store/detail',
          query: {
            fileName: item.fileName,
            category: item.categoryText
          }
        })
      },
      showToast(text) {
        this.toastText = text
        this.$refs.toast.show()
      },
      hideToast() {
        this.$refs.toast.hide()
      },
      showContinueToast(text) {
        this.toastText = text
        this.$refs.toast.continueShow()
      },
      removeDownloadBook(item) {
        return removeBookCache(item.fileName)
      },
      downloadBook(item) {
        return new Promise((resolve, reject) => {
          getLocalForage(item.fileName, (err, value) => {
            if (!err && value instanceof Blob) {
              console.log(`[${item.fileName}]读取成功...`, value, new Epub(value))
              resolve()
            } else {
              download(item, item => {
                console.log('[' + item.fileName + ']下载成功...')
                resolve()
              }, reject, reject, progressEvent => {
                const progress = Math.floor(progressEvent.loaded / progressEvent.total * 100) + '%'
                this.toastText = this.$t('shelf.progressDownload').replace('$1', `${item.fileName}.epub(${progress})`)
              })
            }
          })
        })
      },
      async setDownload(needDownload) {
        this.showContinueToast(this.$t('shelf.startDownload'))
        for (let i = 0; i < this.bookList.length; i++) {
          const item = this.bookList[i]
          if (needDownload && item.selected) {
            await this.downloadBook(item).then(() => {
              item.cache = needDownload
            })
          } else if (!needDownload && item.selected) {
            await this.removeDownloadBook(item).then(() => {
              item.cache = needDownload
            })
          }
          if (item.itemList) {
            for (let i = 0; i < item.itemList.length; i++) {
              await this.downloadItem(item.itemList[i], needDownload)
            }
          }
        }
        this.hideToast()
        if (needDownload) {
          this.showToast(this.$t('shelf.setDownloadSuccess'))
        } else {
          this.showToast(this.$t('shelf.removeDownloadSuccess'))
        }
        this.onEditClick(false)
        this.saveBookShelfToLocalStorage()
        console.log('数据保存成功...')
      },
      async downloadItem(subItem, needDownload) {
        if (needDownload && subItem.selected) {
          await this.downloadBook(subItem).then(() => {
            subItem.cache = needDownload
          })
        } else if (!needDownload && subItem.selected) {
          await this.removeDownloadBook(subItem).then(() => {
            subItem.cache = needDownload
          })
        }
      },
      setPrivate(v) {
        this.bookList.forEach(item => {
          if (item.selected) {
            item.private = v
          }
        })
        this.onEditClick(false)
        this.saveBookShelfToLocalStorage()
        if (v) {
          this.showToast(this.$t('shelf.setPrivateSuccess'))
        } else {
          this.showToast(this.$t('shelf.closePrivateSuccess'))
        }
      },
      onEditClick(v) {
        if (!this.isEditMode) {
          this.bookList.forEach(item => {
            if (item.bookId) {
              item.selected = false
            } else if (item.itemList) {
              item.itemList.forEach(subItem => {
                subItem.selected = false
              })
            }
          })
        }
        if (this.isEditMode) {
          this.scrollBottom = 48
          this.$nextTick(() => {
            if (this.$refs.scroll) {
              this.$refs.scroll.refresh()
            }
          })
        } else {
          this.scrollBottom = 0
          this.$nextTick(() => {
            if (this.$refs.scroll) {
              this.$refs.scroll.refresh()
            }
          })
        }
      },
      onScroll(offsetY) {
        if (offsetY > realPx(54)) {
          this.$refs.shelfTitle.showShadow()
          if (!this.ifShowTitle) {
            this.$refs.shelfSearch.showShadow()
          }
        } else {
          this.$refs.shelfTitle.hideShadow()
          if (this.$refs.shelfSearch) {
            this.$refs.shelfSearch.hideShadow()
          }
        }
      },
      initBookShelf() {
        if (this.bookList) {
          this.bookList.forEach(item => {
            item.selected = false
          })
        }
      },
      saveBookShelfToLocalStorage() {
        setLocalStorage(BOOK_SHELF_KEY, this.bookList)
      },
      getBookShelfFromLocalStorage() {
        return getLocalStorage(BOOK_SHELF_KEY)
      }
    }
  }
</script>

<style lang="scss"  scoped>
  @import "../../assets/styles/global";

  .storeshelf {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100%;
    font-size: 0;
    .shelf-title {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 110;
    }
    .book-shelf-list {
      position: absolute;
      top: px2rem(93.5);
      left: 0;
      z-index: 100;
    }
    .book-shelf-empty {
      position: absolute;
      top: px2rem(42);
      left: 0;
      z-index: 100;
    }
    .book-shelf-scroll-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 101;
      background: white;
    }
    .book-shelf-scroll-wrapper2 {
      position: absolute;
      top: px2rem(93.5);
      left: 0;
      z-index: 101;
    }
  }
</style>
