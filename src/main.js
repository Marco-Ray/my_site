import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';
import 'animate.css';
import './includes/firebase';
import VeeValidatePlugin from './includes/validation';
import { auth } from './includes/firebase';

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';

// Prism
import Prism from 'prismjs';
// highlight code
import 'prismjs/components/prism-json';

VMdPreview.use(vuepressTheme, {
  Prism,
});
// markdown支持流程图
VMdPreview.use(createMermaidPlugin());
// markdown支持显示代码行数
VMdPreview.use(createLineNumbertPlugin());
// markdown支持代码快速复制
VMdPreview.use(createCopyCodePlugin());
// markdown支持emoji
VMdPreview.use(createEmojiPlugin());

import axios from 'axios';
import VueAxios from 'vue-axios';

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(store);
    app.use(router);
    app.use(VueAxios, axios);
    app.use(VMdPreview);
    app.use(VeeValidatePlugin);

    app.mount('#app');
  }
});

