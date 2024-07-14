<script lang="ts">
export default {

}
</script>

<template>
  <div class="pageView">
    <div class="content">
      <h1>{{ $t(resources.Spelling.key) }}</h1>
      <h2>{{ $t(resources.Units.key) }}</h2>
      <div v-for="unit in awesum.currentDatabaseUnits" class="listItem">
        <router-link
          :to="'/' + $t(resources.Apps.key) + '/' + awesum.currentServerApp.name + '/' + awesum.currentDatabase.name + '/' + $t(resources.Spelling.key) + '/' + unit.name"
          class="btn btn-primary">{{ $t(resources.Lets_Go.key) }}</router-link>
        <div class="areaNameDiv">{{ unit.name }}</div>
      </div>
    </div>
  </div>
</template>
