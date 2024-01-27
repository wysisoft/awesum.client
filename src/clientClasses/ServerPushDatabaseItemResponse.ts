import type { ServerPushDatabaseItemResponse as ServerPushDatabaseItemResponseInterface } from "@/serverClasses/ServerPushDatabaseItemResponse";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerPushDatabaseItemResponse implements ServerPushDatabaseItemResponseInterface {
    constructor(other?:Partial<ServerPushDatabaseItemResponse>|null, table?: Table) {
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
    
    private _requiresForce: boolean | null = null;
public get requiresForce(): boolean | null | null { return this._requiresForce; }public set requiresForce(v: boolean | null | null) {this._requiresForce=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'requiresForce',v,this.table,this.promises))}
}