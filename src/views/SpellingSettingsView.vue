<script lang="ts">
import { ref } from 'vue';
import { Global } from '@/global';
import type { ServerDatabaseUnit } from '@/serverClasses/ServerDatabaseUnit';
import { from as linq } from "linq-to-typescript"
import { v4 as uuid } from 'uuid';


export default {
  setup() {
    let showModal = ref(false);
    let currentUnit = ref({} as ServerDatabaseUnit);


    return {
      showModal,
      currentUnit,
      Global
    }
  },
methods: {
    async addUnit(){
      var maxId = Global.awesum.currentDatabaseUnits.length == 0 ? 0 : linq(Global.awesum.currentDatabaseUnits).max((databaseUnit: ServerDatabaseUnit) => databaseUnit.id);
      var maxOrder = Global.awesum.currentDatabaseUnits.length == 0 ? 0 : linq(Global.awesum.currentDatabaseUnits).max((databaseUnit: ServerDatabaseUnit) => databaseUnit.order);

      await Global.awesumDb.serverDatabaseUnits.add({
                id: maxId+1,
                databaseTypeId: Global.awesum.currentItemType.id,
                name: "Unit " + (maxId+1),
                order: maxOrder+1,
                databaseId: 1,
                uniqueId: uuid(),
                lastModified: new Date().toISOString(),
                databaseTypeUniqueId: Global.awesum.currentItemType.uniqueId,
                deleted: false,
                version: 0,
                loginid: '',
                appId: Global.awesum.serverApp.id,
                appUniqueId: Global.awesum.serverApp.uniqueId,
            });
    },
    async deleteUnit(){
      this.showModal = false;
      await Global.awesumDb.serverDatabaseUnits.delete(this.currentUnit.id);
    },
    showDeleteModal(unit: any){
      this.currentUnit = unit;
      this.showModal = true;
    }
  }
}
</script>

<template>
  <div class="pageView" style="background-image: none;background-color: inherit;">
    <div class="content">

      <h1>{{ $t(resources.Spelling.key) }}</h1>

      <button class="btn btn-primary" v-on:click="addUnit()">{{ $t(resources.Add_Unit.key) }}</button>


      <div v-for="unit in awesum.currentDatabaseUnits" style="display:flex;align-items: baseline;">
        <router-link :to="Global.replaceAtFront('/' + $t(resources.Apps.key) + '/' + awesum.currentServerApp.name + '/' + awesum.currentDatabase.name + '/' + $t(resources.Spelling.key) + '/' + unit.name, '/' + $t(resources.Apps.key), '/' + $t(resources.Settings.key))" class="btn btn-primary">{{ $t(resources.Edit.key) }}</router-link>
      <button class="btn btn-primary" v-on:click="showDeleteModal(unit)">{{ $t(resources.Delete.key) }}</button>

      <div >{{ unit.name }}</div>
      </div>

      <Modal @hidden="showModal = false" :shown="showModal" :title="'Delete Unit'"
      :focusedElementId="'cancelButton'">
      <div class="modal-body">

        <span>Are you sure you want to delete unit {{ currentUnit.name }}</span>
      </div>
      <div class="modal-footer" style="justify-content:space-between">
        <button id="cancelButton" type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="cancelButton">Cancel</button>
        <button type="button" class="btn btn-primary" ref="submitButton"
          @click="deleteUnit">Submit</button>
      </div>
    </Modal>

    </div>
  </div>
</template>

<style scoped>
#spellingDiv {
  padding: 1vmin;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: start;
}
</style>