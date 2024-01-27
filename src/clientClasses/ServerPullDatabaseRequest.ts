import type { ServerDatabase } from "./ServerDatabase";

import type { ServerPullDatabaseRequest as ServerPullDatabaseRequestInterface } from "@/serverClasses/ServerPullDatabaseRequest";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerPullDatabaseRequest implements ServerPullDatabaseRequestInterface {
    constructor(other?:Partial<ServerPullDatabaseRequest>|null, table?: Table) {
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
    private _appId: number | null = null;
public get appId(): number | null | null { return this._appId; }public set appId(v: number | null | null) {this._appId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'appId',v,this.table,this.promises))}
    private _database: Database = null;
public get database(): Database | null { return this._database; }public set database(v: Database | null) {this._database=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'database',v,this.table,this.promises))}
}
