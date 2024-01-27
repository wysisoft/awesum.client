import type { ServerDatabase } from "./ServerDatabase";
import type { ServerDatabaseType } from "./ServerDatabaseType";

import type { ServerPullDatabaseResponse as ServerPullDatabaseResponseInterface } from "@/serverClasses/ServerPullDatabaseResponse";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerPullDatabaseResponse implements ServerPullDatabaseResponseInterface {
    constructor(other?:Partial<ServerPullDatabaseResponse>|null, table?: Table) {
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
    
    private _database: Database = null;
public get database(): Database | null { return this._database; }public set database(v: Database | null) {this._database=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'database',v,this.table,this.promises))}
    private _types: ServerDatabaseType[] | null = null;
public get types(): ServerDatabaseType[] | null | null { return this._types; }public set types(v: ServerDatabaseType[] | null | null) {this._types=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'types',v,this.table,this.promises))}
}
