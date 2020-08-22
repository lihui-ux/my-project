<template>
  <div class="spec-preview">
    <img :src="defaultImg.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big" >
      <img :src="defaultImg.imgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["imgList"],
  data() {
    return {
      // 定义标识，默认显示列表第一张
      defaultIndex: 0,
    };
  },
  mounted() {
    //  接收传过来的点击图片的下标，
    this.$bus.$on("changeImg", this.changeImg);
  },
  methods: {
    //  修改显示图片，让显示的图片和传过来点击的图片一致
    changeImg(index) {
      this.defaultIndex = index;
    },
    // 处理放大镜
    move(ev) {
      //  获取大图
      let bigImg = this.$refs.bigImg;
      // 获取mask框框
      let mask = this.$refs.mask;
      //  获取鼠标位置
      let mousex = ev.offsetX;
      let mousey = ev.offsetY;
      //
      let maskx = mousex - mask.offsetWidth / 2;
      let masky = mousey - mask.offsetHeight / 2;
      //  判断不能超过临界值
      if (maskx < 0) {
        maskx = 0;
      } else if (maskx > mask.offsetWidth) {
        maskx = mask.offsetWidth;
      }
      if (masky < 0) {
        masky = 0;
      } else if (masky > mask.offsetHeight) {
        masky = mask.offsetHeight;
      }
      // 修改绿板的位置
      mask.style.left = maskx + "px";
      mask.style.top = masky + "px";
      //  修改大图的位置
      bigImg.style.left = -2*maskx+ "px";
      bigImg.style.top = -2*masky+ "px";
    },
  },
  computed: {
    //  避免a.b.c出现的页面报错，如果有就拿值，没有就给空对象，避免出现undefined
    defaultImg() {
      return this.imgList[this.defaultIndex] || {};
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>