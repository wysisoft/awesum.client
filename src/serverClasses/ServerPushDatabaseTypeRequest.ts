import type { ServerDatabaseType } from "./ServerDatabaseType";

export interface ServerPushDatabaseTypeRequest {
    databaseType: ServerDatabaseType;
    force: boolean;
}
