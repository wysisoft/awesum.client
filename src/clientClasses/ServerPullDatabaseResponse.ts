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
    
    private _database: ServerDatabase;
    private _types: ServerDatabaseType[];
}
