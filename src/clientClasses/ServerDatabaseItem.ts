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
    
    private _letters: string = '';
public get letters():string { return this._letters; }public set letters(v:string) {if(this._letters != v){this._letters=v;Global.setTablePropertyValueById(this.id, 'letters',v,this.table)}}
    private _order: number = 0;
public get order():number { return this._order; }public set order(v:number) {if(this._order != v){this._order=v;Global.setTablePropertyValueById(this.id, 'order',v,this.table)}}
    private _image: string = '';
public get image():string { return this._image; }public set image(v:string) {if(this._image != v){this._image=v;Global.setTablePropertyValueById(this.id, 'image',v,this.table)}}
    private _sound: string = '';
public get sound():string { return this._sound; }public set sound(v:string) {if(this._sound != v){this._sound=v;Global.setTablePropertyValueById(this.id, 'sound',v,this.table)}}
    private _type: number = 0;
public get type():number { return this._type; }public set type(v:number) {if(this._type != v){this._type=v;Global.setTablePropertyValueById(this.id, 'type',v,this.table)}}
    private _unitId: number = 0;
public get unitId():number { return this._unitId; }public set unitId(v:number) {if(this._unitId != v){this._unitId=v;Global.setTablePropertyValueById(this.id, 'unitId',v,this.table)}}
    private _rewardType: number = 0;
public get rewardType():number { return this._rewardType; }public set rewardType(v:number) {if(this._rewardType != v){this._rewardType=v;Global.setTablePropertyValueById(this.id, 'rewardType',v,this.table)}}
    private _reward: string = '';
public get reward():string { return this._reward; }public set reward(v:string) {if(this._reward != v){this._reward=v;Global.setTablePropertyValueById(this.id, 'reward',v,this.table)}}
    private _grouping: number = 0;
public get grouping():number { return this._grouping; }public set grouping(v:number) {if(this._grouping != v){this._grouping=v;Global.setTablePropertyValueById(this.id, 'grouping',v,this.table)}}
    private _lastModified: string = '';
public get lastModified():string { return this._lastModified; }public set lastModified(v:string) {if(this._lastModified != v){this._lastModified=v;Global.setTablePropertyValueById(this.id, 'lastModified',v,this.table)}}
    private _text: string = '';
public get text():string { return this._text; }public set text(v:string) {if(this._text != v){this._text=v;Global.setTablePropertyValueById(this.id, 'text',v,this.table)}}
    private _deleted: boolean = false;
public get deleted():boolean { return this._deleted; }public set deleted(v:boolean) {if(this._deleted != v){this._deleted=v;Global.setTablePropertyValueById(this.id, 'deleted',v,this.table)}}
    private _version: number = 0;
public get version():number { return this._version; }public set version(v:number) {if(this._version != v){this._version=v;Global.setTablePropertyValueById(this.id, 'version',v,this.table)}}
    private _loginid: string = '';
public get loginid():string { return this._loginid; }public set loginid(v:string) {if(this._loginid != v){this._loginid=v;Global.setTablePropertyValueById(this.id, 'loginid',v,this.table)}}
    private _databaseId: number = 0;
public get databaseId():number { return this._databaseId; }public set databaseId(v:number) {if(this._databaseId != v){this._databaseId=v;Global.setTablePropertyValueById(this.id, 'databaseId',v,this.table)}}
    private _appId: number = 0;
public get appId():number { return this._appId; }public set appId(v:number) {if(this._appId != v){this._appId=v;Global.setTablePropertyValueById(this.id, 'appId',v,this.table)}}
    private _appUniqueId: string = '';
public get appUniqueId():string { return this._appUniqueId; }public set appUniqueId(v:string) {if(this._appUniqueId != v){this._appUniqueId=v;Global.setTablePropertyValueById(this.id, 'appUniqueId',v,this.table)}}
    private _unitUniqueId: string = '';
public get unitUniqueId():string { return this._unitUniqueId; }public set unitUniqueId(v:string) {if(this._unitUniqueId != v){this._unitUniqueId=v;Global.setTablePropertyValueById(this.id, 'unitUniqueId',v,this.table)}}
    private _uniqueId: string = '';
public get uniqueId():string { return this._uniqueId; }public set uniqueId(v:string) {if(this._uniqueId != v){this._uniqueId=v;Global.setTablePropertyValueById(this.id, 'uniqueId',v,this.table)}}

}
