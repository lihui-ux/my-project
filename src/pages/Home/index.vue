<template>
  <div>
    <TypeNav />
    <Container></Container>
    <Recommend></Recommend>
    <Rank/>
    <Like/>
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor" />
    <Brand/>
  </div>
</template>

<script>
import Container from "./Container";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand"
import { mapState } from 'vuex';
export default {
  name: "Home",
  components: {
    Container,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    this.$store.dispatch("getFloorList")
  },
  computed: {
    ...mapState({
      floorList:state => state.home.floorList
    })
  },
};
</script>

<style lang="less" scoped>
</style>
