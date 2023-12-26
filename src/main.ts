import { createApp, reactive } from 'vue'

import "./bootstrap.scss"
import "bootstrap"

import App from './App.vue'
import router from './router'
import { AwesumDb } from './awesumDb';
import { Global } from "./global";
import { resources } from './resources/Resources'
import { I18nGlobal } from './i18nGlobal'
import { awesum } from './awesum'


const app = createApp(App)
app.use(I18nGlobal._t);
app.config.globalProperties.awesum = awesum;
app.config.globalProperties.resources = resources;
Global.awesum = app.config.globalProperties.awesum;
Global.resources = resources;
Global.awesumDb = await AwesumDb.CreateAsync(app.config.globalProperties.awesum);

app.use(router)

app.mount('#app')