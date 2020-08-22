<template>
  <div class="swiper-container" ref="imgList">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img,index) in imgList" :key="img.id">
        <img :src="img.imgUrl" :class="{active:defaultIndex === index}" @click="changeImg(index)" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
//  引入swiper
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["imgList"],
  data() {
    return {
      //  定义一个变量，初始化为零，默认边框有颜色的为第一张
      defaultIndex: 0,
    };
  },
  methods: {
    //  点击图片切换边框颜色
    changeImg(index) {
      (this.defaultIndex = index),
        //  将点击图片的下标传给zoom组件，zoom组件根据下标切换图片
        this.$bus.$emit("changeImg", index);
    },
  },
  watch: {
    immediate: true,
    imgList: {
      // immediate: true,
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          new Swiper(this.$refs.imgList, {
            // 配置每次显示几张和跳转几张，通常情况下数都一样
            slidesPerView: 5,
            slidesPerGroup: 5,
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>