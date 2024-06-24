import Dexie, { liveQuery, type Table } from "dexie";
import { ClientApp } from "./clientClasses/ClientApp";
import { ServerDatabase } from './clientClasses/ServerDatabase';

import type { ServerDatabase as ServerDatabaseInterface } from './serverClasses/ServerDatabase';

import type { ServerApp as ServerAppInterface } from './serverClasses/ServerApp';
import type { ServerDatabaseUnit as ServerDatabaseUnitInterface } from './serverClasses/ServerDatabaseUnit';

import type { ServerDatabaseItem as ServerDatabaseItemInterface } from './serverClasses/ServerDatabaseItem';


import { ServerApp } from './clientClasses/ServerApp';
import type { ServerDatabaseType as ServerDatabaseTypeInterface } from './serverClasses/ServerDatabaseType';
import { ServerDatabaseType } from './clientClasses/ServerDatabaseType';

import { ServerDatabaseItem } from './clientClasses/ServerDatabaseItem';
import { ServerDatabaseUnit } from './clientClasses/ServerDatabaseUnit';
import type { ServerFollower } from './clientClasses/ServerFollower';
import type { ServerFollower as ServerFollowerInterface } from './serverClasses/ServerFollower';

import { computed, createApp, reactive, watch, watchEffect } from 'vue'
import type { awesum as awesumType } from "./awesum";
import { ItemType } from "./itemType";
import { v4 as uuid } from 'uuid';
import type { clientDatabase } from "./clientClasses/clientDatabase";
import { Global } from "./global";
import { from as linq } from "linq-to-typescript"
import { useDexieLiveQuery, useDexieLiveQueryWithDeps } from "./dexieLiveQuery";

export class AwesumDb extends Dexie {
    serverDatabaseTypes!: Table<ServerDatabaseTypeInterface, number>;
    serverDatabases!: Table<ServerDatabaseInterface, number>;
    serverFollowers!: Table<ServerFollowerInterface, number>;
    serverApps!: Table<ServerAppInterface, number>;
    clientApp!: Table<ClientApp, number>;
    serverDatabaseUnits!: Table<ServerDatabaseUnitInterface, number>;
    serverDatabaseItems!: Table<ServerDatabaseItemInterface, number>;
    clientDatabases!: Table<clientDatabase, number>;

