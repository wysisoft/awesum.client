//usePlatform.js
import { reactive } from 'vue';
import type { ServerApp } from './clientClasses/ServerApp';
import type { clientApp } from './clientClasses/clientApp';
import { ServerDatabase } from './clientClasses/ServerDatabase';
import type { ServerDatabaseUnit } from './clientClasses/ServerDatabaseUnit';
import { ItemType } from './itemType';

export const awesum = reactive({
  errorMessage:'',  
  progressBarPercentage: 0,
    buttonPressed: false,
    progressBarHandle: 0 as any,
    serverApp: null as unknown as ServerApp,
    clientApp: null as unknown as clientApp,
    currentDatabase: null as unknown as ServerDatabase,
    currentDatabaseUnits: Array<ServerDatabaseUnit>(),
    currentDatabaseUnit: null as unknown as ServerDatabaseUnit,
    serverDatabases: Array<ServerDatabase>(),
    currentItemType:null as unknown as ItemType,
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
  });