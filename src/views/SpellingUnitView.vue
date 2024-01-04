<script lang="ts">
import { Global } from '@/global';

export default {
  methods: {
    asd() {

    }
  }
}
</script>

<template>
  <div>
    <div v-for="item in awesum.currentDatabaseItems" style="display:flex;align-items: baseline;">
      <router-link
        :to="'/' + $t(resources.Apps.key) + '/' + awesum.currentServerApp.name + '/' + awesum.currentDatabase.name + '/' + $t(resources.Spelling.key) + '/' + awesum.currentDatabaseUnit.name + '/' + item.order "
        class="btn btn-primary">{{ $t(resources.Lets_Go.key) }}</router-link>
      <div class="areaNameDiv" style="margin-left:2vmin;">{{ item.order }}</div>
    </div>
  </div>
</template>
  
  