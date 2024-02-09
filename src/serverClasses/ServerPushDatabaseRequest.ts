import type { ServerDatabase } from "./ServerDatabase";

export interface ServerPushDatabaseRequest {
    database: ServerDatabase;
    force: boolean;
}
