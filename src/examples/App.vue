<template>
  <div class="app-container">
    <collapse-tree :line="line">
      <collapse-tree-item>
        <template #header>
          1-1
        </template>
        <collapse-tree-item>
          <template #header>
            1-2-1
          </template>
        </collapse-tree-item>
      </collapse-tree-item>
      <collapse-tree-item>
        <template #header>
          1-2
        </template>
        <collapse-tree-item>
          <template #header>
            1-2-2
          </template>
          <collapse-tree-item>
            <template #header>
              1-2-2-1
            </template>
          </collapse-tree-item>
        </collapse-tree-item>
        <collapse-tree-item>
          <template #header>
            1-2-3
          </template>
        </collapse-tree-item>
      </collapse-tree-item>
    </collapse-tree>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import CollapseTree from '../components/collapse-tree';
  import CollapseTreeItem from '../components/collapse-tree-item';

  export default defineComponent({
    name: 'App',
    components: {
      CollapseTree,
      CollapseTreeItem,
    },
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
