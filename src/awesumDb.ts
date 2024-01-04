import Dexie, { liveQuery, type Table } from "dexie";
import { clientApp } from "./clientClasses/clientApp";
import { ServerDatabase } from './clientClasses/ServerDatabase';
import type { ServerDatabase as ServerDatabaseInterface } from './serverClasses/ServerDatabase';

import { ServerApp } from './clientClasses/ServerApp';
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
    serverDatabases!: Table<ServerDatabaseInterface>;
    serverFollowers!: Table<ServerFollower>;
    serverApps!: Table<ServerApp>;
    clientApp!: Table<clientApp>;
    serverDatabaseUnits!: Table<ServerDatabaseUnit>;
    serverDatabaseItems!: Table<ServerDatabaseItem>;
    clientDatabases!: Table<clientDatabase>;

    public static async CreateAsync(awesum: typeof awesumType) {
        const returnValue = new AwesumDb();
        await returnValue.on('populate', async function (trans) {
            await trans.table('clientApp').add({
                id: 0
            } as clientApp);
            await trans.table('serverApps').add({
                id: 0,
                name: 'app0',
                uniqueId: uuid(),
            } as ServerApp);
            await trans.table('serverApps').add({
                id: 1,
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

            var unitId = await trans.table('serverDatabaseUnits').add({
                type: ItemType.spelling,
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
            { initialValue: [] }
        );

        Global.awesum.serverDatabases = useDexieLiveQuery(
            () => this.serverDatabases.toArray(),
            { initialValue: [] }
        );

        Global.awesum.currentDatabases = useDexieLiveQueryWithDeps(() => {
            return this.serverDatabases.where({ appId: Global.awesum.currentServerApp.id }).toArray();
        }, {
            initialValue: [], immediate: true
            /* Supported all watch options, default: immediate: true */
        });

    }
    constructor() {
        super('awesum');
        this.version(1).stores({
            clientDatabases: '++id',
            serverDatabases: '++id,appId',
            serverFollowers: '++id',
            serverApps: '++id',
            clientApp: '++id',
            serverDatabaseItems: '++id,unitId',
            serverDatabaseUnits: '++id,databaseId'
        }).upgrade(tx => {
            debugger;
        });
    }
}