<script lang="ts">
export default {

}
</script>

<template>
  <div>
    <div  v-for="unit in awesum.currentDatabaseUnits" style="display:flex;align-items: baseline;">
      <router-link :to="'/' + $t(resources.Apps.key) + '/' + awesum.currentServerApp.name + '/' + awesum.currentDatabase.name +'/' + $t(resources.Spelling.key) + '/' + unit.name" class="btn btn-primary">{{ $t(resources.Lets_Go.key) }}</router-link>
      <div class="areaNameDiv" style="margin-left:2vmin;">{{ unit.name }}</div>
    </div>
  </div>
  </template>
  
  