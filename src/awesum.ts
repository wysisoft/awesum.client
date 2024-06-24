import { reactive } from 'vue';
import type { ServerApp as ServerAppInterface } from './serverClasses/ServerApp';
import type { ServerApp } from './clientClasses/ServerApp';
import type { ServerDatabase } from './clientClasses/ServerDatabase';
import type { ClientApp } from './clientClasses/ClientApp';
import type { ServerDatabase as ServerDatabaseInterface } from './serverClasses/ServerDatabase';
import type { ServerDatabaseUnit } from './clientClasses/ServerDatabaseUnit';
import type { ServerDatabaseUnit as ServerDatabaseUnitInterface } from './serverClasses/ServerDatabaseUnit';

import type { ServerDatabaseItem as ServerDatabaseItemInterface } from './serverClasses/ServerDatabaseItem';


import type { ServerDatabaseItem } from './clientClasses/ServerDatabaseItem';
import type { ServerDatabaseType } from './serverClasses/ServerDatabaseType';

import { ItemType } from './itemType';
import { Global } from './global';
import { I18nGlobal } from './i18nGlobal';
import { resources } from './resources/Resources';
import { ItemLevel } from './itemLevel';
import type { ServerPushAppRequest } from './serverClasses/ServerPushAppRequest';
import type { ServerPushAppResponse } from './serverClasses/ServerPushAppResponse';
import type { ServerPushDatabaseRequest } from './serverClasses/ServerPushDatabaseRequest';
import type { ServerPushDatabaseResponse } from './serverClasses/ServerPushDatabaseResponse';
import type { ServerPushDatabaseTypeRequest } from './serverClasses/ServerPushDatabaseTypeRequest';
import type { ServerPushDatabaseUnitRequest } from './serverClasses/ServerPushDatabaseUnitRequest';

import type { ServerPushDatabaseTypeResponse } from './serverClasses/ServerPushDatabaseTypeResponse';
import type { ServerPushDatabaseUnitResponse } from './serverClasses/ServerPushDatabaseUnitResponse';
import type { ServerPushDatabaseItemRequest } from './serverClasses/ServerPushDatabaseItemRequest';
import type { ServerPushDatabaseItemResponse } from './serverClasses/ServerPushDatabaseItemResponse';



