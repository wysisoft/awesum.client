import type { ServerDatabaseType as ServerDatabaseTypeInterface } from "@/serverClasses/ServerDatabaseType";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerDatabaseType implements ServerDatabaseTypeInterface {
    constructor(other?:Partial<ServerDatabaseType>|null, table?: Table) {
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
    

    private _type: string = '';
public get type(): string  { return this._type; }public set type(v: string ) {this._type=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'type',v,this.table,this.promises))}
}
