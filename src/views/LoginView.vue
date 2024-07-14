<script lang="ts">
import { resources } from '@/resources/Resources';
import QRCodeVue3 from '@/qrcode-vue3/QRCodeVue3.vue';


import { reactive, ref, watchEffect } from 'vue';

import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
import type { ServerAddFollowRequestResponse } from '@/serverClasses/ServerAddFollowRequestResponse';
import type { ServerGetCurrentUserInfoResponse } from '@/serverClasses/ServerGetCurrentUserInfoResponse';
import { Global } from '@/global';

export default {
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
    QRCodeVue3
  },
  setup() {
    Global.awesum.startProgressPar();

    let leaderCode = ref('');

    return {
      resources,
      leaderCode
    };
  },
  async beforeCreate() {
    var response = await fetch(window.location.origin + "/GetCurrentUserInfo?Name=" + this.awesum.serverApp.name, {
      credentials: "include",
    });

    var response = await fetch(window.location.origin + "/GetCurrentUserInfo", {
      method: "POST",
      headers:new Headers({'content-type':'application/json'}),
      body: JSON.stringify(Global.toPOJO(Global.awesum.serverApp)),
      credentials: "include",
    }) as Response;

    if (response.status == 200) {
      var responseObj = await response.json() as ServerGetCurrentUserInfoResponse;

      if (responseObj.email) {
        this.awesum.serverApp.manualId = responseObj.manualId;
        this.awesum.serverApp.email = responseObj.email;
        this.awesum.serverApp.id = responseObj.id;
        this.awesum.clientApp.authenticationType = responseObj.authenticationType;
        this.awesum.clientApp.email = responseObj.email;

        await Global.waitForDexie();
      }
    }

    const qrCodeValue = ref('');

    this.awesum.stopProgressPar();
  },

  methods: {
    async addPairing() {

    },
    onCameraReady(){

    },
    onDetect(detectedCodes: any) {
    },
    loginViewAddPairingButtonClicked() {
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
    async logOut() {
      this.awesum.clientApp.authenticationType = '';
      this.awesum.clientApp.email = '';
      await Global.waitForDexie();

      var response = await fetch("https://awesum.app/Logout", {
        credentials: "include",
      });

      if (response.status == 200) {

      }
      else {

      }
    },
  },
};

</script>

<template>
  <div id="loginView">
    <div v-if="awesum.clientApp.email" id="loginViewLoggedInContent">
      <h1>Log Out:</h1>
      <p>
        <button @click="logOut()" id="loginViewLogoutButton">Log Out</button>
      </p>
      <h1>Pairings:</h1>
      <p>
        <button data-bs-toggle="modal" data-bs-target="#addPairingModal" class="btn btn-primary"
        id="loginViewAddPairingButton" type="button" @click="loginViewAddPairingButtonClicked">{{
          $t(resources.Add_Pairing.key) }}</button>

<div>Followers can scan this barcode to begin following you</div>

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
<div>Followers can also enter this manual code to begin following you</div>
<div>{{ awesum.serverApp.manualId }}</div>
      </p>

      

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




      
    </div>
    <div v-else>
      <span>Choose a login provider below:</span>
      <form action="https://awesum.app/Google" method="get">
        <button>Google</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
#loginView {
  padding:1vmin;
}
:deep(.QRCodeVue3) img {
  border:.1vmin solid black;
  width:30vmin;
}
</style>