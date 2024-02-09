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
   promises = Array<Promise<void>>();
   async waitFor() {
        await Promise.all(this.promises);
        this.promises = Array<Promise<void>>();
   }
    

    private _leaderAppId: number = 0;
public get leaderAppId():number { return this._leaderAppId; }public set leaderAppId(v:number) {this._leaderAppId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'leaderAppId',v,this.table,this.promises))};
    private _followerAppId: number = 0;
public get followerAppId():number { return this._followerAppId; }public set followerAppId(v:number) {this._followerAppId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'followerAppId',v,this.table,this.promises))};
    private _followerName: string = '';
public get followerName():string { return this._followerName; }public set followerName(v:string) {this._followerName=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'followerName',v,this.table,this.promises))};
    private _followerEmail: string = '';
public get followerEmail():string { return this._followerEmail; }public set followerEmail(v:string) {this._followerEmail=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'followerEmail',v,this.table,this.promises))};
    private _leaderName: string = '';
public get leaderName():string { return this._leaderName; }public set leaderName(v:string) {this._leaderName=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'leaderName',v,this.table,this.promises))};
    private _leaderEmail: string = '';
public get leaderEmail():string { return this._leaderEmail; }public set leaderEmail(v:string) {this._leaderEmail=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'leaderEmail',v,this.table,this.promises))};
    private _lastModified: string = '';
public get lastModified():string { return this._lastModified; }public set lastModified(v:string) {this._lastModified=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'lastModified',v,this.table,this.promises))};
    private _leaderAccepted: boolean = false;
    private _leaderRemoved: boolean = false;
    private _uniqueId: string = '';
public get uniqueId():string { return this._uniqueId; }public set uniqueId(v:string) {this._uniqueId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'uniqueId',v,this.table,this.promises))};
    private _deleted: boolean = false;
    private _followerLoginId: string = '';
public get followerLoginId():string { return this._followerLoginId; }public set followerLoginId(v:string) {this._followerLoginId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'followerLoginId',v,this.table,this.promises))};
    private _version: number = 0;
public get version():number { return this._version; }public set version(v:number) {this._version=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'version',v,this.table,this.promises))};
    private _databaseId: number = 0;
public get databaseId():number { return this._databaseId; }public set databaseId(v:number) {this._databaseId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'databaseId',v,this.table,this.promises))};
    private _initiatedBy: number = 0;
public get initiatedBy():number { return this._initiatedBy; }public set initiatedBy(v:number) {this._initiatedBy=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'initiatedBy',v,this.table,this.promises))};
    private _followerDatabaseGroup: string = '';
public get followerDatabaseGroup():string { return this._followerDatabaseGroup; }public set followerDatabaseGroup(v:string) {this._followerDatabaseGroup=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'followerDatabaseGroup',v,this.table,this.promises))};
}
