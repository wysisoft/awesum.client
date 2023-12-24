import '@/extensionMethods'
import { resourcesEnGB } from "@/resources/Resources.en-GB";
import { resources } from "@/resources/Resources";
import { createI18n } from 'vue-i18n'
import { Global } from '@/global';

import { createRouter, createWebHistory, type RouteLocationNormalizedLoaded } from "vue-router";
import Home from "@/views/HomeView.vue";
import StartView from "@/views/StartView.vue";
import NameView from "@/views/NameView.vue";
import LoginView from "@/views/LoginView.vue";
import SettingsView from "@/views/SettingsView.vue";
import AreasView from "@/views/AreasView.vue";
import ErrorView from "@/views/ErrorView.vue";
import SpellingView from "@/views/SpellingView.vue";
import DatabaseView from "@/views/DatabaseView.vue";
import AppSettingsView from "@/views/AppSettingsView.vue";

import { from as linq } from "linq-to-typescript"

import { I18nGlobal } from "@/i18nGlobal";
import { ItemType } from "@/itemType";

Global.router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/' + I18nGlobal.t(resources.Error.key),
      name: I18nGlobal.t(resources.Error.key),
      component: ErrorView,
    },
    {
      path: '/' + I18nGlobal.t(resources.Name.key),
      name: I18nGlobal.t(resources.Name.key),
      component: NameView,
    },
    {
      path: '/' + I18nGlobal.t(resources.Login.key),
      name: I18nGlobal.t(resources.Login.key),
      component: LoginView,
    },    
    
    {
      path: '/' + I18nGlobal.t(resources.Areas.key),
      name: I18nGlobal.t(resources.Areas.key),
      component: AreasView,
    },
    {
      path: '/',
      name: I18nGlobal.t(resources.Home.key),
      component: AreasView,
    },
    {
      path: '/' + I18nGlobal.t(resources.Start.key),
      name: I18nGlobal.t(resources.Start.key),
      component: StartView,
      props: function (route: RouteLocationNormalizedLoaded) {
        const query = {} as any;
        query[I18nGlobal.t(resources.sourcePath.key)] = route.query[I18nGlobal.t(resources.sourcePath.key)];
        query[I18nGlobal.t(resources.sourceQuery.key)] = route.query[I18nGlobal.t(resources.sourceQuery.key)]

        return query;
      }
    },
    {
      path: '/:app/:database/:type/:unit/:index',
      name: 'Item',
      component: () => {
      },
      beforeEnter: (to, from, next) => {
        console.log(7);
        next();
      }
    },
    {
      path: '/:app/:database/:type/:unit',
      name: 'Unit',
      component: () => {
        if (Global.awesum.currentDatabaseUnit) {
          return SpellingView;
        }
      },
      beforeEnter: (to, from, next) => {
        console.log(6);
        next();
      }
      
    },
    {
      path: '/:app/:database/:type',
      name: 'Type',
      component: () => {
        if (Global.awesum.currentItemType == ItemType.spelling) {
          return SpellingView;
        }
      },
      beforeEnter: (to, from, next) => {
        console.log(5);
        next();
      }
    },
    {
      path: '/:app/:database',
      name: 'Database',
      component: DatabaseView,
      beforeEnter: (to, from, next) => {
        console.log(4);
        next();
      }
    },
    {
      path: '/:app',
      name: 'App',
      component: DatabaseView,
      beforeEnter: (to, from, next) => {
        console.log(3);
        next();
      }
    },
    {
      path: '/' + I18nGlobal.t(resources.Settings.key) + '/:app',
      name: I18nGlobal.t(resources.Settings.key),
      component: AppSettingsView,
      beforeEnter: (to, from, next) => {
        console.log(1);
        next();
      }
    },
    {
      path: '/' + I18nGlobal.t(resources.Settings.key),
      name: I18nGlobal.t(resources.Settings.key),
      component: SettingsView,
      beforeEnter: (to, from, next) => {
        console.log(2);
        next();
      }
    },
  ]
})

