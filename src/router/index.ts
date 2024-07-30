import '@/extensionMethods'
import { resourcesEnGB } from "@/resources/Resources.en-GB";
import { resources } from "@/resources/Resources";
import { createI18n } from 'vue-i18n'
import { Global } from '@/global';

import { createRouter, createWebHistory, type RouteLocationNormalizedLoaded } from "vue-router";
import AboutView from "@/views/AboutView.vue";
import HomeView from "@/views/HomeView.vue";
import StartView from "@/views/StartView.vue";
import NameView from "@/views/NameView.vue";
import LoginView from "@/views/LoginView.vue";
import SettingsView from "@/views/SettingsView.vue";
import AreasView from "@/views/AreasView.vue";
import ErrorView from "@/views/ErrorView.vue";
import SpellingView from "@/views/SpellingView.vue";
import SpellingUnitView from "@/views/SpellingUnitView.vue";
import SpellingSettingsView from "@/views/SpellingSettingsView.vue";

import SpellingItemSettingsView from "@/views/SpellingSettingsView.vue";




import SpellingUnitSettingsView from "@/views/SpellingUnitSettingsView.vue";
import SpellingItemView from "@/views/SpellingItemView2.vue";

import DatabaseView from "@/views/DatabaseView.vue";
import AppSettingsView from "@/views/AppSettingsView.vue";
import DatabaseSettingsView from "@/views/DatabaseSettingsView.vue";

import { from as linq } from "linq-to-typescript"

import { I18nGlobal } from "@/i18nGlobal";
import { ItemType } from "@/itemType";
import AppView from "@/views/AppView.vue";
import { ItemLevel } from '@/itemLevel';
import { ServerDatabaseUnit } from '@/clientClasses/ServerDatabaseUnit';

declare module 'vue-router' {
  interface RouteMeta {
    // must be declared by every route
    itemLevel: ItemLevel
  }
}

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
      path: '/' + I18nGlobal.t(resources.About.key),
      name: I18nGlobal.t(resources.About.key),
      component: AboutView,
    },
    {
      path: '/',
      name: I18nGlobal.t(resources.Home.key),
      component: HomeView,
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
      path: '/' + I18nGlobal.t(resources.Apps.key) + '/:app/:database/:type/:unit/:index',
      name: 'AppItem',
      component: async () => {
        if (Global.awesum.currentItemType.type == ItemType.spelling) {
          return SpellingItemView;
        }
      },
      meta: {
        itemLevel: ItemLevel.databaseItem
      }
    },
    {
      path: '/' + I18nGlobal.t(resources.Apps.key) + '/:app/:database/:type/:unit',
      name: 'AppUnit',
      component: async () => {
        if (Global.awesum.currentItemType.type == ItemType.spelling) {
          return SpellingUnitView;
        }
      },
      meta: {
        itemLevel: ItemLevel.databaseUnit
      }
    },
    {
      path: '/' + I18nGlobal.t(resources.Apps.key) + '/:app/:database/:type',
      name: 'AppType',
      component: async () => {
        if (Global.awesum.currentItemType.type == ItemType.spelling) {
          return SpellingView;
        }
      },
      meta: {
        itemLevel: ItemLevel.databaseType
      }
    },
    {
      path: '/' + I18nGlobal.t(resources.Apps.key) + '/:app/:database',
      name: 'AppDatabase',
      component: DatabaseView,
      meta: {
        itemLevel: ItemLevel.database
      }
    },
    {
      path: '/' + I18nGlobal.t(resources.Apps.key) + '/:app',
      name: 'AppApp',
      component: AppView,
      meta: {
        itemLevel: ItemLevel.app
      }
    },
    {
      path: '/' + I18nGlobal.t(resources.Apps.key),
      name: 'App',
      component: DatabaseView
    },
    {
      path: '/' + I18nGlobal.t(resources.Settings.key) + '/:app/:database/:type/:unit/:index',
      name: 'SettingsItem',
      component: () => {
        if (Global.awesum.currentItemType.type == ItemType.spelling) {
          return SpellingItemSettingsView;
        }
      },
      meta: {
        itemLevel: ItemLevel.databaseItem
      }
    },
    {
      path: '/' + I18nGlobal.t(resources.Settings.key) + '/:app/:database/:type/:unit',
      name: 'SettingsUnit',
      component: () => {
        if (Global.awesum.currentDatabaseUnit) {
          return SpellingUnitSettingsView;
        }
      },
      meta: {
        itemLevel: ItemLevel.databaseUnit
      }
    },
    {
      path: '/' + I18nGlobal.t(resources.Settings.key) + '/:app/:database/:type',
      name: 'SettingsType',
      component: () => {
        if (Global.awesum.currentItemType.type == ItemType.spelling) {
          return SpellingSettingsView;
        }
      },
      meta: {
        itemLevel: ItemLevel.databaseType
      }
    },
    {
      path: '/' + I18nGlobal.t(resources.Settings.key) + '/:app/:database',
      name: 'SettingsDatabase',
      component: DatabaseSettingsView,
      meta: {
        itemLevel: ItemLevel.database
      }
    },
    {
      path: '/' + I18nGlobal.t(resources.Settings.key) + '/:app',
      name: 'SettingsApp',
      component: AppSettingsView,
      meta: {
        itemLevel: ItemLevel.app
      }
    },
    {
      path: '/' + I18nGlobal.t(resources.Settings.key),
      name: 'Settings',
      component: SettingsView
    },
  ]
})

