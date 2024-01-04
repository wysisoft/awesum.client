<script lang="ts">
export default {

}
</script>

<template>
        <div id="homeView">
                Awesum
        </div>
        <div v-for="app in awesum.serverApps" class="appDiv">
          <router-link :to="'/' + $t(resources.Apps.key) +'/' + app.name" class="btn btn-primary">
            <span>{{ $t(resources.Lets_Go.key) }}</span>
          </router-link>
          <span>{{ $t(app.name) }}</span>
          </div>
</template>
  
  