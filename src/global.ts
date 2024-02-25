import { createI18n, type I18n } from "vue-i18n";
import type { ResourceValue } from "./resources/ResourceValue";
import { resourcesEnGB } from "@/resources/Resources.en-GB";
import { resources } from "@/resources/Resources";
import type { TypeOnlyImportDeclaration } from "typescript";
import type { PromiseExtended, Table } from "dexie";
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
    static dexiePromises = Array<PromiseExtended<number>>();

    static toPOJO(complexObj: any) {
        const simpleObject = {} as any;
        Object.keys(complexObj).forEach(key => {
            const value = complexObj[key];
            if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                simpleObject[key.replace('_', '')] = value;
            }
            // Add any other simple type checks as needed
        });
        return simpleObject;
    }

    static async waitForDexie() {
        Promise.all(Global.dexiePromises);
        Global.dexiePromises = Array<PromiseExtended<number>>();
    }

    static setTablePropertyValueById(id: number, propName: string, value: any, table: Table) {
        var updateProp = {} as any;
        updateProp[propName] = value;
        Global.dexiePromises.push(Global.awesumDb.table(table.name).update(id, updateProp))
    }

    static setApp(app: ServerAppInterface) {
        Global.awesum.serverApp = app as ServerApp;
        Global.awesum.currentServerApp = app;
    }

    static replaceAtFront(originalString: string, searchString: string, replaceString: string) {
        // Create a regular expression that matches the searchString only at the beginning of the originalString
        const regex = new RegExp("^" + searchString);

        // Replace searchString with replaceString only if it is found at the beginning of originalString
        return originalString.replace(regex, replaceString);
    }
}