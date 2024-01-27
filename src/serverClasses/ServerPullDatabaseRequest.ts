import type { ServerDatabase } from "./ServerDatabase";

export interface ServerPullDatabaseRequest {
    isLeader: boolean | null;
    appId: number | null;
    database: Database;
}
