import type { ServerDatabaseItem } from "./ServerDatabaseItem";

export interface ServerPullDatabaseItemRequest {
    isLeader: boolean | null;
    appId: number | null;
    databaseId: number | null;
    databaseItem: ServerDatabaseItem | null;
}
