<script lang="ts">
import { AwesumDb } from '@/awesumDb';
import { Global } from '@/global';
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength,helpers,email } from '@vuelidate/validators'
import { CustomValidators } from '@/customValidators';
import EditAudioComponent  from '@/components/EditAudioComponent.vue';
import EditTextComponent  from '@/components/EditTextComponent.vue';
import { type ServerDatabase as ServerDatabaseInterface } from '@/serverClasses/ServerDatabase';
import * as Modal from '../components/Modal.vue';
import { v4 as uuid } from 'uuid';
import type { Table } from 'dexie';
import { from as linq } from "linq-to-typescript"
import { ItemType } from '@/itemType';
import type { ServerDatabaseType } from '@/serverClasses/ServerDatabaseType';



export default {
  components: {
    Modal,
    EditTextComponent
  },
  setup() {
    let showModal = ref(false);
    let currentType = ref({} as ServerDatabaseType);

    return {
      showModal,
      currentType,
      Global,
      ItemType
    }
  },
  
  async beforeCreate() {
  },
  mounted() {
  },
  methods: {
    showDeleteModal(typ:ServerDatabaseType){
      this.currentType = typ;
      this.showModal = true;
    },
    async deleteType(){
      this.showModal = false;
      await Global.awesumDb.serverDatabaseTypes.delete(this.currentType.id);
    },
    async addSpellingType(){
      var maxId = Global.awesum.currentDatabaseTypes.length == 0 ? 0 : linq(Global.awesum.currentDatabaseTypes).max((databaseType: ServerDatabaseType) => databaseType.id);
      var maxOrder = Global.awesum.currentDatabaseTypes.length == 0 ? 0 : linq(Global.awesum.currentDatabaseTypes).max((databaseType: ServerDatabaseType) => databaseType.order);

      await Global.awesumDb.serverDatabaseTypes.add({
        id: maxId+1,
        type: ItemType.spelling,
        databaseId: this.awesum.currentDatabase.id,
        lastModified: new Date().toISOString(),
        deleted: false,
        version: 0,
        order: maxOrder+1,
        loginid: '',
        groupName: ''
      });
    },
    async addReadingType(){
      var maxId = Global.awesum.currentDatabaseTypes.length == 0 ? 0 : linq(Global.awesum.currentDatabaseTypes).max((databaseType: ServerDatabaseType) => databaseType.id);
      var maxOrder = Global.awesum.currentDatabaseTypes.length == 0 ? 0 : linq(Global.awesum.currentDatabaseTypes).max((databaseType: ServerDatabaseType) => databaseType.order);

      await Global.awesumDb.serverDatabaseTypes.add({
        id: maxId+1,
        type: ItemType.reading,
        databaseId: this.awesum.currentDatabase.id,
        lastModified: new Date().toISOString(),
        deleted: false,
        version: 0,
        order: maxOrder+1,
        loginid: '',
        groupName: ''
      });
    },
  },
};

</script>

<template>
  <div class="pageView" style="background-image: none;background-color: inherit;">
    <h1> {{ awesum.currentDatabase.name + " " + $t(resources.Settings.key) }}</h1>

    <div class="content">

    <EditTextComponent :required="true" :requiresEditAndSave="true" :maxLength="100" :forbiddenChars="'/'"  :redirectUrlAfterSave="'/' + $t(resources.Settings.key) + '/' + awesum.currentServerApp.name + '/' " :parentObject="awesum.currentDatabase" :displayName="'Database Name'" :propertyName="'name'" />

    

    <h2>{{ awesum.currentDatabase.name }}</h2>
    <button v-if="Global.awesum.currentDatabaseTypes.length == 0 || Global.awesum.currentDatabaseTypes.filter((o:ServerDatabaseType)=>{return o.type == 1}).length == 0" class="btn btn-primary" v-on:click="addSpellingType()">{{ $t(resources.AddSpelling.key) }}</button>
    <button v-if="Global.awesum.currentDatabaseTypes.length == 0 || Global.awesum.currentDatabaseTypes.filter((o:ServerDatabaseType)=>{return o.type == 3}).length == 0" class="btn btn-primary" v-on:click="addReadingType()">{{ $t(resources.AddReading.key) }}</button>

    <div  v-for="typ in awesum.currentDatabaseTypes" class="listItem">
      <router-link :to="Global.replaceAtFront('/' + $t(resources.Apps.key) + '/' + awesum.serverApp.name + '/' + awesum.currentDatabase.name+ '/' + ItemType[typ.type], '/' + $t(resources.Apps.key), '/' + $t(resources.Settings.key))" class="btn btn-primary">{{ $t(resources.Edit.key) }}</router-link>
      <button class="btn btn-primary" v-on:click="showDeleteModal(typ)">{{ $t(resources.Delete.key) }}</button>

      <div class="areaNameDiv">{{ Global.capitalizeFirstLetter( ItemType[typ.type]) }}</div>
    </div>
    
    <Modal @hidden="showModal = false" :shown="showModal" :title="'Delete Database'"
      :focusedElementId="'cancelButton'">
      <div class="modal-body">

        <span>Are you sure you want to delete type {{ ItemType[currentType.type] }}</span>
      </div>
      <div class="modal-footer" style="justify-content:space-between">
        <button id="cancelButton" type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="cancelButton">Cancel</button>
        <button type="button" class="btn btn-primary" ref="submitButton"
          @click="deleteType">Submit</button>
      </div>
    </Modal>

  </div>
  </div>
</template>
<style scoped>

</style>