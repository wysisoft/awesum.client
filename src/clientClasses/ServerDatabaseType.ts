import type { ServerDatabaseType as ServerDatabaseTypeInterface } from "@/serverClasses/ServerDatabaseType";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerDatabaseType implements ServerDatabaseTypeInterface {
    constructor(other?:Partial<ServerDatabaseType>|null, table?: Table) {
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
    

    private _type: string | null = null;
public get type(): string | null | null { return this._type; }public set type(v: string | null | null) {this._type=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'type',v,this.table,this.promises))}
    private _databaseId: number | null = null;
public get databaseId(): number | null | null { return this._databaseId; }public set databaseId(v: number | null | null) {this._databaseId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'databaseId',v,this.table,this.promises))}
    private _lastModified: string | null = null;
public get lastModified(): string | null | null { return this._lastModified; }public set lastModified(v: string | null | null) {this._lastModified=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'lastModified',v,this.table,this.promises))}
    private _version: number | null = null;
public get version(): number | null | null { return this._version; }public set version(v: number | null | null) {this._version=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'version',v,this.table,this.promises))}
    private _order: number | null = null;
public get order(): number | null | null { return this._order; }public set order(v: number | null | null) {this._order=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'order',v,this.table,this.promises))}
    private _loginid: string | null = null;
public get loginid(): string | null | null { return this._loginid; }public set loginid(v: string | null | null) {this._loginid=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'loginid',v,this.table,this.promises))}
    private _uniqueId: string | null = null;
public get uniqueId(): string | null | null { return this._uniqueId; }public set uniqueId(v: string | null | null) {this._uniqueId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'uniqueId',v,this.table,this.promises))}
    private _databaseGroup: string | null = null;
public get databaseGroup(): string | null | null { return this._databaseGroup; }public set databaseGroup(v: string | null | null) {this._databaseGroup=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'databaseGroup',v,this.table,this.promises))}
    private _appId: number | null = null;
public get appId(): number | null | null { return this._appId; }public set appId(v: number | null | null) {this._appId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'appId',v,this.table,this.promises))}
}
