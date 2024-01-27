import type { ServerDatabaseType } from "./ServerDatabaseType";
import type { ServerDatabaseUnit } from "./ServerDatabaseUnit";

import type { ServerPullDatabaseTypeResponse as ServerPullDatabaseTypeResponseInterface } from "@/serverClasses/ServerPullDatabaseTypeResponse";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerPullDatabaseTypeResponse implements ServerPullDatabaseTypeResponseInterface {
    constructor(other?:Partial<ServerPullDatabaseTypeResponse>|null, table?: Table) {
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
    
    private _databaseType: ServerDatabaseType | null = null;
public get databaseType(): ServerDatabaseType | null | null { return this._databaseType; }public set databaseType(v: ServerDatabaseType | null | null) {this._databaseType=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'databaseType',v,this.table,this.promises))}
    private _units: ServerDatabaseUnit[] | null = null;
public get units(): ServerDatabaseUnit[] | null | null { return this._units; }public set units(v: ServerDatabaseUnit[] | null | null) {this._units=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'units',v,this.table,this.promises))}
}
