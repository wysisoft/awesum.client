import type { ServerDatabase } from "./ServerDatabase";

import type { ServerPushDatabaseRequest as ServerPushDatabaseRequestInterface } from "@/serverClasses/ServerPushDatabaseRequest";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerPushDatabaseRequest implements ServerPushDatabaseRequestInterface {
    constructor(other?:Partial<ServerPushDatabaseRequest>|null, table?: Table) {
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
    
    private _isLeader: boolean | null = null;
public get isLeader(): boolean | null | null { return this._isLeader; }public set isLeader(v: boolean | null | null) {this._isLeader=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'isLeader',v,this.table,this.promises))}
    private _database: Database = null;
public get database(): Database | null { return this._database; }public set database(v: Database | null) {this._database=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'database',v,this.table,this.promises))}
    private _force: boolean | null = null;
public get force(): boolean | null | null { return this._force; }public set force(v: boolean | null | null) {this._force=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'force',v,this.table,this.promises))}
}
