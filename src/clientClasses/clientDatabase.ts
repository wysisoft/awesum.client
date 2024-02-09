import { Global } from "@/global";
import type { Table } from "dexie";

export class clientDatabase {
     constructor(other?: Partial<clientDatabase>, table?: Table) {
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
     private _manualId: string = '';
public get manualId():string { return this._manualId; }public set manualId(v:string) {this._manualId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'manualId',v,this.table,this.promises))};
     private _alias: string = '';
public get alias():string { return this._alias; }public set alias(v:string) {this._alias=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'alias',v,this.table,this.promises))};
}
