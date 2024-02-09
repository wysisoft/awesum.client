import type { ServerApp } from "./ServerApp";

export interface ServerPushAppRequest {
    app: ServerApp;
    force: boolean;
}
