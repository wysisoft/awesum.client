import type { ServerFollower } from "./ServerFollower";

import type { ServerGetCurrentUserInfoResponse as ServerGetCurrentUserInfoResponseInterface } from "@/serverClasses/ServerGetCurrentUserInfoResponse";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerGetCurrentUserInfoResponse implements ServerGetCurrentUserInfoResponseInterface {
    constructor(other?:Partial<ServerGetCurrentUserInfoResponse>|null, table?: Table) {
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
    
    private _manualId: string | null = null;
public get manualId(): string | null | null { return this._manualId; }public set manualId(v: string | null | null) {this._manualId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'manualId',v,this.table,this.promises))}
    private _authenticationType: string | null = null;
public get authenticationType(): string | null | null { return this._authenticationType; }public set authenticationType(v: string | null | null) {this._authenticationType=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'authenticationType',v,this.table,this.promises))}
    private _email: string | null = null;
public get email(): string | null | null { return this._email; }public set email(v: string | null | null) {this._email=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'email',v,this.table,this.promises))}
    private _id: string | null = null;
public get id(): string | null | null { return this._id; }public set id(v: string | null | null) {this._id=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'id',v,this.table,this.promises))}
    private _appId: string | null = null;
public get appId(): string | null | null { return this._appId; }public set appId(v: string | null | null) {this._appId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'appId',v,this.table,this.promises))}
    private _followers: Array<ServerFollower> | null = null;
public get followers(): Array<ServerFollower> | null | null { return this._followers; }public set followers(v: Array<ServerFollower> | null | null) {this._followers=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'followers',v,this.table,this.promises))}
}
