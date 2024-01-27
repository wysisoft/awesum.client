import type { ServerDatabaseType } from "./ServerDatabaseType";

export interface ServerPushDatabaseTypeRequest {
    isLeader: boolean | null;
    databaseType: ServerDatabaseType | null;
    force: boolean | null;
}
