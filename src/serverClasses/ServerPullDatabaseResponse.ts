import type { ServerDatabase } from "./ServerDatabase";
import type { ServerDatabaseType } from "./ServerDatabaseType";

export interface ServerPullDatabaseResponse {
    database: ServerDatabase;
    types: ServerDatabaseType[];
}
