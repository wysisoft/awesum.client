import { createI18n, type I18n } from "vue-i18n";
import type { ResourceValue } from "./resources/ResourceValue";
import { resourcesEnGB } from "@/resources/Resources.en-GB";
import { resources } from "@/resources/Resources";
import type { TypeOnlyImportDeclaration } from "typescript";
import type { Table } from "dexie";
import type { AwesumDb } from "./awesumDb";
import type { awesum } from "./awesum";
import type { Router, useRouter } from "vue-router";
import { helpers } from '@vuelidate/validators'
import type { ServerApp as ServerAppInterface } from "./serverClasses/ServerApp";
import { ServerApp } from "./clientClasses/ServerApp";


export class Global {

    static router: Router;
    static awesum: typeof awesum;
    static resources: typeof resources;
    static awesumDb: AwesumDb;
    static app: any;

    static async setTablePropertyValueById(id: number, propName: string, value: any, table: Table, promises: Array<Promise<void>>) {
        if (promises) {
            await Promise.all(promises);
        }
        var foundProp = await table.where('id').equals(id).first();
        if (foundProp) {
            (foundProp as any)[propName] = value;
            await table.put(foundProp);
        }
    }

    static setApp(app: ServerAppInterface) {
        Global.awesum.serverApp = new ServerApp(app, Global.awesumDb.serverApps);
        Global.awesum.currentServerApp = app;
    }

    static replaceAtFront(originalString, searchString, replaceString) {
        // Create a regular expression that matches the searchString only at the beginning of the originalString
        const regex = new RegExp("^" + searchString);
    
        // Replace searchString with replaceString only if it is found at the beginning of originalString
        return originalString.replace(regex, replaceString);
    }
}