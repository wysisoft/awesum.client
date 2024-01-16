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
    

    private _manualId: string = '';
public get manualId(): string  { return this._manualId; }public set manualId(v: string ) {this._manualId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'manualId',v,this.table,this.promises))}
    private _email: string = '';
public get email(): string  { return this._email; }public set email(v: string ) {this._email=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'email',v,this.table,this.promises))}
    private _loginid: string = '';
public get loginid(): string  { return this._loginid; }public set loginid(v: string ) {this._loginid=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'loginid',v,this.table,this.promises))}
    private _name: string = '';
public get name(): string  { return this._name; }public set name(v: string ) {this._name=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'name',v,this.table,this.promises))}
    private _lastModified: string = '';
public get lastModified(): string  { return this._lastModified; }public set lastModified(v: string ) {this._lastModified=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'lastModified',v,this.table,this.promises))}
    private _homePageIcon: string = '';
public get homePageIcon(): string  { return this._homePageIcon; }public set homePageIcon(v: string ) {this._homePageIcon=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'homePageIcon',v,this.table,this.promises))}
    private _uniqueId: string = '';
public get uniqueId(): string  { return this._uniqueId; }public set uniqueId(v: string ) {this._uniqueId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'uniqueId',v,this.table,this.promises))}
    private _deleted: boolean = false;
public get deleted(): boolean  { return this._deleted; }public set deleted(v: boolean ) {this._deleted=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'deleted',v,this.table,this.promises))}
}
