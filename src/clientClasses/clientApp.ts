import { Global } from "@/global";
import type { Table } from "dexie";

export class clientApp {
     constructor(other?: Partial<clientApp>, table?: Table) {
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
     private _authenticationType: string = '' 
     private _email: string = '' 
}
