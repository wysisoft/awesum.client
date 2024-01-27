import type { ServerDatabaseItem } from "./ServerDatabaseItem";

import type { ServerPullDatabaseItemResponse as ServerPullDatabaseItemResponseInterface } from "@/serverClasses/ServerPullDatabaseItemResponse";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerPullDatabaseItemResponse implements ServerPullDatabaseItemResponseInterface {
    constructor(other?:Partial<ServerPullDatabaseItemResponse>|null, table?: Table) {
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
    
    private _databaseItem: ServerDatabaseItem | null = null;
public get databaseItem(): ServerDatabaseItem | null | null { return this._databaseItem; }public set databaseItem(v: ServerDatabaseItem | null | null) {this._databaseItem=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'databaseItem',v,this.table,this.promises))}
}
