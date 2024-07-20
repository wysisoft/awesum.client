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
      <h2>Log Out</h2>
      <p>
        <button class="btn btn-primary" @click="logOut()" id="loginViewLogoutButton">Log Out</button>
      </p>
      <h2>Pairings</h2>
      

      

     




      
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