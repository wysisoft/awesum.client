import { Global } from "@/global";
import type { Table } from "dexie";

export class ClientDatabase {
     constructor(other?: Partial<ClientDatabase>, table?: Table) {
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


     private _manualId: string = '';
public get manualId():string { return this._manualId; }public set manualId(v:string) {if(this._manualId != v){this._manualId=v;Global.setTablePropertyValueById(this.id, 'manualId',v,this.table)}}
     private _alias: string = '';
public get alias():string { return this._alias; }public set alias(v:string) {if(this._alias != v){this._alias=v;Global.setTablePropertyValueById(this.id, 'alias',v,this.table)}}
}
