<template>
  <div>
    Search<br>
    params参数：{{$route.params.keyword}}<br>
    query参数：{{$route.query.keyword}}<br>
    props--params参数：{{keyword1}}<br>
     props--query：{{keyword2}}
  </div>
</template>

<script>
export default {
  name: 'Search',
  props:["keyword1","keyword2"]
}
</script>

<style lang="less" scoped>

</style>
