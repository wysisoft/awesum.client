import type { ServerDatabaseUnit } from "./ServerDatabaseUnit";

export interface ServerPullDatabaseUnitRequest {
    isLeader: boolean;
    appId: number;
    databaseId: number;
    databaseUnit: ServerDatabaseUnit;
}
