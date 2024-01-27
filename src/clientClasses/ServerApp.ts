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
   promises = Array<Promise<void>>();
   async waitFor() {
        await Promise.all(this.promises);
        this.promises = Array<Promise<void>>();
   }
    

    private _manualId: string | null = null;
public get manualId(): string | null | null { return this._manualId; }public set manualId(v: string | null | null) {this._manualId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'manualId',v,this.table,this.promises))}
    private _email: string | null = null;
public get email(): string | null | null { return this._email; }public set email(v: string | null | null) {this._email=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'email',v,this.table,this.promises))}
    private _loginid: string | null = null;
public get loginid(): string | null | null { return this._loginid; }public set loginid(v: string | null | null) {this._loginid=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'loginid',v,this.table,this.promises))}
    private _name: string | null = null;
public get name(): string | null | null { return this._name; }public set name(v: string | null | null) {this._name=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'name',v,this.table,this.promises))}
    private _lastModified: string | null = null;
public get lastModified(): string | null | null { return this._lastModified; }public set lastModified(v: string | null | null) {this._lastModified=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'lastModified',v,this.table,this.promises))}
    private _homePageIcon: string | null = null;
public get homePageIcon(): string | null | null { return this._homePageIcon; }public set homePageIcon(v: string | null | null) {this._homePageIcon=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'homePageIcon',v,this.table,this.promises))}
    private _deleted: boolean | null = null;
public get deleted(): boolean | null | null { return this._deleted; }public set deleted(v: boolean | null | null) {this._deleted=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'deleted',v,this.table,this.promises))}
    private _version: number | null = null;
public get version(): number | null | null { return this._version; }public set version(v: number | null | null) {this._version=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'version',v,this.table,this.promises))}
    private _allowedToInitiateFollows: boolean | null = null;
public get allowedToInitiateFollows(): boolean | null | null { return this._allowedToInitiateFollows; }public set allowedToInitiateFollows(v: boolean | null | null) {this._allowedToInitiateFollows=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'allowedToInitiateFollows',v,this.table,this.promises))}
}
