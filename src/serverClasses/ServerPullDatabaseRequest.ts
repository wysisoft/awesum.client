import type { ServerDatabase } from "./ServerDatabase";

export interface ServerPullDatabaseRequest {
    isLeader: boolean;
    appId: number;
    database: ServerDatabase;
}
