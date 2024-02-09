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
    
    private _isLeader: boolean = false;
    private _appId: number = 0;
public get appId():number { return this._appId; }public set appId(v:number) {this._appId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'appId',v,this.table,this.promises))};
    private _database: ServerDatabase;
}
