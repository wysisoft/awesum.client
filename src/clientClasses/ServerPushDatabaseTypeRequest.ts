import type { ServerDatabaseType } from "./ServerDatabaseType";

import type { ServerPushDatabaseTypeRequest as ServerPushDatabaseTypeRequestInterface } from "@/serverClasses/ServerPushDatabaseTypeRequest";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerPushDatabaseTypeRequest implements ServerPushDatabaseTypeRequestInterface {
    constructor(other?:Partial<ServerPushDatabaseTypeRequest>|null, table?: Table) {
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
    
    private _databaseType: ServerDatabaseType;
    private _force: boolean = false;
}
