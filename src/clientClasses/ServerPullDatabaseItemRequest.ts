import type { ServerDatabaseItem } from "./ServerDatabaseItem";

import type { ServerPullDatabaseItemRequest as ServerPullDatabaseItemRequestInterface } from "@/serverClasses/ServerPullDatabaseItemRequest";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerPullDatabaseItemRequest implements ServerPullDatabaseItemRequestInterface {
    constructor(other?:Partial<ServerPullDatabaseItemRequest>|null, table?: Table) {
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
    private _databaseItem: ServerDatabaseItem | null = null;
public get databaseItem(): ServerDatabaseItem | null | null { return this._databaseItem; }public set databaseItem(v: ServerDatabaseItem | null | null) {this._databaseItem=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'databaseItem',v,this.table,this.promises))}
}