    public static async CreateAsync(awesum: typeof awesumType) {
        const returnValue = new AwesumDb();
        await returnValue.on('populate', async function (trans) {
            var uniqueId = uuid();
            await trans.table('clientApp').add({
                id: 1,
                uniqueId,
            } as ClientApp);
            var serverApp = await trans.table('serverApps').add({
                id: 1,
                name: 'app0',
                uniqueId,
                lastModified: new Date().toISOString(),
                manualId: '',
                email: '',
                loginid: '',
                homePageIcon: '',
                deleted: false,
                version: 0,
                allowedToInitiateFollows: false,
                authenticationType: 'google'
            } as ServerAppInterface);
            var serverApp2 = await trans.table('serverApps').add({
                id: 2,
                name: 'app1',
                uniqueId: uuid(),
                lastModified: new Date().toISOString(),
                manualId: '',
                email: '',
                loginid: '',
                homePageIcon: '',
                deleted: false,
                version: 0,
                allowedToInitiateFollows: false,
                authenticationType: 'google'
            } as ServerAppInterface);
            var serverDatabase = await trans.table('serverDatabases').add({
                id: 1,
                name: 'Local',
                uniqueId: uuid(),
                appId: 1,
                lastModified: new Date().toISOString(),
                appUniqueId: serverApp.uniqueId,
                deleted: false,
                version: 0,
                order: 0,
                loginid: '',
                groupName: ''
            } as ServerDatabaseInterface);
            var serverDatabase2 = await trans.table('serverDatabases').add({
                id: 2,
                name: 'Local1',
                uniqueId: uuid(),
                appId: 1,
                lastModified: new Date().toISOString(),
                appUniqueId: serverApp.uniqueId,
                deleted: false,
                version: 0,
                order: 0,
                loginid: '',
                groupName: ''
            } as ServerDatabaseInterface);
            var serverDatabaseType = await trans.table('serverDatabaseTypes').add({
                id: 1,
                databaseId: 1,
                type: ItemType.spelling,
                uniqueId: uuid(),
                lastModified: new Date().toISOString(),
                databaseUniqueId: serverDatabase.uniqueId,
                version: 0,
                order: 0,
                loginid: '',
                databaseGroup: '',
                appId: 0,
                appUniqueId: serverApp.uniqueId
            } as ServerDatabaseTypeInterface);

            await trans.table('serverDatabaseTypes').add({
                id: 2,
                databaseId: 1,
                type: ItemType.reading,
                uniqueId: uuid(),
                lastModified: new Date().toISOString(),
                databaseUniqueId: serverDatabase.uniqueId,
                version: 0,
                order: 0,
                loginid: '',
                databaseGroup: '',
                appId: 0,
                appUniqueId: serverApp.uniqueId
            } as ServerDatabaseTypeInterface);

            var serverDatabaseUnit = await trans.table('serverDatabaseUnits').add({
                id: 1,
                databaseTypeId: 1,
                name: "Unit 1",
                order: 1,
                databaseId: 1,
                uniqueId: uuid(),
                lastModified: new Date().toISOString(),
                databaseTypeUniqueId: serverDatabaseType.uniqueId,
                deleted: false,
                version: 0,
                loginid: '',
                appId: 0,
                appUniqueId: '',
            } as ServerDatabaseUnitInterface);
            await trans.table('serverDatabaseItems').bulkAdd([{
                id: 1,
                unitId: 1,
                letters: 'a,b,c,d,e\nr,w,c,k,v\ni,a,e,o,u\nc,w,t,y,g\nc,k,l,m,n',
                sound: 'TTS',
                text: 'brick',
                order: 0,
                type: ItemType.spelling,
                databaseId: 1,
                uniqueId: uuid(),
                lastModified: new Date().toISOString(),
                unitUniqueId: serverDatabaseUnit.uniqueId,
                image: '',
                rewardType: 0,
                reward: '',
                grouping: 0,
                deleted: false,
                version: 0,
                loginid: '',
                appId: 0,
                appUniqueId: ''
            },
            {
                id: 2,
                unitId: 1,
                letters: 'a,b,c,d,e\nr,w,c,k,v\ni,a,e,o,u\nc,w,t,y,g\nc,k,l,m,n',
                sound: 'TTS',
                text: 'brick',
                order: 1,
                type: ItemType.spelling,
                databaseId: 1,
                uniqueId: uuid(),
                lastModified: new Date().toISOString(),
                unitUniqueId: serverDatabaseUnit.uniqueId,
                image: '',
                rewardType: 0,
                reward: '',
                grouping: 0,
                deleted: false,
                version: 0,
                loginid: '',
                appId: 0,
                appUniqueId: ''

            }] as ServerDatabaseItemInterface[]);
        });
        await returnValue.open();

        return returnValue;
    }
    async initialize() {

        var c = await this.clientApp.limit(1).first();
        Global.awesum.clientApp = new ClientApp(c, this.clientApp);
        if (Global.awesum.clientApp) {
            var s = linq(await this.serverApps.where('id').equals(Global.awesum.clientApp!.id).toArray()).single();
            Global.setApp(s);
        }

        Global.awesum.serverApps = useDexieLiveQuery(
            () => this.serverApps.toArray(),
            { initialValue: await this.serverApps.toArray() }
        ) as any as Array<ServerApp>;

        Global.awesum.serverDatabases = useDexieLiveQuery(
            () => this.serverDatabases.toArray(),
            { initialValue: await this.serverDatabases.toArray() }
        ) as any as Array<ServerDatabaseInterface>;

        Global.awesum.currentDatabases = useDexieLiveQueryWithDeps(() => {
            return this.serverDatabases.where({ appId: Global.awesum.currentServerApp.id }).reverse().sortBy('order');
        }, {
            initialValue: await this.serverDatabases.where({ appId: Global.awesum.currentServerApp.id }).toArray(), immediate: true
            /* Supported all watch options, default: immediate: true */
        }) as any as Array<ServerDatabaseInterface>;

        Global.awesum.currentDatabaseTypes = await this.serverDatabaseTypes.toArray()

    }
    constructor() {
        super('awesum');
        this.version(1).stores({
            clientDatabases: '++id',
            serverDatabases: '++id,appId',
            serverFollowers: '++id',
            serverApps: '++id,uniqueId',
            clientApp: '++id,uniqueId',
            serverDatabaseTypes: '++id,databaseId',
            serverDatabaseItems: '++id,unitId',
            serverDatabaseUnits: '++id,databaseTypeId'
        }).upgrade(tx => {
            debugger;
        });

        this.serverApps.hook('reading', obj => { return new ServerApp(obj, this.serverApps) });
        this.serverDatabases.hook('reading', obj => { return new ServerDatabase(obj, this.serverDatabases) });
        this.serverDatabaseTypes.hook('reading', obj => { return new ServerDatabaseType(obj, this.serverDatabaseTypes) });
    }
}