export const awesum = reactive({
  errorMessage: '',
  progressBarPercentage: 0,
  buttonPressed: true,
  progressBarHandle: 0 as any,
  serverApp: null as unknown as ServerApp,
  serverApps: Array<ServerApp>(),
  clientApp: null as unknown as ClientApp,
  currentServerApp: null as unknown as ServerAppInterface,
  currentDatabase: null as unknown as ServerDatabaseInterface,
  currentDatabases: Array<ServerDatabaseInterface>(),
  currentDatabaseUnits: Array<ServerDatabaseUnitInterface>(),
  currentDatabaseTypes: Array<ServerDatabaseType>(),
  currentDatabaseUnit: null as unknown as ServerDatabaseUnitInterface,
  currentDatabaseItems: Array<ServerDatabaseItemInterface>(),
  currentDatabaseItem: null as unknown as ServerDatabaseItemInterface,
  serverDatabases: Array<ServerDatabaseInterface>(),

  currentItemType: null as unknown as ServerDatabaseType,
  audio: new Audio('null'),
  getPropertyValue(propertyName: string, propertyLevel: ItemLevel) {
    if (propertyLevel == ItemLevel.databaseItem) {
      return { value: (awesum.currentDatabaseItem as any)[propertyName], source: ItemLevel.databaseItem };
    }
    if (propertyLevel == ItemLevel.databaseUnit) {
      return { value: (awesum.currentDatabaseUnit as any)[propertyName], source: ItemLevel.databaseUnit };
    }
    if (propertyLevel == ItemLevel.databaseType) {
      return { value: (awesum.currentItemType as any)[propertyName], source: ItemLevel.databaseType };
    }
    if (propertyLevel == ItemLevel.database) {
      return { value: (awesum.currentDatabase as any)[propertyName], source: ItemLevel.database };
    }
    if (propertyLevel == ItemLevel.app) {
      return { value: (awesum.currentServerApp as any)[propertyName], source: ItemLevel.app };
    }
    return null;
  },
  startProgressPar() {
    this.progressBarPercentage = 1;
    this.progressBarHandle = setInterval(() => {
      this.progressBarPercentage += .1;
    }, 100);
  },
  stopProgressPar() {
    clearInterval(this.progressBarHandle);
    this.progressBarPercentage = Number.MAX_SAFE_INTEGER;
    setTimeout(() => {
      this.progressBarPercentage = 0;
    }, 300);
  },
  async playAudioOrSpeech(soundString?: string) {
    this.pauseAudio();

    if (soundString) {
      if (soundString.indexOf('TTS') == 0) {
        this.playSpeech(soundString.substring(4));
      }
      else {
        this.playAudio(soundString);
      }
    }
  },
  async playAudio(audio: string) {

    this.audio.src = audio;
    await new Promise(res => {
      this.audio.onended = res
      this.audio.play()
    })
  },
  async playSpeech(text: string) {

    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.rate = 1;
    msg.pitch = 1;

    await new Promise(res => {
      msg.onend = res;
      window.speechSynthesis.speak(msg);
    })
  },
  pauseAudio() {
    if (this.audio) {
      this.audio.pause();
    }
    window.speechSynthesis.cancel();
  },
  canGoForward: function () {
    return this.currentDatabaseItem.order < this.currentDatabaseItems.length - 1;
  },
  goForward: function () {
    this.currentDatabaseItem = this.currentDatabaseItems.find(i => i.order == this.currentDatabaseItem.order + 1)!;
    Global.router.push({
      path: '/' + I18nGlobal.t(resources.Apps.key) + '/' + this.currentServerApp.name + '/' + this.currentDatabase.name + '/' + this.currentItemType + '/' + this.currentDatabaseUnit.name + '/' + this.currentDatabaseItem.order
    });

    this.playAudioOrSpeech();
  },
  canGoBack: function () {
    return this.currentDatabaseItem.order > 0;
  },
  goBack: function () {
    this.currentDatabaseItem = this.currentDatabaseItems.find(i => i.order == this.currentDatabaseItem.order - 1)!;
    Global.router.push({
      path: '/' + I18nGlobal.t(resources.Apps.key) + '/' + this.currentServerApp.name + '/' + this.currentDatabase.name + '/' + this.currentItemType + '/' + this.currentDatabaseUnit.name + '/' + this.currentDatabaseItem.order
    });

    this.playAudioOrSpeech();
  },
  goToItem: function (index: number) {
    this.currentDatabaseItem = this.currentDatabaseItems[index];
    Global.router.push({
      path: '/' + I18nGlobal.t(resources.Apps.key) + '/' + this.currentServerApp.name + '/' + this.currentDatabase.name + '/' + this.currentItemType + '/' + this.currentDatabaseUnit.name + '/' + this.currentDatabaseItem.order
    });

    this.playAudioOrSpeech();
  },
  async pushDatabaseItem(databaseItem: ServerDatabaseItemInterface) {

    var response = await fetch(window.location.origin + "/PushDatabaseItem", {
      method: "POST",
      headers:new Headers({'content-type':'application/json'}),
      body: JSON.stringify({
        databaseItem: Global.toPOJO(databaseItem),
        force: false
      } as ServerPushDatabaseItemRequest),
      credentials: "include",
    }) as Response;

    if (response.status == 200) {
      var databaseResponse = await response.json() as ServerPushDatabaseItemResponse;
      if (!databaseResponse) {
        Global.awesum.errorMessage = I18nGlobal.t(resources.InvalidResponse.key);
        Global.router.push({
          path: '/' + I18nGlobal.t(resources.Error.key)
        });
      }

      if (databaseResponse.requiresForce) {
        alert('Requires force');
      }
      else {

      }
    }
  },
  async pushDatabaseUnit(databaseUnit: ServerDatabaseUnitInterface) {
    var response = await fetch(window.location.origin + "/PushDatabaseUnit", {
      method: "POST",
      headers:new Headers({'content-type':'application/json'}),
      body: JSON.stringify({
        databaseUnit:Global.toPOJO(databaseUnit),
        force: false
      } as ServerPushDatabaseUnitRequest),
      credentials: "include",
    }) as Response;

    if (response.status == 200) {
      var databaseResponse = await response.json() as ServerPushDatabaseUnitResponse;
      if (!databaseResponse) {
        Global.awesum.errorMessage = I18nGlobal.t(resources.InvalidResponse.key);
        Global.router.push({
          path: '/' + I18nGlobal.t(resources.Error.key)
        });
      }

      if (databaseResponse.requiresForce) {
        alert('Requires force');
      }
      else {
        var databaseItems = await Global.awesumDb.serverDatabaseItems.where('unitId').equals(databaseUnit.id).toArray();
        for (const databaseItem of databaseItems) {
          await this.pushDatabaseItem(databaseItem);
        }
      }
    }
  },
  async pushDatabaseType(databaseType: ServerDatabaseType) {

    var response = await fetch(window.location.origin + "/PushDatabaseType", {
      method: "POST",
      headers:new Headers({'content-type':'application/json'}),
      body: JSON.stringify({
        databaseType: Global.toPOJO(databaseType),
        isLeader: databaseType.appUniqueId == Global.awesum.clientApp.uniqueId,
        force: false
      } as ServerPushDatabaseTypeRequest),
      credentials: "include",
    }) as Response;

    if (response.status == 200) {
      var databaseResponse = await response.json() as ServerPushDatabaseTypeResponse;
      if (!databaseResponse) {
        Global.awesum.errorMessage = I18nGlobal.t(resources.InvalidResponse.key);
        Global.router.push({
          path: '/' + I18nGlobal.t(resources.Error.key)
        });
      }

      if (databaseResponse.requiresForce) {
        alert('Requires force');
      }
      else {
        var databaseUnits = await Global.awesumDb.serverDatabaseUnits.where('databaseTypeId').equals(databaseType.id).toArray();
        for (const databaseUnit of databaseUnits) {
          await this.pushDatabaseUnit(databaseUnit);
        }
      }
    }
  },
  async pushDatabase(database: ServerDatabaseInterface) {

    var response = await fetch(window.location.origin + "/PushDatabase", {
      method: "POST",
      headers:new Headers({'content-type':'application/json'}),
      body: JSON.stringify({
        database: Global.toPOJO(database),
        isLeader: database.appUniqueId == Global.awesum.clientApp.uniqueId,
        force: false
      } as ServerPushDatabaseRequest),
      credentials: "include",
    }) as Response;

    if (response.status == 200) {
      var databaseResponse = await response.json() as ServerPushDatabaseResponse;
      if (!databaseResponse) {
        Global.awesum.errorMessage = I18nGlobal.t(resources.InvalidResponse.key);
        Global.router.push({
          path: '/' + I18nGlobal.t(resources.Error.key)
        });
      }

      if (databaseResponse.requiresForce) {
        alert('Requires force');
      }
      else {

        var databaseTypes = await Global.awesumDb.serverDatabaseTypes.where('databaseId').equals(database.id).toArray();
        for (const databaseType of databaseTypes) {
          await this.pushDatabaseType(databaseType);
        }
      }
    }
  },
  async pushApp(app: ServerAppInterface) {

    var response = await fetch(window.location.origin + "/PushApp", {
      method: "POST",
      headers:new Headers({'content-type':'application/json'}),
      body: JSON.stringify({
        app: Global.toPOJO(app),
        force: false
      } as ServerPushAppRequest),
      credentials: "include",
    }) as Response;

    if (response.status == 200) {
      var appResponse = await response.json() as ServerPushAppResponse;
      if (!appResponse) {
        Global.awesum.errorMessage = I18nGlobal.t(resources.InvalidResponse.key);
        Global.router.push({
          path: '/' + I18nGlobal.t(resources.Error.key)
        });
        return;
      }
      
      app.id = appResponse.appId;

      if (appResponse.requiresForce) {
        alert('Requires force');
      }
      else {
        var databases = await Global.awesumDb.serverDatabases.where('appId').equals(app.id).toArray();
        for (const database of databases) {
          await this.pushDatabase(database);
        }
      }
    }
  },
  async refresh() {
    debugger;
    var apps = await Global.awesumDb.serverApps.where('uniqueId').equals(Global.awesum.clientApp.uniqueId).toArray();
    for (const app of apps) {
      await this.pushApp(app);
    }


  }
});