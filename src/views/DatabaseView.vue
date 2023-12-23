<script lang="ts">
import { Global } from '@/global';
import type { ServerDatabase } from '@/clientClasses/ServerDatabase';
import { reactive } from 'vue';


export default {
   async setup() {
  },
}
</script>

<template>
  <div id="databaseView">
    {{ awesum.errorMessage }}
  </div>
</template>