<template>
  <div class="example-container">
    <div class="examples">
      <collapse-tree
        :key="key"
        :line="form.line"
        :line-offset-height="form.lineOffsetHeight"
        :line-offset-top="form.lineOffsetTop"
        :default-expanded-level="form.defaultExpandedLevel"
        :indent="form.indent"
        :icon-placeholder="form.iconPlaceholder"
      >
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
              <el-button>1-2-1</el-button>
            </template>
            <collapse-tree-item>
              <template #header>
                <el-tag>1-2-1-1</el-tag>
              </template>
            </collapse-tree-item>
          </collapse-tree-item>
          <collapse-tree-item>
            <template #header>
              <el-alert
                title="1-2-2"
                type="success"
                effect="dark"
                :closable="false"
              />
            </template>
          </collapse-tree-item>
        </collapse-tree-item>
      </collapse-tree>
    </div>

    <div class="form">
      <el-form label-width="auto">
        <el-divider>响应式属性</el-divider>
        <el-form-item label="层级线">
          <el-switch v-model="form.line" />
        </el-form-item>
        <el-form-item label="层级缩进">
          <el-slider v-model="form.indent" />
        </el-form-item>
        <el-form-item label="空图标占位">
          <el-switch v-model="form.iconPlaceholder" />
        </el-form-item>
        <el-divider>非响应式属性</el-divider>
        <el-form-item label="线高度偏移">
          <el-slider v-model="form.lineOffsetHeight" />
        </el-form-item>
        <el-form-item label="线距顶偏移">
          <el-slider v-model="form.lineOffsetTop" />
        </el-form-item>
        <el-form-item label="默认展开层级">
          <el-input-number v-model="form.defaultExpandedLevel" :min="0" precision="0" />
        </el-form-item>
      </el-form>

      <div class="button-group">
        <el-button style="width: 100%" type="primary" @click="refresh">重新渲染</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Example',
    data() {
      return {
        form: {
          line: true,
          lineOffsetHeight: 20,
          lineOffsetTop: 20,
          defaultExpandedLevel: 1,
          indent: 40,
          iconPlaceholder: true,
        },
        key: 0,
      };
    },
    methods: {
      refresh() {
        this.key++;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .example-container {
    display: flex;

    .examples {
      flex-grow: 1;
      padding: 20px;
    }

    .form {
      min-height: 100vh;
      padding: 20px;
      width: 400px;
      flex-shrink: 0;
      border-left: 1px solid #DCDFE6;

      .button-group {
        margin-top: 20px;
      }
    }
  }
</style>
