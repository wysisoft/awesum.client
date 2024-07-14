<script lang="ts">
import { AwesumDb } from '@/awesumDb';
import { Global } from '@/global';
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers, email } from '@vuelidate/validators'
import { CustomValidators } from '@/customValidators';
import EditAudioComponent from '@/components/EditAudioComponent.vue';
import EditTextComponent from '@/components/EditTextComponent.vue';
import { type ServerDatabase as ServerDatabaseInterface } from '@/serverClasses/ServerDatabase';
import * as Modal from '../components/Modal.vue';
import { v4 as uuid } from 'uuid';
import type { Table } from 'dexie';
import { from as linq } from "linq-to-typescript"


export default {
  components: {
    Modal,
    EditTextComponent
  },
  setup() {
    let showModal = ref(false);
    let currentDatabase = ref({} as ServerDatabaseInterface);

    return {
      showModal,
      currentDatabase,
      Global
    }
  },

  async beforeCreate() {
  },
  mounted() {
  },
  methods: {
    showDeleteModal(database: ServerDatabaseInterface) {
      this.currentDatabase = database;
      this.showModal = true;
    },
    async deleteDatabase() {
      this.showModal = false;
      await Global.awesumDb.serverDatabases.delete(this.currentDatabase.id);
    },
    async addDatabase() {
      var maxId = Global.awesum.currentDatabases.length == 0 ? 0 :linq(Global.awesum.currentDatabases).max((database: ServerDatabaseInterface) => database.id);
      var maxOrder = Global.awesum.currentDatabases.length == 0 ? 0 :linq(Global.awesum.currentDatabases).max((database: ServerDatabaseInterface) => database.order);
      await Global.awesumDb.serverDatabases.add({
        id: maxId + 1,
        name: 'Local' + (maxId + 1).toString(),
        uniqueId: uuid(),
        appId: Global.awesum.currentServerApp.id,
        lastModified: new Date().toISOString(),
        appUniqueId: this.awesum.currentServerApp.uniqueId,
        deleted: false,
        version: 0,
        order: maxOrder + 1,
        loginid: '',
        groupName: ''
      });
      this.awesum.currentDatabases.sort((a: ServerDatabaseInterface, b: ServerDatabaseInterface) => b.order - a.order);
    }
  },
};

</script>

<template>
  <div class="pageView" style="background-image: none;background-color: inherit;">
    <div class="content">
      <h1> {{ awesum.serverApp.name + " " + $t(resources.Settings.key) }}</h1>

    <EditTextComponent :requiresEditAndSave="true" :redirectUrlAfterSave="'/' + $t(resources.Settings.key)" :parentObject="awesum.serverApp" :displayName="'App Name'" :propertyName="'name'" />

    <div v-if="awesum.serverApp.uniqueId == awesum.clientApp.uniqueId">

      <button class="btn btn-primary" v-on:click="addDatabase()">{{ $t(resources.Add_Database.key) }}</button>
    </div>

    <div v-for="database in awesum.currentDatabases" class="listItem">
      <router-link
        :to="Global.replaceAtFront('/' + $t(resources.Apps.key) + '/' + awesum.serverApp.name + '/' + database.name, '/' + $t(resources.Apps.key), '/' + $t(resources.Settings.key))"
        class="btn btn-primary">{{ $t(resources.Edit.key) }}</router-link>
      <button class="btn btn-primary" v-on:click="showDeleteModal(database)">{{ $t(resources.Delete.key) }}</button>
      <div class="areaNameDiv">{{ database.name }}</div>
    </div>

    <Modal @hidden="showModal = false" :shown="showModal" :title="'Delete Database'" :focusedElementId="'cancelButton'">
      <div class="modal-body">

        <span>Are you sure you want to delete database {{ currentDatabase.name }}</span>
      </div>
      <div class="modal-footer" style="justify-content:space-between">
        <button id="cancelButton" type="button" class="btn btn-secondary" data-bs-dismiss="modal"
          ref="cancelButton">Cancel</button>
        <button type="button" class="btn btn-primary" ref="submitButton" @click="deleteDatabase">Submit</button>
      </div>
    </Modal>
  </div>

  </div>
</template>
<style scoped></style>