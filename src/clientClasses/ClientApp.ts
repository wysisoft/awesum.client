import { Global } from "@/global";
import { v4 as uuid } from 'uuid';
import type { Table } from "dexie";

export class ClientApp {
     constructor(other?: Partial<ClientApp>, table?: Table) {
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
     id = 1;
     table!: Table;

     private _authenticationType: string = '';
     public get authenticationType(): string { return this._authenticationType; } public set authenticationType(v: string) { if (this._authenticationType != v) { this._authenticationType = v; Global.setTablePropertyValueById(this.id, 'authenticationType', v, this.table) } }
     private _uniqueId: string = '';
     public get uniqueId(): string { return this._uniqueId; } public set uniqueId(v: string) { if (this._uniqueId != v) { this._uniqueId = v; Global.setTablePropertyValueById(this.id, 'uniqueId', v, this.table) } }
     private _email: string = '';
     public get email(): string { return this._email; } public set email(v: string) { if (this._email != v) { this._email = v; Global.setTablePropertyValueById(this.id, 'email', v, this.table) } }

}
