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
  <div class="pageView">
    <div class="content">
      <h1>{{ awesum.currentServerApp.name }}</h1>

      <h2>{{ $t(resources.Databases.key) }}</h2>

      <div v-for="database in awesum.currentDatabases" class="listItem">
        <router-link :to="'/' + $t(resources.Apps.key) + '/' + awesum.serverApp.name + '/' + database.name"
          class="btn btn-primary">{{ $t(resources.Lets_Go.key) }}</router-link>
        <div class="areaNameDiv">{{ database.name }}</div>
      </div>
    </div>
  </div>
</template>
