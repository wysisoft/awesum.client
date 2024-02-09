import type { ServerApp } from "./ServerApp";
import type { ServerDatabase } from "./ServerDatabase";

export interface ServerPullAppResponse {
    app: ServerApp;
    databases: Database[];
}
