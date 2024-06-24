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
  <div id="settingsView" style="padding:2vmin;">



    <h2>Awesum Settings:</h2>
    <div class="settingsArea">
      <div>Awesum Id: {{ awesum.serverApp.manualId == '' ? 'Log in and sync to receive ID' : awesum.serverApp.manualId }}</div>


    </div>

    <h2>{{ $t(resources.Apps.key) }}</h2>

    <div v-for="app in awesum.serverApps" class="serverApps">
      <router-link :to="'/' + $t(resources.Settings.key) + '/' + app.name" class="btn btn-primary">Edit</router-link>
      <div class="areaNameDiv" style="margin-left:2vmin;">{{ app.name }}</div>
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

    <button type="button" class="btn btn-primary" @click="settingsResetAllDataButtonClicked">
      Reset all client data
    </button>

    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
      @click="settingsDeleteAllServerDataButtonClicked">
      Delete all server data
    </button>

  </div>
</template>
<style scoped>
.serverDatabases {
  display: flex;
  align-items: baseline;
  width: 100%;
}

.serverApps {
  display: flex;
  align-items: baseline;
  width: 100%;
}
</style>