import type { ServerApp } from "./ServerApp";

export interface ServerPullAppRequest {
    isLeader: boolean;
    app: ServerApp;
}
