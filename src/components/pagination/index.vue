<template>
  <div class="pagination">
    <button :disabled="currentPageNum ===1" @click="$emit('changePageNum',currentPageNum-1)">上一页</button>
    <button v-if="startEnd.start>1" @click="$emit('changePageNum',1)">1</button>
    <button v-if="startEnd.start >2">···</button>
  <!-- 遍历一个数会从1开始，但有一部分不需要显示，用v-if -->
  <!-- 显示颜色，当前显示的页数与遍历的数相等，那就有颜色 -->
    <button v-for="page in startEnd.end" :key="page"
    v-if="page >= startEnd.start"
    :class="{active:currentPageNum===page}"
    @click="$emit('changePageNum',page)"
    >{{page}}</button>

    <button v-if="startEnd.end<totalPageNum-1">···</button>
    <button v-if="startEnd.end<totalPageNum" @click="$emit('changePageNum',totalPageNum)">{{totalPageNum}}</button>
    <button :disabled="currentPageNum === totalPageNum" @click="$emit('changePageNum',currentPageNum+1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    //  接收传递过来的参数
    currentPageNum: Number,
    total: Number,
    pageSize: Number,
    continueSize: Number,
  },
  computed: {
    //  计算总页码
    totalPageNum() {
      return Math.ceil(this.total / this.pageSize);
    },
    //  计算连续页的起始和结束页码
    startEnd() {
      // start是起始页，end是结束页，disNum是修正数
      let start, end, disNum;
      let { currentPageNum, continueSize, totalPageNum } = this;
      //  如果连续显示数量大于总页码的数量那就让开始为1，结束为总页码那个数
      if (continueSize >= totalPageNum) {
        (start = 1), (end = totalPageNum);
      } else {
        //  正常情况时,开始显示的数等于当前显示的数-连续显示的数除以2，进行向下取整
        start = currentPageNum - Math.floor(continueSize / 2);
        // 结束显示的数等于当前显示的数+ 连续显示的数除以2，进行向下取整
        end = currentPageNum + Math.floor(continueSize / 2);
      }
      if (start <= 1) {
        disNum = 1 - start;
        start += disNum;
        end += disNum;
      }
      if (end >= totalPageNum) {
        disNum = end-totalPageNum
        start -= disNum
        end -= disNum
      }
      return {start,end}
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>