<script lang="ts">
import { AwesumDb } from '@/awesumDb';
import { Global } from '@/global';
import { ref } from 'vue';
import * as Modal from '../components/Modal.vue';

export default {
  components: {
    Modal
  },
  setup() {
    const submitButton = null! as HTMLButtonElement;
    const cancelButton = null! as HTMLButtonElement;

    let resetEverythingValue = ref(0);
    let showModal = ref(false);

    return {
      resetEverythingValue,
      showModal,
      submitButton,
      cancelButton,
    };
  },
  async beforeCreate() {
  },
  mounted() {
    this.submitButton = (this.$refs.submitButton as HTMLButtonElement)!;
    this.cancelButton = (this.$refs.cancelButton as HTMLButtonElement)!;
  },

  methods: {

    async settingsDeleteAllServerDataButtonClicked() {
      var response = await fetch(window.location.origin + "/DeleteAllData?manualId=" + this.awesum.serverApp.manualId.toString(), {
        credentials: "include",
      });
    },
    settingsResetAllDataButtonClicked() {
      this.resetEverythingValue = 0;
      this.showModal = true;
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
  <div class="pageView" style="background-image: none;background-color: inherit;">
    <div class="content">
      <h1>{{ $t(resources.Settings.key) }}</h1>
      <div class="settingsArea">
        <div>Awesum Id: {{ awesum.serverApp.manualId == '' ? 'Log in and sync to receive ID' : awesum.serverApp.manualId
          }}</div>


      </div>

      <h2>{{ $t(resources.Apps.key) }}</h2>

      <div v-for="app in awesum.serverApps" class="serverApps listItem">
        <router-link :to="'/' + $t(resources.Settings.key) + '/' + app.name" class="btn btn-primary">Edit</router-link>
        <div class="areaNameDiv">{{ app.name }}</div>
      </div>

      <!-- <h2>Spelling Settings:</h2>
    <RouterLink :to="{ path: $t(resources.Type_Settings.key), query: { type: $t(resources.Spelling.key) } }">
      <button class="btn btn-primary" id="spellingDetails">{{ $t(resources.Go_To_Spelling_Settings.key) }}</button>
    </RouterLink> -->

      <Modal @hidden="showModal = false" :shown="showModal" :title="'Reset All Client Data'"
        :focusedElementId="'resetEverythingValueInput'">
        <div class="modal-body">

          <span>Are you sure you want to totally delete everything? If so, enter the result of 4 * 10 - 3 + 1</span>
          <br />
          <input type="number" v-model="resetEverythingValue" id="resetEverythingValueInput" />

        </div>
        <div class="modal-footer" style="justify-content:space-between">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="cancelButton">Cancel</button>
          <button type="button" class="btn btn-primary" v-if="resetEverythingValue == 38" ref="submitButton"
            @vue:mounted="submitButton!.focus()" @vue:unmounted="cancelButton.focus()"
            @click="resetEverything">Submit</button>
        </div>
      </Modal>

<h2>Reset All Client Data</h2>
<p>
  This button will reset your browser's awesum data. Any data that has not been synced back to the server will be lost.
</p>

      <button type="button" class="btn btn-primary" style="margin-bottom:1.25vmin" @click="settingsResetAllDataButtonClicked">
        Reset all client data
      </button>

      <h2>Reset All Server Data</h2>
<p>
  This button will delete all awesum data for <strong>{{ awesum.serverApp.email }}</strong> on the server. This action cannot be undone.
</p>

      <button type="button" class="btn btn-primary" style="margin-bottom:1.25vmin" data-bs-toggle="modal" data-bs-target="#exampleModal"
        @click="settingsDeleteAllServerDataButtonClicked">
        Delete all server data
      </button>
    </div>
  </div>
</template>
<style scoped>

</style>