import type { ServerDatabaseItem } from "./ServerDatabaseItem";

export interface ServerPushDatabaseItemRequest {
    isLeader: boolean | null;
    databaseItem: ServerDatabaseItem | null;
    force: boolean | null;
}
