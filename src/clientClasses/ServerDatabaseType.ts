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
    
    private _type: number = 0;
public get type():number { return this._type; }public set type(v:number) {if(this._type != v){this._type=v;Global.setTablePropertyValueById(this.id, 'type',v,this.table)}}
    private _databaseId: number = 0;
public get databaseId():number { return this._databaseId; }public set databaseId(v:number) {if(this._databaseId != v){this._databaseId=v;Global.setTablePropertyValueById(this.id, 'databaseId',v,this.table)}}
    private _lastModified: string = '';
public get lastModified():string { return this._lastModified; }public set lastModified(v:string) {if(this._lastModified != v){this._lastModified=v;Global.setTablePropertyValueById(this.id, 'lastModified',v,this.table)}}
    private _version: number = 0;
public get version():number { return this._version; }public set version(v:number) {if(this._version != v){this._version=v;Global.setTablePropertyValueById(this.id, 'version',v,this.table)}}
    private _order: number = 0;
public get order():number { return this._order; }public set order(v:number) {if(this._order != v){this._order=v;Global.setTablePropertyValueById(this.id, 'order',v,this.table)}}
    private _loginid: string = '';
public get loginid():string { return this._loginid; }public set loginid(v:string) {if(this._loginid != v){this._loginid=v;Global.setTablePropertyValueById(this.id, 'loginid',v,this.table)}}
    private _databaseGroup: string = '';
public get databaseGroup():string { return this._databaseGroup; }public set databaseGroup(v:string) {if(this._databaseGroup != v){this._databaseGroup=v;Global.setTablePropertyValueById(this.id, 'databaseGroup',v,this.table)}}
    private _appId: number = 0;
public get appId():number { return this._appId; }public set appId(v:number) {if(this._appId != v){this._appId=v;Global.setTablePropertyValueById(this.id, 'appId',v,this.table)}}
    private _appUniqueId: string = '';
public get appUniqueId():string { return this._appUniqueId; }public set appUniqueId(v:string) {if(this._appUniqueId != v){this._appUniqueId=v;Global.setTablePropertyValueById(this.id, 'appUniqueId',v,this.table)}}
    private _databaseUniqueId: string = '';
public get databaseUniqueId():string { return this._databaseUniqueId; }public set databaseUniqueId(v:string) {if(this._databaseUniqueId != v){this._databaseUniqueId=v;Global.setTablePropertyValueById(this.id, 'databaseUniqueId',v,this.table)}}
    private _uniqueId: string = '';
public get uniqueId():string { return this._uniqueId; }public set uniqueId(v:string) {if(this._uniqueId != v){this._uniqueId=v;Global.setTablePropertyValueById(this.id, 'uniqueId',v,this.table)}}

}
