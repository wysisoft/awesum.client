import type { ServerDatabaseUnit as ServerDatabaseUnitInterface } from "@/serverClasses/ServerDatabaseUnit";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerDatabaseUnit implements ServerDatabaseUnitInterface {
    constructor(other?:Partial<ServerDatabaseUnit>|null, table?: Table) {
        debugger;
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
    
    private _name: string = '';
public get name():string { return this._name; }public set name(v:string) {debugger;if(this._name != v){this._name=v;Global.setTablePropertyValueById(this.id, 'name',v,this.table)}}
    private _order: number = 0;
public get order():number { return this._order; }public set order(v:number) {if(this._order != v){this._order=v;Global.setTablePropertyValueById(this.id, 'order',v,this.table)}}
    private _lastModified: string = '';
public get lastModified():string { return this._lastModified; }public set lastModified(v:string) {if(this._lastModified != v){this._lastModified=v;Global.setTablePropertyValueById(this.id, 'lastModified',v,this.table)}}
    private _deleted: boolean = false;
public get deleted():boolean { return this._deleted; }public set deleted(v:boolean) {if(this._deleted != v){this._deleted=v;Global.setTablePropertyValueById(this.id, 'deleted',v,this.table)}}
    private _databaseTypeId: number = 0;
public get databaseTypeId():number { return this._databaseTypeId; }public set databaseTypeId(v:number) {if(this._databaseTypeId != v){this._databaseTypeId=v;Global.setTablePropertyValueById(this.id, 'databaseTypeId',v,this.table)}}
    private _version: number = 0;
public get version():number { return this._version; }public set version(v:number) {if(this._version != v){this._version=v;Global.setTablePropertyValueById(this.id, 'version',v,this.table)}}
    private _loginid: string = '';
public get loginid():string { return this._loginid; }public set loginid(v:string) {if(this._loginid != v){this._loginid=v;Global.setTablePropertyValueById(this.id, 'loginid',v,this.table)}}
    private _databaseId: number = 0;
public get databaseId():number { return this._databaseId; }public set databaseId(v:number) {if(this._databaseId != v){this._databaseId=v;Global.setTablePropertyValueById(this.id, 'databaseId',v,this.table)}}
    private _appId: number = 0;
public get appId():number { return this._appId; }public set appId(v:number) {if(this._appId != v){this._appId=v;Global.setTablePropertyValueById(this.id, 'appId',v,this.table)}}
    private _appUniqueId: string = '';
public get appUniqueId():string { return this._appUniqueId; }public set appUniqueId(v:string) {if(this._appUniqueId != v){this._appUniqueId=v;Global.setTablePropertyValueById(this.id, 'appUniqueId',v,this.table)}}
    private _databaseTypeUniqueId: string = '';
public get databaseTypeUniqueId():string { return this._databaseTypeUniqueId; }public set databaseTypeUniqueId(v:string) {if(this._databaseTypeUniqueId != v){this._databaseTypeUniqueId=v;Global.setTablePropertyValueById(this.id, 'databaseTypeUniqueId',v,this.table)}}
    private _uniqueId: string = '';
public get uniqueId():string { return this._uniqueId; }public set uniqueId(v:string) {if(this._uniqueId != v){this._uniqueId=v;Global.setTablePropertyValueById(this.id, 'uniqueId',v,this.table)}}

}
