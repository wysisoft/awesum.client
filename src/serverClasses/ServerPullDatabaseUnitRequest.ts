import type { ServerDatabaseUnit } from "./ServerDatabaseUnit";

export interface ServerPullDatabaseUnitRequest {
    isLeader: boolean | null;
    appId: number | null;
    databaseId: number | null;
    databaseUnit: ServerDatabaseUnit | null;
}
