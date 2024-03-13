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
  <div id="spellingUnitView">
    <h2>{{ awesum.currentDatabaseUnit.name }}</h2>
    <div v-for="item in awesum.currentDatabaseItems" class="listItem">
      <router-link
        :to="'/' + $t(resources.Apps.key) + '/' + awesum.currentServerApp.name + '/' + awesum.currentDatabase.name + '/' + $t(resources.Spelling.key) + '/' + awesum.currentDatabaseUnit.name + '/' + item.order "
        class="btn btn-primary">{{ $t(resources.Lets_Go.key) }}</router-link>
      <div class="unitName">{{ item.order }}</div>
    </div>
  </div>
</template>
  
<style scoped>
#spellingUnitView {
  padding: 1vmin;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: start;
}

.unitName{
  margin-left:2vmin;
  display: inline-block;
}
</style>