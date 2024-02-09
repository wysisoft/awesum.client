import type { ServerDatabaseUnit } from "./ServerDatabaseUnit";
import type { ServerDatabaseItem } from "./ServerDatabaseItem";

export interface ServerPullDatabaseUnitResponse {
    databaseUnit: ServerDatabaseUnit;
    items: ServerDatabaseItem[];
}
