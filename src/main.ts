import { createApp, reactive } from 'vue'

import "./scss/bootstrap.scss"
import "bootstrap"

import App from './App.vue'
import router from './router'
import { AwesumDb } from './awesumDb';
import { Global } from "./global";
import { resources } from './resources/Resources'
import { I18nGlobal } from './i18nGlobal'
import { awesum } from './awesum'

//record time right now
const start = new Date().getTime();





const app = createApp(App)
app.use(I18nGlobal._t);
app.config.globalProperties.awesum = awesum;
app.config.globalProperties.resources = resources;
Global.awesum = app.config.globalProperties.awesum;
Global.resources = resources;
Global.awesumDb = await AwesumDb.CreateAsync(app.config.globalProperties.awesum);
await Global.awesumDb.initialize();
app.use(router)

//if start is less than 1 second from now, wait a second, else continue on
const end = new Date().getTime();
if (end - start < 2000) {
    await setTimeout(() => {
        app.mount('#app')
    }, 2000);
}
else {
    app.mount('#app')
}


