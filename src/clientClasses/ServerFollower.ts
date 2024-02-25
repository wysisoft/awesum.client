import type { ServerFollower as ServerFollowerInterface } from "@/serverClasses/ServerFollower";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerFollower implements ServerFollowerInterface {
    constructor(other?:Partial<ServerFollower>|null, table?: Table) {
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
    

    private _leaderAppId: number = 0;
public get leaderAppId():number { return this._leaderAppId; }public set leaderAppId(v:number) {if(this._leaderAppId != v){this._leaderAppId=v;Global.setTablePropertyValueById(this.id, 'leaderAppId',v,this.table)}}
    private _followerAppId: number = 0;
public get followerAppId():number { return this._followerAppId; }public set followerAppId(v:number) {if(this._followerAppId != v){this._followerAppId=v;Global.setTablePropertyValueById(this.id, 'followerAppId',v,this.table)}}
    private _followerName: string = '';
public get followerName():string { return this._followerName; }public set followerName(v:string) {if(this._followerName != v){this._followerName=v;Global.setTablePropertyValueById(this.id, 'followerName',v,this.table)}}
    private _followerEmail: string = '';
public get followerEmail():string { return this._followerEmail; }public set followerEmail(v:string) {if(this._followerEmail != v){this._followerEmail=v;Global.setTablePropertyValueById(this.id, 'followerEmail',v,this.table)}}
    private _leaderName: string = '';
public get leaderName():string { return this._leaderName; }public set leaderName(v:string) {if(this._leaderName != v){this._leaderName=v;Global.setTablePropertyValueById(this.id, 'leaderName',v,this.table)}}
    private _leaderEmail: string = '';
public get leaderEmail():string { return this._leaderEmail; }public set leaderEmail(v:string) {if(this._leaderEmail != v){this._leaderEmail=v;Global.setTablePropertyValueById(this.id, 'leaderEmail',v,this.table)}}
    private _lastModified: string = '';
public get lastModified():string { return this._lastModified; }public set lastModified(v:string) {if(this._lastModified != v){this._lastModified=v;Global.setTablePropertyValueById(this.id, 'lastModified',v,this.table)}}
    private _leaderAccepted: boolean = false;
public get leaderAccepted():boolean { return this._leaderAccepted; }public set leaderAccepted(v:boolean) {if(this._leaderAccepted != v){this._leaderAccepted=v;Global.setTablePropertyValueById(this.id, 'leaderAccepted',v,this.table)}}
    private _leaderRemoved: boolean = false;
public get leaderRemoved():boolean { return this._leaderRemoved; }public set leaderRemoved(v:boolean) {if(this._leaderRemoved != v){this._leaderRemoved=v;Global.setTablePropertyValueById(this.id, 'leaderRemoved',v,this.table)}}
    private _uniqueId: string = '';
public get uniqueId():string { return this._uniqueId; }public set uniqueId(v:string) {if(this._uniqueId != v){this._uniqueId=v;Global.setTablePropertyValueById(this.id, 'uniqueId',v,this.table)}}
    private _deleted: boolean = false;
public get deleted():boolean { return this._deleted; }public set deleted(v:boolean) {if(this._deleted != v){this._deleted=v;Global.setTablePropertyValueById(this.id, 'deleted',v,this.table)}}
    private _followerLoginId: string = '';
public get followerLoginId():string { return this._followerLoginId; }public set followerLoginId(v:string) {if(this._followerLoginId != v){this._followerLoginId=v;Global.setTablePropertyValueById(this.id, 'followerLoginId',v,this.table)}}
    private _version: number = 0;
public get version():number { return this._version; }public set version(v:number) {if(this._version != v){this._version=v;Global.setTablePropertyValueById(this.id, 'version',v,this.table)}}
    private _databaseId: number = 0;
public get databaseId():number { return this._databaseId; }public set databaseId(v:number) {if(this._databaseId != v){this._databaseId=v;Global.setTablePropertyValueById(this.id, 'databaseId',v,this.table)}}
    private _initiatedBy: number = 0;
public get initiatedBy():number { return this._initiatedBy; }public set initiatedBy(v:number) {if(this._initiatedBy != v){this._initiatedBy=v;Global.setTablePropertyValueById(this.id, 'initiatedBy',v,this.table)}}
    private _followerDatabaseGroup: string = '';
public get followerDatabaseGroup():string { return this._followerDatabaseGroup; }public set followerDatabaseGroup(v:string) {if(this._followerDatabaseGroup != v){this._followerDatabaseGroup=v;Global.setTablePropertyValueById(this.id, 'followerDatabaseGroup',v,this.table)}}
}
