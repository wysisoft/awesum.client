<script lang="ts">
import { Global } from '@/global';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { ref, toRaw } from 'vue';

export default {
  setup() {

    let name = ref('');
    let validationMessage = ref('');
    return {
      name,
      validationMessage
    };
  },
  methods: {
    inputChanged() {

    },
    async saveUserName() {
      if (this.name.lc(this.$t(this.resources.Settings.key))) {
        this.validationMessage = this.$t(this.resources.Name_Cannot_Be_Settings.key);
      }
      else {
        this.awesum.serverApp.name = this.name;
        await this.awesum.clientApp.waitFor();
      }
      
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
        <input v-model="name" id="gettingStartedNameInput" type="text" aria-label="First name" class="form-control"
          placeholder="Bob Smith">
        <button class="btn btn-outline-secondary" type="button" :disabled="awesum.serverApp.name == ''"
          @click="saveUserName">{{ $t(resources.Save.key) }}</button>
        <div v-if="validationMessage">
          {{ validationMessage }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#gettingStartedView {
  display: flex;
  align-items: start;
  justify-content: center;
  height: 100%;
  padding-top: 45vmin;
}

#gettingStartedNameContainer {
  display: flex;
  align-items: flex-start;
  font-size: 3vmin;
}
</style>