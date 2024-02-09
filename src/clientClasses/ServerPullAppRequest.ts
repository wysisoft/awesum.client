import type { ServerApp } from "./ServerApp";

import type { ServerPullAppRequest as ServerPullAppRequestInterface } from "@/serverClasses/ServerPullAppRequest";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerPullAppRequest implements ServerPullAppRequestInterface {
    constructor(other?:Partial<ServerPullAppRequest>|null, table?: Table) {
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
    
    private _isLeader: boolean = false;
    private _app: ServerApp;
}
