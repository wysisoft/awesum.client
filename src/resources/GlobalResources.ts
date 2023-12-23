import type { ResourceValue } from "./ResourceValue";

export class GlobalResources {
    static addKeysToResources(resourcesInternal: object) {
      const keys = Object.keys(resourcesInternal);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = (resourcesInternal as any)[key] as ResourceValue;
        value.key = "_" + key;
        (resourcesInternal as any)[value.key] = value.value;
      }
    }
  }