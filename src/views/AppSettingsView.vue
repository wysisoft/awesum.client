<script lang="ts">
import { AwesumDb } from '@/awesumDb';
import { Global } from '@/global';
import { ref } from 'vue';

export default {
  setup() {
    let resetEverythingValue = ref(0);
    return {
      resetEverythingValue
    };
  },
  async beforeCreate() {
  },
  mounted() {

  },

  methods: {
    async settingsDeleteAllServerDataButtonClicked() {
      var response = await fetch(window.location.origin + "/DeleteAllData?manualId=" + this.awesum.serverApp.manualId.toString(), {
        credentials: "include",
      });
    },
    settingsResetAllDataButtonClicked() {
      this.resetEverythingValue = 0;
    },
    async resetEverything() {
      Global.awesumDb.close();
      await Global.awesumDb.delete();
      Global.awesumDb = await AwesumDb.CreateAsync(this.awesum);
      window.location.href = '/'
    }
  },
};

</script>

<template>
  <div id="settingsView" style="padding:2vmin;">

test

  </div>
</template>
<style scoped>
</style>