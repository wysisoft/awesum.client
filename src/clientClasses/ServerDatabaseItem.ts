import type { ServerDatabaseItem as ServerDatabaseItemInterface } from "@/serverClasses/ServerDatabaseItem";
import type { Table } from "dexie";
import { Global } from "@/global";

export class ServerDatabaseItem implements ServerDatabaseItemInterface {
    constructor(other?:Partial<ServerDatabaseItem>|null, table?: Table) {
        if (other) {
            (this as any)["id"] = (other as any)["id"];
             for (var i in other) {
                  if (i == "id") continue;
                  (this as any)["_" + i] = (other as any)[i];
             }
        }
        if (table) {
             this.table = table;
        }
   }
   id = 0;
   table!: Table;
   promises = Array<Promise<void>>();
   async waitFor() {
        await Promise.all(this.promises);
        this.promises = Array<Promise<void>>();
   }
    

    private _letters: string | null = null;
public get letters(): string | null | null { return this._letters; }public set letters(v: string | null | null) {this._letters=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'letters',v,this.table,this.promises))}
    private _order: number | null = null;
public get order(): number | null | null { return this._order; }public set order(v: number | null | null) {this._order=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'order',v,this.table,this.promises))}
    private _image: string | null = null;
public get image(): string | null | null { return this._image; }public set image(v: string | null | null) {this._image=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'image',v,this.table,this.promises))}
    private _sound: string | null = null;
public get sound(): string | null | null { return this._sound; }public set sound(v: string | null | null) {this._sound=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'sound',v,this.table,this.promises))}
    private _type: number | null = null;
public get type(): number | null | null { return this._type; }public set type(v: number | null | null) {this._type=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'type',v,this.table,this.promises))}
    private _unitId: number | null = null;
public get unitId(): number | null | null { return this._unitId; }public set unitId(v: number | null | null) {this._unitId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'unitId',v,this.table,this.promises))}
    private _rewardType: number | null = null;
public get rewardType(): number | null | null { return this._rewardType; }public set rewardType(v: number | null | null) {this._rewardType=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'rewardType',v,this.table,this.promises))}
    private _reward: string | null = null;
public get reward(): string | null | null { return this._reward; }public set reward(v: string | null | null) {this._reward=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'reward',v,this.table,this.promises))}
    private _grouping: number | null = null;
public get grouping(): number | null | null { return this._grouping; }public set grouping(v: number | null | null) {this._grouping=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'grouping',v,this.table,this.promises))}
    private _lastModified: string | null = null;
public get lastModified(): string | null | null { return this._lastModified; }public set lastModified(v: string | null | null) {this._lastModified=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'lastModified',v,this.table,this.promises))}
    private _text: string | null = null;
public get text(): string | null | null { return this._text; }public set text(v: string | null | null) {this._text=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'text',v,this.table,this.promises))}
    private _deleted: boolean | null = null;
public get deleted(): boolean | null | null { return this._deleted; }public set deleted(v: boolean | null | null) {this._deleted=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'deleted',v,this.table,this.promises))}
    private _version: number | null = null;
public get version(): number | null | null { return this._version; }public set version(v: number | null | null) {this._version=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'version',v,this.table,this.promises))}
    private _loginid: string | null = null;
public get loginid(): string | null | null { return this._loginid; }public set loginid(v: string | null | null) {this._loginid=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'loginid',v,this.table,this.promises))}
    private _uniqueId: string | null = null;
public get uniqueId(): string | null | null { return this._uniqueId; }public set uniqueId(v: string | null | null) {this._uniqueId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'uniqueId',v,this.table,this.promises))}
    private _databaseId: number | null = null;
public get databaseId(): number | null | null { return this._databaseId; }public set databaseId(v: number | null | null) {this._databaseId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'databaseId',v,this.table,this.promises))}
    private _appId: number | null = null;
public get appId(): number | null | null { return this._appId; }public set appId(v: number | null | null) {this._appId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'appId',v,this.table,this.promises))}
}
