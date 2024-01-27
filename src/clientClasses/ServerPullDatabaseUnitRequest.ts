import type { ServerDatabaseUnit } from "./ServerDatabaseUnit";

import type { ServerPullDatabaseUnitRequest as ServerPullDatabaseUnitRequestInterface } from "@/serverClasses/ServerPullDatabaseUnitRequest";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerPullDatabaseUnitRequest implements ServerPullDatabaseUnitRequestInterface {
    constructor(other?:Partial<ServerPullDatabaseUnitRequest>|null, table?: Table) {
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
    private _databaseId: number | null = null;
public get databaseId(): number | null | null { return this._databaseId; }public set databaseId(v: number | null | null) {this._databaseId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'databaseId',v,this.table,this.promises))}
    private _databaseUnit: ServerDatabaseUnit | null = null;
public get databaseUnit(): ServerDatabaseUnit | null | null { return this._databaseUnit; }public set databaseUnit(v: ServerDatabaseUnit | null | null) {this._databaseUnit=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'databaseUnit',v,this.table,this.promises))}
}
