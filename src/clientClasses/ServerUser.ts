import type { ServerApp } from "./ServerApp";

import type { ServerUser as ServerUserInterface } from "@/serverClasses/ServerUser";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerUser implements ServerUserInterface {
    constructor(other?:Partial<ServerUser>|null, table?: Table) {
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
    

    private _email: string | null = null;
public get email(): string | null | null { return this._email; }public set email(v: string | null | null) {this._email=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'email',v,this.table,this.promises))}
    private _loginid: string | null = null;
public get loginid(): string | null | null { return this._loginid; }public set loginid(v: string | null | null) {this._loginid=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'loginid',v,this.table,this.promises))}
    private _name: string | null = null;
public get name(): string | null | null { return this._name; }public set name(v: string | null | null) {this._name=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'name',v,this.table,this.promises))}
    
}
