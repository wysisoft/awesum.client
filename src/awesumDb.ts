import Dexie, { type Table } from "dexie";
import { clientApp } from "./clientClasses/clientApp";
import { ServerDatabase } from './clientClasses/ServerDatabase';
import { ServerApp } from './clientClasses/ServerApp';
import { ServerDatabaseItem } from './clientClasses/ServerDatabaseItem';
import { ServerDatabaseUnit } from './clientClasses/ServerDatabaseUnit';
import type { ServerFollower } from './clientClasses/ServerFollower';
import { createApp, reactive } from 'vue'
import type { awesum as awesumType } from "./awesum";
import { ItemType } from "./itemType";
import { v4 as uuid } from 'uuid';

export class AwesumDb extends Dexie {
    serverDatabases!: Table<ServerDatabase>;
    serverFollowers!: Table<ServerFollower>;
    serverApps!: Table<ServerApp>;
    clientApp!: Table<clientApp>;
    serverDatabaseUnits!: Table<ServerDatabaseUnit>;
    serverDatabaseItems!: Table<ServerDatabaseItem>;

    public static async CreateAsync(awesum: typeof awesumType) {
        const returnValue = new AwesumDb();
        await returnValue.on('populate', async function (trans) {
            await trans.table('clientApp').add({
                id: 0
            } as clientApp);
            await trans.table('serverApps').add({
                id: 0,
                name: '',
                uniqueId: uuid(),
            } as ServerApp);
            await trans.table('serverDatabases').add({
                id: 0,
                name: 'Local',
                uniqueId: uuid(),
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
                type: ItemType.spelling,
                databaseId: 0,
                uniqueId: uuid(),
            } as ServerDatabaseItem,
            {
                unitId: parseInt(unitId.toString()),
                letters: 'brick',
                sound: 'TTS',
                text: 'brick',
                type: ItemType.spelling,
                databaseId: 0,
                uniqueId: uuid(),
            } as ServerDatabaseItem]);
        });
        await returnValue.open();

        awesum.serverDatabases = await returnValue.serverDatabases.toArray();

        var c = await returnValue.clientApp.limit(1).first();
        awesum.clientApp = new clientApp(c, returnValue.clientApp);
        if (awesum.clientApp) {
            var s = await returnValue.serverApps.where('id').equals(awesum.clientApp!.id).first();
            awesum.serverApp = new ServerApp(s, returnValue.serverApps);
        }

        //awesum.currentDatabase = new ServerDatabase(await returnValue.serverDatabases.orderBy('id').first(), returnValue.serverDatabases);
        // var units = await returnValue.serverDatabaseUnits.where('databaseId').equals(awesum.currentDatabase.id).and(x => x.type == awesum.currentItemType).toArray();

        // for (var unit of units) {
        //     awesum.currentDatabaseUnits.push(new ServerDatabaseUnit(unit, returnValue.serverDatabaseUnits));
        // }

        // awesum.currentDatabaseUnit = awesum.currentDatabaseUnits[0];

        return returnValue;
    }
    constructor() {
        super('awesum');
        this.version(1).stores({
            serverDatabases: '++id',
            serverFollowers: '++id',
            serverApps: '++id',
            clientApp: '++id',
            serverDatabaseItems: '++id',
            serverDatabaseUnits: '++id,databaseId'
        }).upgrade(tx => {
            debugger;
        });
    }
}