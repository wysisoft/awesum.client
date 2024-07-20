import type { ServerApp as ServerAppInterface } from "@/serverClasses/ServerApp";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerApp implements ServerAppInterface {
    constructor(other?:Partial<ServerApp>|null, table?: Table) {
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
    
    private _manualId: string = '';
public get manualId():string { return this._manualId; }public set manualId(v:string) {if(this._manualId != v){this._manualId=v;Global.setTablePropertyValueById(this.id, 'manualId',v,this.table)}}
    private _email: string = '';
public get email():string { return this._email; }public set email(v:string) {if(this._email != v){this._email=v;Global.setTablePropertyValueById(this.id, 'email',v,this.table)}}
    private _loginid: string = '';
public get loginid():string { return this._loginid; }public set loginid(v:string) {if(this._loginid != v){this._loginid=v;Global.setTablePropertyValueById(this.id, 'loginid',v,this.table)}}
    private _name: string = '';
public get name():string { return this._name; }public set name(v:string) {if(this._name != v){this._name=v;Global.setTablePropertyValueById(this.id, 'name',v,this.table)}}
    private _lastModified: string = '';
public get lastModified():string { return this._lastModified; }public set lastModified(v:string) {if(this._lastModified != v){this._lastModified=v;Global.setTablePropertyValueById(this.id, 'lastModified',v,this.table)}}
    private _homePageIcon: string = '';
public get homePageIcon():string { return this._homePageIcon; }public set homePageIcon(v:string) {if(this._homePageIcon != v){this._homePageIcon=v;Global.setTablePropertyValueById(this.id, 'homePageIcon',v,this.table)}}
    private _deleted: boolean = false;
public get deleted():boolean { return this._deleted; }public set deleted(v:boolean) {if(this._deleted != v){this._deleted=v;Global.setTablePropertyValueById(this.id, 'deleted',v,this.table)}}
    private _version: number = 0;
public get version():number { return this._version; }public set version(v:number) {if(this._version != v){this._version=v;Global.setTablePropertyValueById(this.id, 'version',v,this.table)}}
    private _allowedToInitiateFollows: boolean = false;
public get allowedToInitiateFollows():boolean { return this._allowedToInitiateFollows; }public set allowedToInitiateFollows(v:boolean) {if(this._allowedToInitiateFollows != v){this._allowedToInitiateFollows=v;Global.setTablePropertyValueById(this.id, 'allowedToInitiateFollows',v,this.table)}}
    private _uniqueId: string = '';
public get uniqueId():string { return this._uniqueId; }public set uniqueId(v:string) {if(this._uniqueId != v){this._uniqueId=v;Global.setTablePropertyValueById(this.id, 'uniqueId',v,this.table)}}
    private _authenticationType: string = '';
public get authenticationType():string { return this._authenticationType; }public set authenticationType(v:string) {if(this._authenticationType != v){this._authenticationType=v;Global.setTablePropertyValueById(this.id, 'authenticationType',v,this.table)}}

    private _order: number = 0;
public get order():number { return this._order; }public set order(v:number) {if(this._order != v){this._order=v;Global.setTablePropertyValueById(this.id, 'order',v,this.table)}}
}
