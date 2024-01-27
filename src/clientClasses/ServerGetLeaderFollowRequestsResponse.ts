import type { ServerFollower } from "./ServerFollower";

import type { ServerGetLeaderFollowRequestsResponse as ServerGetLeaderFollowRequestsResponseInterface } from "@/serverClasses/ServerGetLeaderFollowRequestsResponse";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerGetLeaderFollowRequestsResponse implements ServerGetLeaderFollowRequestsResponseInterface {
    constructor(other?:Partial<ServerGetLeaderFollowRequestsResponse>|null, table?: Table) {
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
    
    private _followers: Array<ServerFollower> | null = null;
public get followers(): Array<ServerFollower> | null | null { return this._followers; }public set followers(v: Array<ServerFollower> | null | null) {this._followers=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'followers',v,this.table,this.promises))}
}
