<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
     <div class="flap-card-bg"  :class="{'animation': runFlapCardAnimation}" v-show="runFlapCardAnimation">
      <div class="flap-card" v-for="(item, index) in flapCardList" :key="index" :style="{zIndex: item.zIndex}">
        <div class="flap-card-semi-circle">
          <div class="flap-card-semi-circle-left" :style="semiCricelStyle(item, 'left')" ref="left"></div>
          <div class="flap-card-semi-circle-right" :style="semiCricelStyle(item, 'right')" ref="right"></div>
        </div>
      </div>
      <div class="point-wrapper" >
        <div class="point" :class="{'animation': runPointAnimation}" v-for="(item, index) in pointList"
             :key="index"></div>
      </div>
    </div>
    <div class="book-card" :class="{'animation': runBookCardAnimation}" v-if="ifShowBookCard">
      <div class="book-card-wrapper">
        <div class="img-wrapper">
          <!-- <img class="img" v-lazy="data.cover"> -->
					<img class="img" :src="data.cover">
        </div>
        <div class="content-wrapper">
          <div class="title">{{data.title}}</div>
          <div class="author sub-title-medium">{{data.author}}</div>
          <div class="category">{{categoryText()}}</div>
        </div>
        <div class="read-btn" @click.stop="showBookDetail(data)">{{$t('home.readNow')}}</div>
      </div>
    </div>
    <div class="close-btn-wrapper" @click="close">
      <span class="icon-close"></span>
    </div> 
  </div>
</template>

