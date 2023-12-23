import { resources } from '@/resources/Resources';
import type { awesum } from './awesum';


declare module 'vue' {
  interface ComponentCustomProperties {
    awesum: typeof awesum,
    resources: typeof resources
  }
}