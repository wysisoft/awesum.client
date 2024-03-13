<script lang="ts">
import { ServerDatabaseType } from '@/clientClasses/ServerDatabaseType';
import { Global } from '@/global';
import type { ServerDatabase as ServerDatabaseInterface } from "@/serverClasses/ServerDatabase";
import { reactive } from 'vue';
import  { ItemType } from '@/itemType';

export default {
    setup() {
      return {
        ItemType
      }
  },
  methods: {
  }
}
</script>

<template>
  <div id="databaseView">
    <h2>{{ awesum.currentDatabase.name }}</h2>
    <div  v-for="typ in awesum.currentDatabaseTypes" class="listItem">
      <router-link :to="'/' + $t(resources.Apps.key) + '/' + awesum.serverApp.name + '/' + awesum.currentDatabase.name+ '/' + ItemType[typ.type]" class="btn btn-primary">{{ $t(resources.Lets_Go.key) }}</router-link>
      <div class="areaNameDiv" style="margin-left:2vmin;">{{ typ.type }}</div>
    </div>
  </div>
</template>
<style scoped>
#databaseView{
  padding:1vmin;
  display:flex;
  flex-direction:column;
  height: 100%;
  align-items: start;
}
</style>