<script>
 import { categoryText, showBookDetail } from '../../utils/book'
 import { storehomeMixin } from '../../utils/mixin'
  export default {
		mixins: [storehomeMixin],
    props: {
      data: Object
    },
    data() {
      return {
        pointList: [],
        flapCardList: [
          {
            r: 255,
            g: 102,
            _g: 102,
            b: 159,
            imgLeft: 'url(' + require('../../assets/images/gift-left.png') + ')',
            imgRight: 'url(' + require('../../assets/images/gift-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 100,
            rotateDegree: 0
          },
          {
            r: 74,
            g: 171,
            _g: 171,
            b: 255,
            imgLeft: 'url(' + require('../../assets/images/compass-left.png') + ')',
            imgRight: 'url(' + require('../../assets/images/compass-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 99,
            rotateDegree: 0
          },
          {
            r: 255,
            g: 198,
            _g: 198,
            b: 102,
            imgLeft: 'url(' + require('../../assets/images/star-left.png') + ')',
            imgRight: 'url(' + require('../../assets/images/star-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 98,
            rotateDegree: 0
          },
          {
            r: 255,
            g: 102,
            _g: 102,
            b: 159,
            imgLeft: 'url(' + require('../../assets/images/heart-left.png') + ')',
            imgRight: 'url(' + require('../../assets/images/heart-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 97,
            rotateDegree: 0
          },
          {
            r: 59,
            g: 201,
            _g: 201,
            b: 22,
            imgLeft: 'url(' + require('../../assets/images/crown-left.png') + ')',
            imgRight: 'url(' + require('../../assets/images/crown-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 96,
            rotateDegree: 0
          }
        ],
        front: 0,
        back: 1,
        intervalTime: 25,
        runPointAnimation: false,
        runFlapCardAnimation: false,
        runBookCardAnimation: false,
        ifShowBookCard: false,

      }
    },
		watch:{
			flapCardVisible(v){
				  if(v){
						this.runAnimation()
					}
			}
		},
		mounted(){
			
		},
    methods: {
			runAnimation(){
				  this.runFlapCardAnimation=true;
					this.timeout = setTimeout(()=>{
						this.startFlapCardAnimation();
						this.startPointAnimation();
					},300)
					this.timeout2 = setTimeout(() => {
					  this.stopAnimation()
					  this.showBookCard()
					}, 2500)
				 // this.startFlapCardAnimation()
			},
			 startPointAnimation() {
			  this.runPointAnimation = true
					this.timeout3 = setTimeout(() => {
						this.runPointAnimation = false
					}, 750);
					
			},
      categoryText() {
        return categoryText(this.data.category, this)
      },
      close() {
				this.stopAnimation();
        this.setFlapCardVisible(false);
				
      },
      showBookCard() {
        this.ifShowBookCard = true
        this.runBookCardAnimation = true
          this.runFlapCardAnimation = false
          this.runPointAnimation = false
      },
     
			flapCardRotate(){
				const frontFlapCard = this.flapCardList[this.front];
				const backFlapCard = this.flapCardList[this.back];
				frontFlapCard.rotateDegree +=10
				frontFlapCard._g -=5;
				backFlapCard.rotateDegree -=10
        if (backFlapCard.rotateDegree < 90) {
          backFlapCard._g += 5
        }
				if(frontFlapCard.rotateDegree === 90 && backFlapCard.rotateDegree === 90){
										    backFlapCard.zIndex += 2
				}
				if (frontFlapCard.rotateDegree === 180 && backFlapCard.rotateDegree === 0) {
				  this.next()
				}
				
				
					this.rotate(this.front,'front');
				  this.rotate(this.back,'back');
			},
      startFlapCardAnimation() {
				this.prepare()
				this.task = setInterval(() => {
					 
					 this.flapCardRotate();
					 
				},this.intervalTime)
				
       
      },
			reset(){
				 this.front = 0;
				 this.back = 1;
				 const len = this.flapCardList.length
				 this.flapCardList.forEach((item, index) => {
				   item.zIndex = 100 - index
					 item._g = item.g;
					 item.rotateDegree = 0;
					 this.rotate(index,'front');
					 this.rotate(index,'back');
					 
				 })
				 
				 this.runBookCardAnimation =false;
				 this.runFlapCardAnimation = false
				 this.runPointAnimation = false
				 this.ifShowBookCard=false;
				// this.prepare();
				 
				 
				 
			},
      prepare() {
        const backFlapCard = this.flapCardList[this.back]
      //  const backLeftSemiCircle = this.$refs.left[this.back]
        backFlapCard.rotateDegree = 180
        backFlapCard._g = backFlapCard.g - 5 * 9
      //  this.rotate(backFlapCard, backLeftSemiCircle)
			   this.rotate(this.back, 'back')
      },
      stopAnimation() {
				if (this.task){
					  clearInterval(this.task)
				}
				if(this.timeout){
					 clearTimeout(this.timeout);
				}
				if(this.timeout2){
					 clearTimeout(this.timeout2);
				}
				if(this.timeout3){
					 clearTimeout(this.timeout3);
				}
        this.reset();
       
      },
      next() {
        const frontFlapCard = this.flapCardList[this.front]
        const backFlapCard = this.flapCardList[this.back]
        const frontRightSemiCircle = this.$refs.right[this.front]
        const backLeftSemiCircle = this.$refs.left[this.back]
        frontFlapCard.rotateDegree = 0
        backFlapCard.rotateDegree = 0
        frontFlapCard._g = frontFlapCard.g
        backFlapCard._g = backFlapCard.g;
				
				this.rotate(this.front, 'front');
				this.rotate(this.back, 'back');
				this.front++;
				this.back++;
				const len=this.flapCardList.length
				if (this.front >= len) {
				  this.front = 0
				}
				if (this.back >= len) {
				  this.back = 0
				}
				this.flapCardList.forEach((item, index) => {
				  item.zIndex = 100 - ((index - this.front + len) % len)
				})
				this.prepare()
				
				
        
      },
      
      rotate(index, type) {
				 const item = this.flapCardList[index];
				 let dom;
				 if(type === 'front'){
					 dom = this.$refs.right[index];
				 }else{
					 dom = this.$refs.left[index];
				 }
         dom.style.transform = `rotateY(${item.rotateDegree}deg)`
         dom.style.backgroundColor = `rgb(${item.r} ,${item._g} ,${item.b})`
      },
      semiCricelStyle(item, direction) {
        return {
          backgroundColor: `rgb(${item.r} ,${item.g} ,${item.b})`,
          backgroundImage: direction === 'left' ? item.imgLeft : item.imgRight,
          backgroundSize: item.backgroundSize
        }
      }
    },
    created() {
      for (let i = 0; i < 18; i++) {
        this.pointList.push({})
      }
    },
    
		
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .flap-card-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    @include center;
    .flap-card-bg {
      position: relative;
      width: px2rem(64);
      height: px2rem(64);
      background: white;
      border-radius: px2rem(5);
      &.animation {
        animation: sscale .3s ease-in;
      }
      @keyframes sscale {
        0% {
          transform: scale(0);
          opacity: 0;
        }
				50% {
				  transform: scale(1.2);
				  opacity: 1;
				}
        70% {
          transform: scale(0.9);
          opacity: 1;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      .flap-card {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1500;
        margin: auto;
        width: px2rem(48);
        height: px2rem(48);
        .flap-card-semi-circle {
          width: 100%;
          height: 100%;
          display: flex;
          .flap-card-semi-circle-left {
            flex: 0 0 50%;
            width: 50%;
            height: 100%;
            background-color: #ffc666;
            background-repeat: no-repeat;
            background-position: center right;
            border-radius: px2rem(24) 0 0 px2rem(24);
            transform-origin: right;
            backface-visibility: hidden;
          }
          .flap-card-semi-circle-right {
            flex: 0 0 50%;
            width: 50%;
            height: 100%;
            background-repeat: no-repeat;
            background-position: center left;
            border-radius: 0 px2rem(24) px2rem(24) 0;
            transform-origin: left;
            backface-visibility: hidden;
          }
        }
      }
      .point-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1500;
        @include absCenter;
        .point {
          @include absCenter;
          z-index: 3000;
          border-radius: 50%;
          &.animation {
            @for $i from 1 to length($moves)  {
              &:nth-child(#{$i}) {
                @include move($i);
              }
            }
          }
        }
      }
    }
    .book-card {
      position: relative;
      width: 65%;
      // height: 70%;
      box-sizing: border-box;
      border-radius: px2rem(15);
      background: white;
      &.animation {
        animation: scale .3s ease-in both;
        @keyframes scale {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      }
      .book-card-wrapper {
        width: 100%;
        height: 100%;
        margin-bottom: px2rem(30);
        @include columnTop;
        .img-wrapper {
          width: 100%;
          margin-top: px2rem(20);
          @include center;
          .img {
            width: px2rem(90);
            height: px2rem(130);
          }
        }
        .content-wrapper {
          padding: 0 px2rem(20);
          margin-top: px2rem(20);
          .title {
            color: #333;
            font-weight: bold;
            font-size: px2rem(18);
            line-height: px2rem(20);
            max-height: px2rem(40);
            text-align: center;
            @include ellipsis2(2)
          }
          .author {
            margin-top: px2rem(10);
            text-align: center;
          }
          .category {
            color: #999;
            font-size: px2rem(14);
            margin-top: px2rem(10);
            text-align: center;
          }
        }
        .read-btn {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 1100;
          width: 100%;
          border-radius: 0 0 px2rem(15) px2rem(15);
          padding: px2rem(15) 0;
          text-align: center;
          color: white;
          font-size: px2rem(14);
          background: $color-blue;
        }
      }
    }
    .close-btn-wrapper {
      position: absolute;
      left: 0;
      bottom: px2rem(30);
      z-index: 1100;
      width: 100%;
      @include center;
      .icon-close {
        display: inline-block;
        width: px2rem(45);
        height: px2rem(45);
        font-size: px2rem(25);
        color: white;
        background: #333;
        border-radius: 50%;
        @include center;
      }
    }
  }
</style>
