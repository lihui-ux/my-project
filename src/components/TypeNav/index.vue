<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @click="toSearch">
      <div @mouseleave="moveOutDiv" @mouseenter="moveInDiv">
        <h2 class="all">全部商品分类</h2>
        <transition name="show">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2">
              <div
                class="item"
                @mouseenter="moveIn(index)"
                :class="{ item_on: currentIndex === index }"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
              >
                <h3>
                  <a
                    href="javascript:;"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <!-- c2是在c1的里面 -->
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          href="javascript:;"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}
                        </a>
                      </dt>
                      <dd>
                        <!-- c3在c2的里面 -->
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:;"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >
                            {{ c3.categoryName }}
                          </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
//  引入节流函数，lodash是一个插件，但不需要下载
import { throttle } from "lodash";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShow: true,
    };
  },
  //  在加载完成后调用getCategoryList，它就会触发

  methods: {
    // 'trailing': false  表示时间一开始就触发
    moveIn: throttle(
      function(index) {
        this.currentIndex = index;
      },30,{ trailing: false }),

    toSearch(ev) {
      //  获取点击目标元素上面的自定义属性，值是一个对象
      const data = ev.target.dataset;
      //  从自定义属性对象中解构得到下面这几个
      let { categoryname, category1id, category2id, category3id } = data;

      let location = {
        name: "search",
      };
      let query = {
        categoryName: categoryname,
      };

      if (category1id) {
        query.category1Id = category1id;
      } else if (category2id) {
        query.category2Id = category2id;
      } else {
        query.category3Id = category3id;
      }
      location.query = query;

      if (this.$route.params) {
        location.params = this.$route.params;
      }

      this.$router.push(location);
    },
    //  鼠标移入，
    moveInDiv() {
      this.isShow = true;
    },
    //  鼠标移出，要判断是不是home页面，如果不是就要隐藏
    moveOutDiv() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
  },
  //  获取数据，之后可以在页面进行展示
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },

  mounted() {
    //  在挂载完成后判断是不是search主页，是的话要隐藏列表
    if(this.$route.path !== "/home"){
        this.isShow = false;
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: plum;
      z-index: 999;
      &.show-enter {
        opacity: 0;
        height: 0px;
      }
      &.show-enter-to {
        opacity: 1;
        height: 520px;
      }
      &.show-enter-active{
         transition: all .3s
      }
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 520px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: pink;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
