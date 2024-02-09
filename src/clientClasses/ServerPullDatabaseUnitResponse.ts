import type { ServerDatabaseUnit } from "./ServerDatabaseUnit";
import type { ServerDatabaseItem } from "./ServerDatabaseItem";

import type { ServerPullDatabaseUnitResponse as ServerPullDatabaseUnitResponseInterface } from "@/serverClasses/ServerPullDatabaseUnitResponse";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerPullDatabaseUnitResponse implements ServerPullDatabaseUnitResponseInterface {
    constructor(other?:Partial<ServerPullDatabaseUnitResponse>|null, table?: Table) {
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
    
    private _databaseUnit: ServerDatabaseUnit;
    private _items: ServerDatabaseItem[];
}
