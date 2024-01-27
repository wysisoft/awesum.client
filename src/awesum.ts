//usePlatform.js
import { reactive } from 'vue';
import type { ServerApp as ServerAppInterface } from './serverClasses/ServerApp';
import type { ServerApp } from './clientClasses/ServerApp';
import type { clientApp } from './clientClasses/clientApp';
import type { ServerDatabase as ServerDatabaseInterface } from './serverClasses/ServerDatabase';
import type { ServerDatabaseUnit } from './clientClasses/ServerDatabaseUnit';
import type { ServerDatabaseItem } from './clientClasses/ServerDatabaseItem';
import type { ServerDatabaseType } from './serverClasses/ServerDatabaseType';

import { ItemType } from './itemType';
import { Global } from './global';
import { I18nGlobal } from './i18nGlobal';
import { resources } from './resources/Resources';
import { ItemLevel } from './itemLevel';
import { ServerPushAppRequest } from './clientClasses/ServerPushAppRequest';

export const awesum = reactive({
  errorMessage:'',  
  progressBarPercentage: 0,
    buttonPressed: true,
    progressBarHandle: 0 as any,
    serverApp: null as unknown as ServerApp,
    serverApps: Array<ServerApp>(),
    clientApp: null as unknown as clientApp,
    currentServerApp: null as unknown as ServerAppInterface,
    currentDatabase: null as unknown as ServerDatabaseInterface,
    currentDatabases: Array<ServerDatabaseInterface>(),
    currentDatabaseUnits: Array<ServerDatabaseUnit>(),
    currentDatabaseTypes: Array<ServerDatabaseType>(),
    currentDatabaseUnit: null as unknown as ServerDatabaseUnit,
    currentDatabaseItems: Array<ServerDatabaseItem>(),
    currentDatabaseItem: null as unknown as ServerDatabaseItem,
    serverDatabases: Array<ServerDatabaseInterface>(),

    currentItemType:null as unknown as ServerDatabaseType,
    audio: new Audio('null'),
    getPropertyValue(propertyName:string,propertyLevel:ItemLevel) {
      if(propertyLevel == ItemLevel.databaseItem){
        return {value:(awesum.currentDatabaseItem as any)[propertyName],source:ItemLevel.databaseItem};
      }
      if(propertyLevel == ItemLevel.databaseUnit){
        return {value:(awesum.currentDatabaseUnit as any)[propertyName],source:ItemLevel.databaseUnit};
      }
      if(propertyLevel == ItemLevel.databaseType){
        return {value:(awesum.currentItemType as any)[propertyName],source:ItemLevel.databaseType};
      }
      if(propertyLevel == ItemLevel.database){
        return {value:(awesum.currentDatabase as any)[propertyName],source:ItemLevel.database};
      }
      if(propertyLevel == ItemLevel.app){
        return {value:(awesum.currentServerApp as any)[propertyName],source:ItemLevel.app};
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
    async refresh(){
      var apps = await Global.awesumDb.serverApps.toArray();
      for (const App of apps) {
        var response = await fetch(window.location.origin + "/PushDatabaseItem", {
          method: "POST",
          body: JSON.stringify(new ServerPushAppRequest({
            A
          })),
          credentials: "include",
        });
    
        if (response.status == 200) {
        }
      }
    }
  });