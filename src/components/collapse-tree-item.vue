<template>
  <div ref="item" class="collapse-tree-item" :style="itemStyle">
    <div class="collapse-header">
      <div class="header-icon" :style="iconStyle" @click="handleClickIcon">
        <slot name="icon">
          <CaretRight class="collapse-icon" />
        </slot>
      </div>
      <div class="header-content">
        <slot name="header" />
      </div>
    </div>
    <div v-show="showContent" class="collapse-content">
      <slot />
    </div>
  </div>
</template>

<script>
  import { CaretRight } from '@element-plus/icons-vue';
  import emitter from './emitter';
  import { computed, getCurrentInstance, inject, onBeforeUnmount, onMounted, ref } from 'vue';

  export default {
    name: 'CollapseTreeItem',
    inject: ['collapseTreeKey'],
    components: {
      CaretRight,
    },
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { slots }) {
      const instance = getCurrentInstance();
      const collapseTree = inject('collapseTreeKey');
      const item = ref(null);
      const showContent = ref(false);
      const lineHeight = ref(0);
      const lineWidth = ref(0);
      const itemHeight = ref(0);
      const show = computed(() => props.show);

      const setDefaultExpanded = () => {
        showContent.value = show.value || currentLevel.value <= collapseTree.defaultExpandedLevel;
      };

      const updateLine = () => {
        const parent = getParent();
        if (!parent) {
          return;
        }
        const parentName = parent.type.name;
        const parentRect = parent.vnode.el.getBoundingClientRect();
        const itemRect = instance.vnode.el.getBoundingClientRect();
        if (parentName === 'CollapseTreeItem') {
          lineHeight.value = itemRect.top - parentRect.top - collapseTree.lineOffsetHeight;
          lineWidth.value = 20;
          itemHeight.value = itemRect.height - collapseTree.lineOffsetTop;
        }
      };

      const handleClickIcon = () => {
        showContent.value = !showContent.value;
      };

      const getParent = (proxy = instance) => {
        const parentName = proxy?.parent?.type.name;
        if (['CollapseTree', 'CollapseTreeItem'].includes(parentName)) {
          return proxy.parent;
        } else if (proxy?.parent) {
          return getParent(proxy.parent);
        } else {
          return null;
        }
      };

      const getCurrentLevel = (proxy = instance, level = 1) => {
        const parentName = proxy?.parent?.type.name;
        if (parentName === 'CollapseTree') {
          return level;
        } else if (proxy?.parent) {
          if (parentName === 'CollapseTreeItem') {
            level += 1;
          }
          return getCurrentLevel(proxy.parent, level);
        } else {
          return null;
        }
      };

      const isFirstItem = computed(() => {
        const parent = getParent();
        const parentName = parent?.type.name;
        return parentName === 'CollapseTree';
      });

      const currentLevel = computed(() => getCurrentLevel());

      const itemStyle = computed(() => {
        return {
          paddingLeft: isFirstItem.value ? '0' : '',
          '--line-display': collapseTree.line && !isFirstItem.value ? 'block' : 'none',
          '--line-height': `${lineHeight.value}px`,
          '--line-width': `${lineWidth.value}px`,
          '--item-height': `${itemHeight.value}px`,
        };
      });

      const iconStyle = computed(() => {
        return {
          cursor: slots.default?.() ? 'pointer' : '',
          transform: showContent.value ? 'rotate(90deg)' : '',
          visibility: slots.default?.() ? '' : 'hidden',
        };
      });

      onMounted(() => {
        setDefaultExpanded();
        emitter.on('update', updateLine);
      });

      onBeforeUnmount(() => {
        emitter.off('update', updateLine);
      });

      return {
        item,
        showContent,
        itemStyle,
        iconStyle,
        handleClickIcon,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .collapse-tree-item {
    padding-left: 40px;
    position: relative;

    &:before {
      display: var(--line-display);
      content: '';
      position: absolute;
      box-sizing: border-box;
      height: var(--line-height);
      width: var(--line-width);
      border-left: 2px solid #E4E7ED;
      border-bottom: 2px solid #E4E7ED;
      border-bottom-left-radius: 8px;
      left: 20px;
      bottom: var(--item-height);
    }

    .collapse-header {
      display: flex;
      align-items: flex-start;
      border-radius: 4px;
      padding: 10px;
      line-height: 20px;

      .header-icon {
        margin-right: 4px;
        flex-shrink: 0;
        color: #909399;
        transition: all 0.3s;
        height: 20px;
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;

        .collapse-icon {
          height: 14px;
          width: 14px;
        }
      }

      .header-content {
        flex-grow: 1;
      }

      &:hover {
        background: whitesmoke;
      }
    }
  }
</style>
