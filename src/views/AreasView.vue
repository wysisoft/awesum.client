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
  <div id="areasView">
    <div  v-for="database in awesum.serverDatabases">
      <button type="button" class="btn btn-primary">{{ $t(resources.Lets_Go.key) }}</button>
      <div class="areaNameDiv">{{ database.name }}</div>
    </div>
  </div>
</template>