<script lang="ts">
export default {

}
</script>

<template>
  <div id="spellingDiv">
    <h2>{{ $t(resources.Spelling.key) }}</h2>

    <button class="btn btn-primary" v-on:click="addUnit()" >{{ $t(resources.Add_Unit.key) }}</button>


    <div v-for="unit in awesum.currentDatabaseUnits" style="display:flex;align-items: baseline;">
      <router-link
        :to="'/' + $t(resources.Apps.key) + '/' + awesum.currentServerApp.name + '/' + awesum.currentDatabase.name + '/' + $t(resources.Spelling.key) + '/' + unit.name"
        class="btn btn-primary">{{ $t(resources.Edit.key) }}</router-link>
      <div class="areaNameDiv" style="margin-left:2vmin;">{{ unit.name }}</div>
    </div>
  </div>
</template>
  
<style scoped>
#spellingDiv {
  padding: 1vmin;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: start;
}
</style>