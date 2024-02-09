import Dexie, { liveQuery, type Table } from "dexie";
import { clientApp } from "./clientClasses/clientApp";
import { ServerDatabase } from './clientClasses/ServerDatabase';
import type { ServerDatabase as ServerDatabaseInterface } from './serverClasses/ServerDatabase';

import type { ServerApp as ServerAppInterface } from './serverClasses/ServerApp';
import type { ServerDatabaseUnit as ServerDatabaseUnitInterface } from './serverClasses/ServerDatabaseUnit';

import type { ServerDatabaseItem as ServerDatabaseItemInterface } from './serverClasses/ServerDatabaseItem';


import { ServerApp } from './clientClasses/ServerApp';
import type { ServerDatabaseType } from './serverClasses/ServerDatabaseType';
import { ServerDatabaseItem } from './clientClasses/ServerDatabaseItem';
import { ServerDatabaseUnit } from './clientClasses/ServerDatabaseUnit';
import type { ServerFollower } from './clientClasses/ServerFollower';
import { computed, createApp, reactive, watch, watchEffect } from 'vue'
import type { awesum as awesumType } from "./awesum";
import { ItemType } from "./itemType";
import { v4 as uuid } from 'uuid';
import type { clientDatabase } from "./clientClasses/clientDatabase";
import { Global } from "./global";
import { from as linq } from "linq-to-typescript"
import { useDexieLiveQuery, useDexieLiveQueryWithDeps } from "./dexieLiveQuery";

export class AwesumDb extends Dexie {
    serverDatabaseTypes!: Table<ServerDatabaseType>;
    serverDatabases!: Table<ServerDatabaseInterface>;
    serverFollowers!: Table<ServerFollower>;
    serverApps!: Table<ServerAppInterface>;
    clientApp!: Table<clientApp>;
    serverDatabaseUnits!: Table<ServerDatabaseUnitInterface>;
    serverDatabaseItems!: Table<ServerDatabaseItemInterface>;
    clientDatabases!: Table<clientDatabase>;

    public static async CreateAsync(awesum: typeof awesumType) {
        const returnValue = new AwesumDb();
        await returnValue.on('populate', async function (trans) {
            var clientAppId =uuid();
            await trans.table('clientApp').add({
                id: 0,
                uniqueId: clientAppId,
            } as clientApp);
            await trans.table('serverApps').add({
                id: 0,
                name: 'app0',
                uniqueId: clientAppId,
            } as ServerApp);
            await trans.table('serverApps').add({
                id: 2,
                name: 'app1',
                uniqueId: uuid(),
            } as ServerApp);
            await trans.table('serverDatabases').add({
                id: 0,
                name: 'Local',
                uniqueId: uuid(),
                appId: 0,
            } as ServerDatabase);
            await trans.table('clientDatabases').add({
                id: 0,
                name: 'Local',
            } as ServerDatabase);

            var typeId = await trans.table('serverDatabaseTypes').add({
                id: 0,
                databaseId: 0,
                type: ItemType.spelling.toString()
            } as ServerDatabaseType);

            await trans.table('serverDatabaseTypes').add({
                id: 1,
                databaseId: 1,
                type: ItemType.spelling.toString()
            } as ServerDatabaseType);

            var unitId = await trans.table('serverDatabaseUnits').add({
                databaseTypeId: typeId,
                name: "Unit 1",
                order: 1,
                databaseId: 0,
                uniqueId: uuid(),
            } as ServerDatabaseUnit);
            await trans.table('serverDatabaseItems').bulkAdd([{
                unitId: parseInt(unitId.toString()),
                letters: 'brick',
                sound: 'TTS',
                text: 'brick',
                order: 0,
                type: ItemType.spelling,
                databaseId: 0,
                uniqueId: uuid(),
            } as ServerDatabaseItem,
            {
                unitId: parseInt(unitId.toString()),
                letters: 'brick',
                sound: 'TTS',
                text: 'brick',
                order: 1,
                type: ItemType.spelling,
                databaseId: 0,
                uniqueId: uuid(),
            } as ServerDatabaseItem]);
        });
        await returnValue.open();

        return returnValue;
    }
    async initialize() {

        var c = await this.clientApp.limit(1).first();
        Global.awesum.clientApp = new clientApp(c, this.clientApp);
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
            return this.serverDatabases.where({ appId: Global.awesum.currentServerApp.id }).toArray();
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
            serverDatabaseTypes: '++id',
            serverDatabaseItems: '++id,unitId',
            serverDatabaseUnits: '++id,databaseId'
        }).upgrade(tx => {
            debugger;
        });
    }
}