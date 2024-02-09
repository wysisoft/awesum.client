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
    

    private _letters: string = '';
public get letters():string { return this._letters; }public set letters(v:string) {this._letters=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'letters',v,this.table,this.promises))};
    private _order: number = 0;
public get order():number { return this._order; }public set order(v:number) {this._order=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'order',v,this.table,this.promises))};
    private _image: string = '';
public get image():string { return this._image; }public set image(v:string) {this._image=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'image',v,this.table,this.promises))};
    private _sound: string = '';
public get sound():string { return this._sound; }public set sound(v:string) {this._sound=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'sound',v,this.table,this.promises))};
    private _type: number = 0;
public get type():number { return this._type; }public set type(v:number) {this._type=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'type',v,this.table,this.promises))};
    private _unitId: number = 0;
public get unitId():number { return this._unitId; }public set unitId(v:number) {this._unitId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'unitId',v,this.table,this.promises))};
    private _rewardType: number = 0;
public get rewardType():number { return this._rewardType; }public set rewardType(v:number) {this._rewardType=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'rewardType',v,this.table,this.promises))};
    private _reward: string = '';
public get reward():string { return this._reward; }public set reward(v:string) {this._reward=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'reward',v,this.table,this.promises))};
    private _grouping: number = 0;
public get grouping():number { return this._grouping; }public set grouping(v:number) {this._grouping=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'grouping',v,this.table,this.promises))};
    private _lastModified: string = '';
public get lastModified():string { return this._lastModified; }public set lastModified(v:string) {this._lastModified=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'lastModified',v,this.table,this.promises))};
    private _text: string = '';
public get text():string { return this._text; }public set text(v:string) {this._text=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'text',v,this.table,this.promises))};
    private _deleted: boolean = false;
    private _version: number = 0;
public get version():number { return this._version; }public set version(v:number) {this._version=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'version',v,this.table,this.promises))};
    private _loginid: string = '';
public get loginid():string { return this._loginid; }public set loginid(v:string) {this._loginid=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'loginid',v,this.table,this.promises))};
    private _uniqueId: string = '';
public get uniqueId():string { return this._uniqueId; }public set uniqueId(v:string) {this._uniqueId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'uniqueId',v,this.table,this.promises))};
    private _databaseId: number = 0;
public get databaseId():number { return this._databaseId; }public set databaseId(v:number) {this._databaseId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'databaseId',v,this.table,this.promises))};
    private _appId: number = 0;
public get appId():number { return this._appId; }public set appId(v:number) {this._appId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'appId',v,this.table,this.promises))};
    private _appUniqueId: string = '';
public get appUniqueId():string { return this._appUniqueId; }public set appUniqueId(v:string) {this._appUniqueId=v;this.promises.push(Global.setTablePropertyValueById(this.id, 'appUniqueId',v,this.table,this.promises))};
}
