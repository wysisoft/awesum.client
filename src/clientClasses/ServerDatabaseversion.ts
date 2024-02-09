import type { ServerDatabaseversion as ServerDatabaseversionInterface } from "@/serverClasses/ServerDatabaseversion";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerDatabaseversion implements ServerDatabaseversionInterface {
    constructor(other?:Partial<ServerDatabaseversion>|null, table?: Table) {
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
    
    
    private _databaseid: number = 0;
public get databaseid():number { return this._databaseid; }public set databaseid(v:number) {this._databaseid=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'databaseid',v,this.table,this.promises))};
    private _databasejson: string = '';
public get databasejson():string { return this._databasejson; }public set databasejson(v:string) {this._databasejson=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'databasejson',v,this.table,this.promises))};
    private _updatedate: string = '';
public get updatedate():string { return this._updatedate; }public set updatedate(v:string) {this._updatedate=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'updatedate',v,this.table,this.promises))};
    private _appid: number | null;
}
