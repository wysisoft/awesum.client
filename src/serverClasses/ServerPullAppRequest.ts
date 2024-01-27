import type { ServerApp } from "./ServerApp";

export interface ServerPullAppRequest {
    isLeader: boolean | null;
    app: ServerApp | null;
}
