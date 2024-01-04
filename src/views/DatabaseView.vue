<script lang="ts">
import { Global } from '@/global';
import type { ServerDatabase as ServerDatabaseInterface } from "@/serverClasses/ServerDatabase";
import { reactive } from 'vue';


export default {
   async setup() {
  },
  methods: {
  }
}
</script>

<template>
  <div id="databaseView">
    <RouterLink :to="'/' + $t(resources.Apps.key) + '/' + awesum.currentServerApp.name + '/' + awesum.currentDatabase.name +'/' + $t(resources.Spelling.key)" class="btn btn-primary">{{ $t(resources.Spelling.key) }}</RouterLink>
  </div>
</template>