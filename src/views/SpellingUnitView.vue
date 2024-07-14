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

  <div class="pageView">
    <div class="content">
      <h1>{{ awesum.currentDatabaseUnit.name }}</h1>

      <h2>{{ $t(resources.Items.key) }}</h2>
      <div v-for="item in awesum.currentDatabaseItems" class="listItem">
        <router-link
          :to="'/' + $t(resources.Apps.key) + '/' + awesum.currentServerApp.name + '/' + awesum.currentDatabase.name + '/' + $t(resources.Spelling.key) + '/' + awesum.currentDatabaseUnit.name + '/' + item.order"
          class="btn btn-primary">{{ $t(resources.Lets_Go.key) }}</router-link>
        <div class="unitName">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>
