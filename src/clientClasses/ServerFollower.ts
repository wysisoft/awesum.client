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
    

    private _leaderAppId: number | null = null;
public get leaderAppId(): number | null | null { return this._leaderAppId; }public set leaderAppId(v: number | null | null) {this._leaderAppId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'leaderAppId',v,this.table,this.promises))}
    private _followerAppId: number | null = null;
public get followerAppId(): number | null | null { return this._followerAppId; }public set followerAppId(v: number | null | null) {this._followerAppId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'followerAppId',v,this.table,this.promises))}
    private _followerName: string | null = null;
public get followerName(): string | null | null { return this._followerName; }public set followerName(v: string | null | null) {this._followerName=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'followerName',v,this.table,this.promises))}
    private _followerEmail: string | null = null;
public get followerEmail(): string | null | null { return this._followerEmail; }public set followerEmail(v: string | null | null) {this._followerEmail=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'followerEmail',v,this.table,this.promises))}
    private _leaderName: string | null = null;
public get leaderName(): string | null | null { return this._leaderName; }public set leaderName(v: string | null | null) {this._leaderName=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'leaderName',v,this.table,this.promises))}
    private _leaderEmail: string | null = null;
public get leaderEmail(): string | null | null { return this._leaderEmail; }public set leaderEmail(v: string | null | null) {this._leaderEmail=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'leaderEmail',v,this.table,this.promises))}
    private _lastModified: string | null = null;
public get lastModified(): string | null | null { return this._lastModified; }public set lastModified(v: string | null | null) {this._lastModified=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'lastModified',v,this.table,this.promises))}
    private _leaderAccepted: boolean | null = null;
public get leaderAccepted(): boolean | null | null { return this._leaderAccepted; }public set leaderAccepted(v: boolean | null | null) {this._leaderAccepted=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'leaderAccepted',v,this.table,this.promises))}
    private _leaderRemoved: boolean | null = null;
public get leaderRemoved(): boolean | null | null { return this._leaderRemoved; }public set leaderRemoved(v: boolean | null | null) {this._leaderRemoved=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'leaderRemoved',v,this.table,this.promises))}
    private _uniqueId: string | null = null;
public get uniqueId(): string | null | null { return this._uniqueId; }public set uniqueId(v: string | null | null) {this._uniqueId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'uniqueId',v,this.table,this.promises))}
    private _deleted: boolean | null = null;
public get deleted(): boolean | null | null { return this._deleted; }public set deleted(v: boolean | null | null) {this._deleted=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'deleted',v,this.table,this.promises))}
    private _followerLoginId: string | null = null;
public get followerLoginId(): string | null | null { return this._followerLoginId; }public set followerLoginId(v: string | null | null) {this._followerLoginId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'followerLoginId',v,this.table,this.promises))}
    private _version: number | null = null;
public get version(): number | null | null { return this._version; }public set version(v: number | null | null) {this._version=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'version',v,this.table,this.promises))}
    private _databaseId: number | null = null;
public get databaseId(): number | null | null { return this._databaseId; }public set databaseId(v: number | null | null) {this._databaseId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'databaseId',v,this.table,this.promises))}
    private _initiatedBy: number | null = null;
public get initiatedBy(): number | null | null { return this._initiatedBy; }public set initiatedBy(v: number | null | null) {this._initiatedBy=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'initiatedBy',v,this.table,this.promises))}
    private _followerDatabaseGroup: string | null = null;
public get followerDatabaseGroup(): string | null | null { return this._followerDatabaseGroup; }public set followerDatabaseGroup(v: string | null | null) {this._followerDatabaseGroup=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'followerDatabaseGroup',v,this.table,this.promises))}
}