// Global.router.beforeEach(async (to, from, next) => {
//   //all the reasons why we might want to redirect or 

//   if (
//     to.path.lc('/' + I18nGlobal.t(resources.Error.key))) {
//     next();
//     return;
//   }

//   const userName = Global.awesum.serverApp.name;
//   if (userName == '') {
//     if (!to.path.lc('/' + I18nGlobal.t(resources.Name.key))
//     ) {

//       Global.router.push({
//         path: '/' + I18nGlobal.t(resources.Name.key)
//       });
//       next();
//       return;
//     }
//     else
//     {
//       next();
//       return;
//     }
//   }

//   // if (!to.path.lc('/' + I18nGlobal.t(resources.Start.key)) && !Global.awesum.buttonPressed) {
//   //   const query = {} as any;
//   //   query[I18nGlobal.t(resources.sourcePath.key)] = to.path;
//   //   query[I18nGlobal.t(resources.sourceQuery.key)] = JSON.stringify(to.query);
//   //   Global.router.push({
//   //     path: '/' + I18nGlobal.t(resources.Start.key),
//   //     query
//   //   });
//   //   next();
//   //   return;
//   // }

//   if (to.params.app) {
//     var foundApp = linq(Global.awesum.serverApps).singleOrDefault(x => x.name.lc(to.params.app.toString()));

//     if (!foundApp) {
//       Global.awesum.errorMessage = I18nGlobal.t(resources.Database_$needle$_Not_Found.key, { database: to.params.app.toString() });
//       Global.router.push({
//         path: '/' + I18nGlobal.t(resources.Error.key)
//       });
//       next();
//       return;
//     }
//     else {
//       Global.awesum.currentServerApp = foundApp;
//     }
//   }

//   if (to.params.database) {
//     var foundDatabase = linq(Global.awesum.serverDatabases).singleOrDefault(x => x.name.lc(to.params.database.toString()));

//     if (!foundDatabase) {
//       Global.awesum.errorMessage = I18nGlobal.t(resources.Database_$needle$_Not_Found.key, { database: to.params.database.toString() });
//       Global.router.push({
//         path: '/' + I18nGlobal.t(resources.Error.key)
//       });
//       next();
//       return;
//     }
//     else {
//       Global.awesum.currentDatabase = foundDatabase;
//     }
//   }

//   if (to.params.type) {
//     var foundItemType = ItemType[to.params.type as keyof typeof ItemType];

//     if (!linq(Object.values(ItemType)).contains(foundItemType)) {
//       Global.router.push({
//         path: '/' + I18nGlobal.t(resources.Error.key)
//       });
//       next();
//       return;
//     }
//     else {
//       if (Global.awesum.currentItemType != foundItemType) {
//         Global.awesum.currentItemType = foundItemType;

//         Global.awesum.currentDatabaseUnits = await Global.awesumDb.serverDatabaseUnits.where('databaseId').equals(Global.awesum.currentDatabase.id).and(x => x.type == Global.awesum.currentItemType).toArray();

//         Global.awesum.currentDatabaseUnit = Global.awesum.currentDatabaseUnits[0];
//       }
//     }
//   }
//   else {
//   }

//   if (to.params.unit) {
//     var foundUnit = linq(Global.awesum.currentDatabaseUnits).singleOrDefault(x => x.name.lc(to.params.unit.toString()));

//     if (!foundUnit) {
//       Global.router.push({
//         path: '/' + I18nGlobal.t(resources.Error.key)
//       });
//       next();
//       return;
//     }
//     else {
//       if (Global.awesum.currentDatabaseUnit != foundUnit) {
//         Global.awesum.currentDatabaseUnit = foundUnit;
//       }
//     }
//   }
//   else {
//   }

//   document.title = to.name!.toString();
//   next();
// });


export default Global.router