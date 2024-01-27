import type { ServerDatabaseUnit } from "./ServerDatabaseUnit";
import type { ServerDatabaseItem } from "./ServerDatabaseItem";

import type { ServerPullDatabaseUnitResponse as ServerPullDatabaseUnitResponseInterface } from "@/serverClasses/ServerPullDatabaseUnitResponse";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerPullDatabaseUnitResponse implements ServerPullDatabaseUnitResponseInterface {
    constructor(other?:Partial<ServerPullDatabaseUnitResponse>|null, table?: Table) {
        if (other) {
            (this as any)["id"] = (other as any)["id"];
             for (var i in other) {
                  if (i == "id") continue;
                  (this as any)["_" + i] = (other as any)[i];
             }
        }
        if (table) {
             this.table = table;
        }
   }
   id = 0;
   table!: Table;
   promises = Array<Promise<void>>();
   async waitFor() {
        await Promise.all(this.promises);
        this.promises = Array<Promise<void>>();
   }
    
    private _databaseUnit: ServerDatabaseUnit | null = null;
public get databaseUnit(): ServerDatabaseUnit | null | null { return this._databaseUnit; }public set databaseUnit(v: ServerDatabaseUnit | null | null) {this._databaseUnit=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'databaseUnit',v,this.table,this.promises))}
    private _items: ServerDatabaseItem[] | null = null;
public get items(): ServerDatabaseItem[] | null | null { return this._items; }public set items(v: ServerDatabaseItem[] | null | null) {this._items=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'items',v,this.table,this.promises))}
}
