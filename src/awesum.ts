//usePlatform.js
import { reactive } from 'vue';
import type { ServerApp as ServerAppInterface } from './serverClasses/ServerApp';
import type { ServerApp } from './clientClasses/ServerApp';
import type { clientApp } from './clientClasses/clientApp';
import type { ServerDatabase as ServerDatabaseInterface } from './serverClasses/ServerDatabase';
import type { ServerDatabaseUnit } from './clientClasses/ServerDatabaseUnit';
import type { ServerDatabaseItem } from './clientClasses/ServerDatabaseItem';

import { ItemType } from './itemType';

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
    currentDatabaseUnit: null as unknown as ServerDatabaseUnit,
    currentDatabaseItems: Array<ServerDatabaseItem>(),
    currentDatabaseItem: null as unknown as ServerDatabaseItem,
    serverDatabases: Array<ServerDatabaseInterface>(),

    currentItemType:null as unknown as ItemType,
    audio: new Audio('null'),
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
    async playAudioOrSpeech(soundString: string) {
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
  });