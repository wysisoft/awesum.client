import type { ServerDatabaseUnit } from "./ServerDatabaseUnit";

import type { ServerPushDatabaseUnitRequest as ServerPushDatabaseUnitRequestInterface } from "@/serverClasses/ServerPushDatabaseUnitRequest";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerPushDatabaseUnitRequest implements ServerPushDatabaseUnitRequestInterface {
    constructor(other?:Partial<ServerPushDatabaseUnitRequest>|null, table?: Table) {
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
    private _databaseUnit: ServerDatabaseUnit | null = null;
public get databaseUnit(): ServerDatabaseUnit | null | null { return this._databaseUnit; }public set databaseUnit(v: ServerDatabaseUnit | null | null) {this._databaseUnit=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'databaseUnit',v,this.table,this.promises))}
    private _force: boolean | null = null;
public get force(): boolean | null | null { return this._force; }public set force(v: boolean | null | null) {this._force=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'force',v,this.table,this.promises))}
}
