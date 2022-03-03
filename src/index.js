import CollapseTree from './components/collapse-tree';
import CollapseTreeItem from './components/collapse-tree-item';

export default {
  install: app => {
    app.component('CollapseTree', CollapseTree);
    app.component('CollapseTreeItem', CollapseTreeItem);
  },
};
