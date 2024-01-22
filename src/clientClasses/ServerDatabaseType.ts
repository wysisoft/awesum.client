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
    

    private _type: string = '';
public get type(): string  { return this._type; }public set type(v: string ) {this._type=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'type',v,this.table,this.promises))}
    private _databaseId: number = 0;
public get databaseId(): number  { return this._databaseId; }public set databaseId(v: number ) {this._databaseId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'databaseId',v,this.table,this.promises))}
    private _lastModified: string = '';
public get lastModified(): string  { return this._lastModified; }public set lastModified(v: string ) {this._lastModified=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'lastModified',v,this.table,this.promises))}
    private _version: number = 0;
public get version(): number  { return this._version; }public set version(v: number ) {this._version=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'version',v,this.table,this.promises))}
    private _order: number = 0;
public get order(): number  { return this._order; }public set order(v: number ) {this._order=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'order',v,this.table,this.promises))}
    private _loginid: string = '';
public get loginid(): string  { return this._loginid; }public set loginid(v: string ) {this._loginid=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'loginid',v,this.table,this.promises))}
    private _uniqueId: string = '';
public get uniqueId(): string  { return this._uniqueId; }public set uniqueId(v: string ) {this._uniqueId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'uniqueId',v,this.table,this.promises))}
}
