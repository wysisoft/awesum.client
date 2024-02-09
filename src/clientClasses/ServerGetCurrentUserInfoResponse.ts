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
    
    private _manualId: string = '';
public get manualId():string { return this._manualId; }public set manualId(v:string) {this._manualId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'manualId',v,this.table,this.promises))};
    private _authenticationType: string = '';
public get authenticationType():string { return this._authenticationType; }public set authenticationType(v:string) {this._authenticationType=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'authenticationType',v,this.table,this.promises))};
    private _email: string = '';
public get email():string { return this._email; }public set email(v:string) {this._email=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'email',v,this.table,this.promises))};
    private _id: string = '';
public get id():string { return this._id; }public set id(v:string) {this._id=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'id',v,this.table,this.promises))};
    private _appId: string = '';
public get appId():string { return this._appId; }public set appId(v:string) {this._appId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'appId',v,this.table,this.promises))};
    private _followers: Array<ServerFollower>;
}
