import type { ServerDatabaseType } from "./ServerDatabaseType";

export interface ServerPullDatabaseTypeRequest {
    isLeader: boolean | null;
    appId: number | null;
    databaseId: number | null;
    databaseType: ServerDatabaseType | null;
}
