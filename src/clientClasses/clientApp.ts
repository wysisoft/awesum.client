import { Global } from "@/global";
import { v4 as uuid } from 'uuid';
import type { Table } from "dexie";

export class clientApp {
     constructor(other?: Partial<clientApp>, table?: Table) {
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
     promises = Array<Promise<void>>();
     async waitFor() {
          await Promise.all(this.promises);
          this.promises = Array<Promise<void>>();
     }
     private _authenticationType: string = '';
public get authenticationType():string { return this._authenticationType; }public set authenticationType(v:string) {this._authenticationType=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'authenticationType',v,this.table,this.promises))};
     private _uniqueId: string = '';
public get uniqueId():string { return this._uniqueId; }public set uniqueId(v:string) {this._uniqueId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'uniqueId',v,this.table,this.promises))};
     private _email: string = '';
public get email():string { return this._email; }public set email(v:string) {this._email=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'email',v,this.table,this.promises))};

}
