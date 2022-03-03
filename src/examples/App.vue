<template>
  <div class="app-container">
    <Example />
  </div>
</template>

<script>
  import Example from './Example';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',
    components:{
      Example,
    },
  });
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
    overflow-wrap: break-word;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: #303133;
    font-size: 14px;
  }
</style>
