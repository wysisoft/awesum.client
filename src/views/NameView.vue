<script lang="ts">
import { Global } from '@/global';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { toRaw } from 'vue';

export default {
  setup(){

  },
  methods: {
    inputChanged() {

    },
    async saveUserName() {
      await this.awesum.clientApp.waitFor(); 
      this.awesum.buttonPressed = true;

      this.$router.push({
        path: '/' + this.$t(this.resources.Login.key)
      });
    }
  },
};

</script>

<template>
  <div id="gettingStartedView">
    <div id="gettingStartedNameContainer">
      <div class="input-group">
        <label for="gettingStartedNameInput" class="input-group-text">{{ $t(resources.UserNameColon.key) }}</label>
        <input v-model="awesum.serverApp.name"
        id="gettingStartedNameInput" type="text" aria-label="First name"
          class="form-control" placeholder="Bob Smith">
        <button class="btn btn-outline-secondary" type="button" :disabled="awesum.serverApp.name == ''"
          @click="saveUserName">{{ $t(resources.Save.key) }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#gettingStartedView{
    display: flex;
    align-items: start;
    justify-content: center;
    height: 100%;
    padding-top:45vmin;
  }

#gettingStartedNameContainer{
    display:flex;
    align-items: flex-start;
    font-size:3vmin;
  }

  
</style>