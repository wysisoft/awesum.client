<script lang="ts">
import { AwesumDb } from '@/awesumDb';
import { Global } from '@/global';
import { ref } from 'vue';
import * as Modal from '../components/Modal.vue';
import type { ServerApp } from "@/serverClasses/ServerApp";
import { from as linq } from "linq-to-typescript"
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
import QRCodeVue3 from '@/qrcode-vue3/QRCodeVue3.vue';
import { resources } from '@/resources/Resources';
import type { ServerAddFollowRequestResponse } from '@/serverClasses/ServerAddFollowRequestResponse';

export default {
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
    QRCodeVue3,
    Modal
  },
  setup() {
    const submitButton = null! as HTMLButtonElement;
    const cancelButton = null! as HTMLButtonElement;

    let leaderCode = ref('');

    let resetEverythingValue = ref(0);
    let showModal = ref(false);
    let modalType = ref('client');


    return {
      resetEverythingValue,
      showModal,
      submitButton,
      cancelButton,
      modalType,
      leaderCode
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
      this.resetEverythingValue = 0;
      this.modalType = 'server';
      this.showModal = true;
    },
    settingsResetAllDataButtonClicked() {
      this.resetEverythingValue = 0;
      this.modalType = 'client';
      this.showModal = true;
    },
    async resetEverything() {
      if (this.modalType == 'server') {
        var response = await fetch(window.location.origin + "/DeleteAllData?manualId=" + this.awesum.serverApp.manualId.toString(), {
          credentials: "include",
        });

        if (response.status == 200) {
          Global.awesumDb.close();
          await Global.awesumDb.delete();
          Global.awesumDb = await AwesumDb.CreateAsync(this.awesum);
          window.location.href = '/'
        }
      }
      else {
        Global.awesumDb.close();
        await Global.awesumDb.delete();
        Global.awesumDb = await AwesumDb.CreateAsync(this.awesum);
        window.location.href = '/'
      }
    },
    async moveDown(app: ServerApp) {
      //change app order to one above it, one above it gets order of this one
      var prevApp = linq(this.awesum.serverApps).singleOrDefault((a: ServerApp) => a.order == app.order - 1);
      if (prevApp) {
        prevApp.order = app.order;
        app.order = app.order - 1;
      }

    },
    async moveUp(app: ServerApp) {
      //change app order to one below it, one below it gets order of this one
      var nextApp = linq(this.awesum.serverApps).singleOrDefault((a: ServerApp) => a.order == app.order + 1);
      if (nextApp) {
        nextApp.order = app.order;
        app.order = app.order + 1;
      }

    },
    loginViewAddPairingButtonClicked() {
    },
    onCameraReady(){

},
onDetect(detectedCodes: any) {
},

async submitFollowRequest() {
  var response = await fetch("https://awesum.app/AddFollowRequest?leaderId=" + this.leaderCode.toString(), {
    credentials: "include",
  });

  (this.$refs.modalCancel as HTMLButtonElement).click();

  if (response.status == 200) {
    var responseObj = await response.json() as ServerAddFollowRequestResponse;

  }
  else {
    this.awesum.errorMessage = await response.text();

    Global.router.push({
      path: '/' + this.$t(resources.Error.key)
    });
  }
},
    async Delete(app: ServerApp) {
      await Global.awesumDb.serverApps.delete(app.id);
    }
  }
};

</script>

<template>
  <div class="pageView" style="background-image: none;background-color: inherit;">
    <div class="content">
      <h1>{{ $t(resources.Settings.key) }}</h1>
      <div class="settingsArea">
        <div>Awesum Id: {{ awesum.serverApp.manualId == '' ? 'Log in and sync to receive ID' : awesum.serverApp.manualId
          }}</div>

<p v-if="awesum.clientApp.email">

<div>Awesum Barcode</div>

<div style="margin:1vmin;align-self:center;">
  <QRCodeVue3 
  :myclass="'QRCodeVue3'"
  :ButtonName="'asd'" 
  :imgclass="''" 
  :margin="0" 
  :background-options="{ color: '#ffffff' }" 
  :download-button="''" 
  :file-ext="''" 
  :image="''" 
  :download-options="{ name: 'vqr', extension: 'png' }"
  :width="200" 
  :height="200" 
  :value="awesum.serverApp.manualId"
  :key="awesum.serverApp.manualId" 
  :qr-options="{
      errorCorrectionLevel: 'H'
    }" 
    :image-options="{ hideBackgroundDots: true, imageSize: 0.4, margin: 10 }"
    :corners-square-options="{ type: 'dot', color: '#34495E' }" 
    :corners-dot-options="{
      type: undefined,
      color: '#41B883'
    }" 
    :dots-options="{
