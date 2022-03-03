import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import copy from 'rollup-plugin-copy';
import path from 'path';

const buildLib = {
  lib: {
    entry: path.resolve(__dirname, 'src/index.js'),
    name: 'CollapseTree',
    fileName: format => `${format}/index.js`,
  },
  rollupOptions: {
    // 确保外部化处理那些你不想打包进库的依赖
    external: ['vue'],
    output: {
      // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      globals: {
        vue: 'Vue',
      },
    },
    plugins: [
      copy({
        targets: [
          { src: 'LICENSE', dest: 'dist' },
          { src: 'README.md', dest: 'dist' },
          { src: 'package.json', dest: 'dist' },
        ],
        hook: 'writeBundle',
      }),
    ],
  },
};

const buildWebsite = {
  outDir: 'dist-website',
};

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'], // 扩展了.vue后缀
  },
  server: {
    host: '0.0.0.0',
    port: 8020,
  },
  build: process.argv.includes('website') ? buildWebsite : buildLib,
});
