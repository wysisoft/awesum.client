import type { ServerDatabase } from "./ServerDatabase";

export interface ServerPushDatabaseRequest {
    isLeader: boolean | null;
    database: Database;
    force: boolean | null;
}
