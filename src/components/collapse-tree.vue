<template>
  <div ref="root" class="collapse-tree">
    <slot />
  </div>
</template>

<script>
  import elementResizeDetectorMaker from 'element-resize-detector';
  import emitter from './emitter';
  import { onBeforeUnmount, onMounted, provide, reactive, ref, toRefs } from 'vue';

  export default {
    name: 'CollapseTree',
    props: {
      line: {
        type: Boolean,
        default: true,
      },
      lineOffsetHeight: {
        type: Number,
        default: 20,
      },
      lineOffsetTop: {
        type: Number,
        default: 20,
      },
      defaultExpandedLevel: {
        type: Number,
        default: 1,
      },
    },
    setup(props) {
      const erd = ref();
      const root = ref(null);

      provide('collapseTreeKey', reactive(toRefs(props)));

      const update = () => {
        emitter.emit('update');
      };

      onMounted(() => {
        erd.value = elementResizeDetectorMaker();
        erd.value.listenTo(root.value, () => {
          update();
        });
      });

      onBeforeUnmount(() => {
        erd.value.removeAllListeners(root.value);
      });

      return {
        root,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .collapse-tree {

  }
</style>
