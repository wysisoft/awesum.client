import type { ServerApp } from "./ServerApp";

export interface ServerPushAppRequest {
    isLeader: boolean | null;
    app: ServerApp | null;
    force: boolean | null;
}
