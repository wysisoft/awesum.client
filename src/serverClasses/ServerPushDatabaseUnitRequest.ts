import type { ServerDatabaseUnit } from "./ServerDatabaseUnit";

export interface ServerPushDatabaseUnitRequest {
    isLeader: boolean | null;
    databaseUnit: ServerDatabaseUnit | null;
    force: boolean | null;
}
