<template>
  <div class="app-container">
    <collapse-tree :line="line">
      <collapse-tree-item>
        <template #header>
          1-1
        </template>
        <collapse-tree-item>
          <template #header>
            1-1-1
          </template>
        </collapse-tree-item>
      </collapse-tree-item>
      <collapse-tree-item>
        <template #header>
          1-2
        </template>
        <collapse-tree-item>
          <template #header>
            1-2-1
          </template>
          <collapse-tree-item>
            <template #header>
              1-2-1-1
            </template>
          </collapse-tree-item>
        </collapse-tree-item>
        <collapse-tree-item>
          <template #header>
            1-2-2
          </template>
        </collapse-tree-item>
      </collapse-tree-item>
    </collapse-tree>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',
    data() {
      return {
        line: true,
      };
    },
  });
</script>

<style lang="scss">
  .app-container {

  }
</style>
