import type { ServerDatabaseItem } from "./ServerDatabaseItem";

export interface ServerPullDatabaseItemRequest {
    isLeader: boolean;
    appId: number;
    databaseId: number;
    databaseItem: ServerDatabaseItem;
}