Global.router.beforeEach(async (to, from, next) => {

  //all the reasons why we might want to redirect or 
  if (
    to.path.lc('/' + I18nGlobal.t(resources.Error.key))) {
    next();
    return;
  }

  const userName = Global.awesum.serverApp.name;
  if (userName == '') {
    if (!to.path.lc('/' + I18nGlobal.t(resources.Name.key))
    ) {
      Global.router.push({
        path: '/' + I18nGlobal.t(resources.Name.key)
      });
      next();
      return;
    }
    else {
      next();
      return;
    }
  }

  // if (!to.path.lc('/' + I18nGlobal.t(resources.Start.key)) && !Global.awesum.buttonPressed) {
  //   const query = {} as any;
  //   query[I18nGlobal.t(resources.sourcePath.key)] = to.path;
  //   query[I18nGlobal.t(resources.sourceQuery.key)] = JSON.stringify(to.query);
  //   Global.router.push({
  //     path: '/' + I18nGlobal.t(resources.Start.key),
  //     query
  //   });
  //   next();
  //   return;
  // }
  if (to.params.app) {
    var foundApp = linq(Global.awesum.serverApps).singleOrDefault(x => x.name.lc(to.params.app.toString()));

    if (!foundApp) {
      Global.awesum.errorMessage = I18nGlobal.t(resources.Database_$needle$_Not_Found.key, { database: to.params.app.toString() });
      Global.router.push({
        path: '/' + I18nGlobal.t(resources.Error.key)
      });
      next();
      return;
    }
    else {
      Global.setApp(foundApp);
    }
  }

  if (to.params.database) {
    var foundDatabase = linq(Global.awesum.serverDatabases).singleOrDefault(x => x.name.lc(to.params.database.toString()));

    if (!foundDatabase) {
      Global.awesum.errorMessage = I18nGlobal.t(resources.Database_$needle$_Not_Found.key, { database: to.params.database.toString() });
      Global.router.push({
        path: '/' + I18nGlobal.t(resources.Error.key)
      });
      next();
      return;
    }
    else {
      Global.awesum.currentDatabase = foundDatabase;
    }
  }

  if (to.params.type) {

    var foundItemType = linq(Global.awesum.currentDatabaseTypes).singleOrDefault(x => x.type == ItemType[to.params.type.toString().toLocaleLowerCase() as keyof typeof ItemType]);

    if (!foundItemType) {
      Global.router.push({
        path: '/' + I18nGlobal.t(resources.Error.key)
      });
      next();
      return;
    }
    else {
      if (Global.awesum.currentItemType != foundItemType) {
        Global.awesum.currentItemType = foundItemType;
        Global.awesum.currentDatabaseUnits = await Global.awesumDb.serverDatabaseUnits.where('databaseTypeId').equals(Global.awesum.currentItemType.id).toArray();
      }
    }
  }
  else {
  }

  if (to.params.unit) {
    var foundUnit = linq(Global.awesum.currentDatabaseUnits).singleOrDefault(x => x.name.lc(to.params.unit.toString()));

    if (!foundUnit) {
      Global.router.push({
        path: '/' + I18nGlobal.t(resources.Error.key)
      });
      next();
      return;
    }
    else {
      if (Global.awesum.currentDatabaseUnit != foundUnit) {
        Global.awesum.currentDatabaseUnit = foundUnit;
        Global.awesum.currentDatabaseItems = await Global.awesumDb.serverDatabaseItems.where('unitId').equals(Global.awesum.currentDatabaseUnit.id).toArray();

      }
    }
  }
  else {
  }

  if (to.params.index) {
    var foundItem = linq(Global.awesum.currentDatabaseItems).singleOrDefault(x => x.order.toString().lc(to.params.index.toString()));

    if (!foundItem) {
      Global.router.push({
        path: '/' + I18nGlobal.t(resources.Error.key)
      });
      next();
      return;
    }
    else {
      if (Global.awesum.currentDatabaseItem != foundItem) {
        Global.awesum.currentDatabaseItem = foundItem;
      }
    }
  }
  else {
  }

  if(to.name! == 'AppApp'){
    document.title =  I18nGlobal.t(resources.Awesum.key) + ' - ' + Global.awesum.currentServerApp.name;
  }
  else if(to.name! == 'AppDatabase'){
    document.title =  I18nGlobal.t(resources.Awesum.key) + ' - ' + Global.awesum.currentDatabase.name;
  }
  else if(to.name! == 'AppType'){
    document.title =  I18nGlobal.t(resources.Awesum.key) + ' - ' + Global.capitalizeFirstLetter(ItemType[Global.awesum.currentItemType.type]);
  }
  else if(to.name! == 'AppUnit'){
    document.title =  I18nGlobal.t(resources.Awesum.key) + ' - ' + Global.awesum.currentDatabaseUnit.name;
  }
  else if(to.name! == 'AppItem'){
    document.title =  I18nGlobal.t(resources.Awesum.key) + ' - ' + Global.awesum.currentDatabaseItem.order;
  }
  else
  {
    document.title =  I18nGlobal.t(resources.Awesum.key) + ' - ' + to.name!.toString();

  }
  next();
});


export default Global.router