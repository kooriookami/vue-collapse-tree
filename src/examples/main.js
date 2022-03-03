import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'normalize.css';
import CollapseTree from '../index';

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(CollapseTree);
app.mount('#app');
