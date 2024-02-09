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
    

    private _name: string = '';
public get name():string { return this._name; }public set name(v:string) {this._name=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'name',v,this.table,this.promises))};
    private _lastModified: string = '';
public get lastModified():string { return this._lastModified; }public set lastModified(v:string) {this._lastModified=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'lastModified',v,this.table,this.promises))};
    private _deleted: boolean = false;
    private _version: number = 0;
public get version():number { return this._version; }public set version(v:number) {this._version=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'version',v,this.table,this.promises))};
    private _order: number = 0;
public get order():number { return this._order; }public set order(v:number) {this._order=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'order',v,this.table,this.promises))};
    private _loginid: string = '';
public get loginid():string { return this._loginid; }public set loginid(v:string) {this._loginid=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'loginid',v,this.table,this.promises))};
    private _uniqueId: string = '';
public get uniqueId():string { return this._uniqueId; }public set uniqueId(v:string) {this._uniqueId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'uniqueId',v,this.table,this.promises))};
    private _groupName: string = '';
public get groupName():string { return this._groupName; }public set groupName(v:string) {this._groupName=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'groupName',v,this.table,this.promises))};
    private _appId: number = 0;
public get appId():number { return this._appId; }public set appId(v:number) {this._appId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'appId',v,this.table,this.promises))};
    private _appUniqueId: string = '';
public get appUniqueId():string { return this._appUniqueId; }public set appUniqueId(v:string) {this._appUniqueId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'appUniqueId',v,this.table,this.promises))};
}