type: 'dots',
color: '#41B883',
gradient: {
type: 'linear',
rotation: 0,
colorStops: [
{ offset: 0, color: '#41B883' },
{ offset: 1, color: '#34495E' }
]
}
}" 
:download="false" />
</div>

      </p>

      </div>

      <h2>Your App</h2>
      <div v-for="app in awesum.serverApps.filter((o)=>{return o.uniqueId == awesum.clientApp.uniqueId})" class="serverApps listItem">
        <router-link :to="'/' + $t(resources.Settings.key) + '/' + app.name" class="btn btn-primary">Edit</router-link>
        <div class="areaNameDiv">{{ app.name }}</div>
      </div>

      <h2>{{ $t(resources.PairedApps.key) }}</h2>
      
      <button data-bs-toggle="modal" data-bs-target="#addPairingModal" class="btn btn-primary"
        id="loginViewAddPairingButton" type="button" @click="loginViewAddPairingButtonClicked">{{
          $t(resources.Add_Pairing.key) }}</button>

 <!-- Modal -->
 <div class="modal fade" id="addPairingModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Pair to Leader</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <FeCameraOff style="
    font-size: 11vmin;
    margin: auto;
    position: absolute;
    width: 40vmin;
    margin-top: 4vmin;
"/>

              <qrcode-stream @camera-on="onCameraReady" @detect="onDetect"></qrcode-stream>

              <div class="input-group">
                <label for="gettingStartedNameInput" class="input-group-text">Leader Code</label>
                <input id="gettingStartedNameInput" v-model="leaderCode" type="text" aria-label="First name"
                  class="form-control" placeholder="000-000-0000">
              </div>

            </div>
            <div class="modal-footer" style="justify-content:space-between">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="modalCancel">Cancel</button>
              <button type="button" class="btn btn-primary" v-on:click="submitFollowRequest">Submit</button>
            </div>
          </div>
        </div>
      </div>

      <div v-for="app in awesum.serverApps.filter((o)=>{return o.uniqueId != awesum.clientApp.uniqueId})" class="serverApps listItem">
        <router-link :to="'/' + $t(resources.Settings.key) + '/' + app.name" class="btn btn-primary">Edit</router-link>
        <button @click="moveDown(app)" v-if="app.order > 0" class="btn btn-primary">Move Down</button>
        <button @click="moveUp(app)" v-if="app.order < awesum.serverApps.length - 1" class="btn btn-primary">Move
          Up</button>
        <button @click="Delete(app)" v-if="app.uniqueId != awesum.clientApp.uniqueId"
          class="btn btn-primary">Delete</button>

        <div class="areaNameDiv">{{ app.name + " " + app.email }}</div>
      </div>

      <!-- <h2>Spelling Settings:</h2>
    <RouterLink :to="{ path: $t(resources.Type_Settings.key), query: { type: $t(resources.Spelling.key) } }">
      <button class="btn btn-primary" id="spellingDetails">{{ $t(resources.Go_To_Spelling_Settings.key) }}</button>
    </RouterLink> -->

      <Modal @hidden="showModal = false" :shown="showModal" :title="modalType == 'client' ? 'Reset All Client Data' : 'Reset All Server Data'"
        :focusedElementId="'resetEverythingValueInput'">
        <div class="modal-body">

          <span v-if="modalType=='client'">Are you sure you want to totally delete everything? If so, enter the result of 4 * 10 - 3 + 1</span>
          <span v-if="modalType=='server'">Are you sure you want to totally delete everything? If so, enter the result of 4 * 10 - 3 + 1</span>
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
        This button will reset your browser's awesum data. Any data that has not been synced back to the server will be
        lost.
      </p>

      <button type="button" class="btn btn-primary" style="margin-bottom:1.25vmin"
        @click="settingsResetAllDataButtonClicked">
        Reset all client data
      </button>

      <h2>Reset All Server Data</h2>
      <p>
        This button will delete all awesum data for <strong>{{ awesum.serverApp.email }}</strong> on the server. This
        action cannot be undone.
      </p>

      <button type="button" class="btn btn-primary" style="margin-bottom:1.25vmin" data-bs-toggle="modal"
        data-bs-target="#exampleModal" @click="settingsDeleteAllServerDataButtonClicked">
        Delete all server data
      </button>
    </div>
  </div>
</template>
<style scoped></style>