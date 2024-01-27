import type { ServerApp } from "./ServerApp";

export interface ServerUser {
    id: number | null;
    email: string | null;
    loginid: string | null;
    name: string | null;
    
}
