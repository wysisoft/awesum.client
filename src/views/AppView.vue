<script lang="ts">
import { Global } from '@/global';
import type { ServerDatabase } from '@/clientClasses/ServerDatabase';
import { reactive } from 'vue';


export default {
   async setup() {
  },
}
</script>

<template>
  <div id="areasView" style="padding:2vmin;">
    <div  v-for="database in awesum.currentDatabases" style="display:flex;align-items: baseline;">
      <router-link :to="'/' + $t(resources.Apps.key) + '/' + awesum.serverApp.name + '/' + database.name" class="btn btn-primary">{{ $t(resources.Lets_Go.key) }}</router-link>
      <div class="areaNameDiv" style="margin-left:2vmin;">{{ database.name }}</div>
    </div>
  </div>
</template>