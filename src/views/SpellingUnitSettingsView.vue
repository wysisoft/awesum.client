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
    async addUnit() {
      var maxId = Global.awesum.currentDatabaseUnits.length == 0 ? 0 : linq(Global.awesum.currentDatabaseUnits).max((databaseUnit: ServerDatabaseUnit) => databaseUnit.id);
      var maxOrder = Global.awesum.currentDatabaseTypes.length == 0 ? 0 : linq(Global.awesum.currentDatabaseUnits).max((databaseUnit: ServerDatabaseUnit) => databaseUnit.order);

      await Global.awesumDb.serverDatabaseUnits.add({
        id: maxId + 1,
        databaseTypeId: Global.awesum.currentItemType.id,
        name: "Unit " + (maxId + 1),
        order: maxOrder + 1,
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
    async deleteUnit() {
      this.showModal = false;
      await Global.awesumDb.serverDatabaseUnits.delete(this.currentUnit.id);
    },
    showDeleteModal(unit: any) {
      this.currentUnit = unit;
      this.showModal = true;
    }
  }
}
</script>

<template>
  <div class="pageView" style="background-image: none;background-color: inherit;">
    <h1>{{ awesum.currentDatabaseUnit.name }}</h1>

    <div class="content">

      <EditTextComponent :requiresEditAndSave="true"
        :redirectUrlAfterSave="'/' + $t(resources.Settings.key) + '/' + awesum.currentServerApp.name + '/' + awesum.currentDatabase.name + '/' + $t(resources.Spelling.key)"
        :parentObject="awesum.currentDatabaseUnit" :displayName="'Unit Name'" :propertyName="'name'" />

      <h2>{{ $t(resources.Items.key) }}</h2>
      <div v-for="item in awesum.currentDatabaseItems" class="listItem">
        <router-link :to="Global.replaceAtFront('/' + $t(resources.Apps.key) + '/' + awesum.currentServerApp.name + '/' + awesum.currentDatabase.name + '/' + $t(resources.Spelling.key) + '/' + awesum.currentDatabaseUnit.name+ '/' + item.order, '/' + $t(resources.Apps.key), '/' + $t(resources.Settings.key))" class="btn btn-primary">{{ $t(resources.Edit.key) }}</router-link>
      <button class="btn btn-primary" v-on:click="showDeleteModal(typ)">{{ $t(resources.Delete.key) }}</button>
        <div class="unitName">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>
