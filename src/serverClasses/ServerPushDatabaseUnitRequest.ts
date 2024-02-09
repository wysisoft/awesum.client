import type { ServerDatabaseUnit } from "./ServerDatabaseUnit";

export interface ServerPushDatabaseUnitRequest {
    databaseUnit: ServerDatabaseUnit;
    force: boolean;
}
