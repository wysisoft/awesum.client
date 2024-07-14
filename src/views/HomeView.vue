<script lang="ts">

export default {

}
</script>

<template>
  <div class="pageView">
    <div class=content>
      <h1>{{ $t(resources.Awesum.key) }}</h1>

      <h2>{{ $t(resources.Apps.key) }}</h2>
      <div id="serverAppsContainer">
      <div v-for="app in awesum.serverApps" class="listItem">
        <router-link :to="'/' + $t(resources.Apps.key) + '/' + app.name" class="btn btn-primary">
          <span>{{ $t(resources.Lets_Go.key) }}</span>
        </router-link>
        <span>{{ app.name }}</span>
      </div>
    </div>
    </div>
    <div class="footer">
      <router-link :to="'/' + $t(resources.About.key)" class="btn btn-primary">
        <span>{{ $t(resources.About.key) }}</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>

#serverAppsContainer{
  overflow: auto;
  height:70vmin;
}
</style>