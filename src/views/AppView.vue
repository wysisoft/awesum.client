<script lang="ts">
import { Global } from '@/global';
import type { ServerDatabase } from '@/clientClasses/ServerDatabase';
import { reactive } from 'vue';


export default {
    setup() {
  },
}
</script>

<template>
  <div id="areasView">
    <h2>{{ awesum.currentServerApp.name }}</h2>
    <div  v-for="database in awesum.currentDatabases" class="listItem">
      <router-link :to="'/' + $t(resources.Apps.key) + '/' + awesum.serverApp.name + '/' + database.name" class="btn btn-primary">{{ $t(resources.Lets_Go.key) }}</router-link>
      <div class="areaNameDiv" style="margin-left:2vmin;">{{ database.name }}</div>
    </div>
  </div>
</template>
<style scoped>
#areasView{
  padding:1vmin;
  display:flex;
  flex-direction:column;
  height: 100%;
}
</style>