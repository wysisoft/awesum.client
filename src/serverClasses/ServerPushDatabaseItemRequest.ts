import type { ServerDatabaseItem } from "./ServerDatabaseItem";

export interface ServerPushDatabaseItemRequest {
    databaseItem: ServerDatabaseItem;
    force: boolean;
}
