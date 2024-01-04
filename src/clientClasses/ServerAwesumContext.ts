import type { ServerDbSet } from "./ServerDbSet";
import type { ServerApp } from "./ServerApp";
import type { ServerDatabase } from "./ServerDatabase";
import type { ServerDatabaseItem } from "./ServerDatabaseItem";
import type { ServerDatabaseUnit } from "./ServerDatabaseUnit";
import type { ServerFollower } from "./ServerFollower";
import type { ServerDbContext } from "./ServerDbContext";

import type { ServerAwesumContext extends DbContext as ServerAwesumContext extends DbContextInterface } from "@/serverClasses/ServerAwesumContext extends DbContext";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerAwesumContext extends DbContext implements ServerAwesumContext extends DbContextInterface {
    constructor(other?:Partial<ServerAwesumContext extends DbContext>|null, table?: Table) {
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
    
    private _apps: DbSet<ServerApp>;
    private _databases: DbSet<ServerDatabase>;
    private _databaseItems: DbSet<ServerDatabaseItem>;
    private _databaseUnits: DbSet<ServerDatabaseUnit>;
    private _followers: DbSet<ServerFollower>;
}
