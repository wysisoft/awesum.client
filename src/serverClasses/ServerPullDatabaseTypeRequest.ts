import type { ServerDatabaseType } from "./ServerDatabaseType";

export interface ServerPullDatabaseTypeRequest {
    isLeader: boolean;
    appId: number;
    databaseId: number;
    databaseType: ServerDatabaseType;
}
