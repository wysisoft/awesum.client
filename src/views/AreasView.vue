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
  <div id="areasView" style="padding:2vmin;">
    <div  v-for="app in awesum.serverApps" style="display:flex;align-items: baseline;">
      <router-link :to="'/' + app.name" class="btn btn-primary">{{ $t(resources.Lets_Go.key) }}</router-link>
      <div class="areaNameDiv" style="margin-left:2vmin;">{{ app.name }}</div>
    </div>
  </div>
</template>