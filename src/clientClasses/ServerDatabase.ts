import type { ServerDatabase as ServerDatabaseInterface } from "@/serverClasses/ServerDatabase";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerDatabase implements ServerDatabaseInterface {
    constructor(other?:Partial<ServerDatabase>|null, table?: Table) {
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
    

    private _appId: number = 0;
public get appId(): number  { return this._appId; }public set appId(v: number ) {this._appId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'appId',v,this.table,this.promises))}
    private _name: string = '';
public get name(): string  { return this._name; }public set name(v: string ) {this._name=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'name',v,this.table,this.promises))}
    private _default: string = '';
public get default(): string  { return this._default; }public set default(v: string ) {this._default=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'default',v,this.table,this.promises))}
    private _lastModified: string = '';
public get lastModified(): string  { return this._lastModified; }public set lastModified(v: string ) {this._lastModified=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'lastModified',v,this.table,this.promises))}
    private _manualId: string = '';
public get manualId(): string  { return this._manualId; }public set manualId(v: string ) {this._manualId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'manualId',v,this.table,this.promises))}
    private _uniqueId: string = '';
public get uniqueId(): string  { return this._uniqueId; }public set uniqueId(v: string ) {this._uniqueId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'uniqueId',v,this.table,this.promises))}
    private _deleted: boolean = false;
public get deleted(): boolean  { return this._deleted; }public set deleted(v: boolean ) {this._deleted=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'deleted',v,this.table,this.promises))}
}
