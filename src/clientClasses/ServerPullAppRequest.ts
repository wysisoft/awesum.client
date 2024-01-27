import type { ServerApp } from "./ServerApp";

import type { ServerPullAppRequest as ServerPullAppRequestInterface } from "@/serverClasses/ServerPullAppRequest";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerPullAppRequest implements ServerPullAppRequestInterface {
    constructor(other?:Partial<ServerPullAppRequest>|null, table?: Table) {
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
    private _app: ServerApp | null = null;
public get app(): ServerApp | null | null { return this._app; }public set app(v: ServerApp | null | null) {this._app=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'app',v,this.table,this.promises))}
}
