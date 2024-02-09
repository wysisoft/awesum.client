import type { ServerDatabaseType } from "./ServerDatabaseType";
import type { ServerDatabaseUnit } from "./ServerDatabaseUnit";

export interface ServerPullDatabaseTypeResponse {
    databaseType: ServerDatabaseType;
    units: ServerDatabaseUnit[];
}
