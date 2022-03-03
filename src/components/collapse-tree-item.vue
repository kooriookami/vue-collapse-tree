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
          paddingLeft: isFirstItem.value ? '0' : `${collapseTree.indent}px`,
          '--line-display': collapseTree.line && !isFirstItem.value ? 'block' : 'none',
          '--line-height': `${lineHeight.value}px`,
          '--line-width': `${collapseTree.indent / 2}px`,
          '--line-left': `${collapseTree.indent / 2}px`,
          '--item-height': `${itemHeight.value}px`,
        };
      });

      const iconStyle = computed(() => {
        const hasSlots = !!slots.default?.();
        return {
          cursor: hasSlots ? 'pointer' : '',
          transform: showContent.value ? 'rotate(90deg)' : '',
          visibility: hasSlots ? '' : 'hidden',
          display: hasSlots || collapseTree.iconPlaceholder ? '' : 'none',
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
      left: var(--line-left);
      bottom: var(--item-height);
    }

    .collapse-header {
      display: flex;
      align-items: flex-start;
      border-radius: 4px;
      padding: 8px;
      font-size: 14px;
      line-height: 24px;

      .header-icon {
        flex-shrink: 0;
        color: #909399;
        transition: all 0.3s;
        height: 24px;
        width: 24px;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;

        .collapse-icon {
          height: 12px;
          width: 12px;
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
