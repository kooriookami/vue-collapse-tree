import { createApp } from 'vue';
import App from './App.vue';
import CollapseTree from '../index';

const app = createApp(App);
app.use(CollapseTree);
app.mount('#app');
