<script lang="ts">

export default {

}
</script>

<template>
  <div id="homeView">
    <div id=content>
      <h1>{{ $t(resources.Awesum.key) }}</h1>

      <h2>{{ $t(resources.Apps.key) }}</h2>
      <div v-for="app in awesum.serverApps" class="listItem">
        <router-link :to="'/' + $t(resources.Apps.key) + '/' + app.name" class="btn btn-primary appButton">
          <span>{{ $t(resources.Lets_Go.key) }}</span>
        </router-link>
        <span>{{ app.name }}</span>
      </div>
    </div>
    <div class="footer">
      <router-link :to="'/' + $t(resources.About.key)" class="btn btn-primary appButton">
        <span>{{ $t(resources.About.key) }}</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
#homeView{
  display:flex;
  flex-direction:column;
  height: 100%;
  background-image: url("@/assets/images/home.jpg");
  background-color: rgba(255,255,255,0.7);
  background-blend-mode: lighten;
  background-size: contain;
}

.footer {
  height: 7vmin;
  display: flex;
  align-items: center;
  justify-content: center;
}

.appButton {
  margin-right: 2vmin;
}
#content{
  padding:1vmin;
  flex:1;
}
</style>