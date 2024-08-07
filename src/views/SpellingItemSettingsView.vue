<script lang="ts">
import { ref } from 'vue';
import { Global } from '@/global';
import type { ServerDatabaseItem } from '@/serverClasses/ServerDatabaseItem';
import { from as linq } from "linq-to-typescript"
import { v4 as uuid } from 'uuid';

export default {
  setup() {
    let showModal = ref(false);
    let currentItem = ref({} as ServerDatabaseItem);


    return {
      showModal,
      currentItem,
      Global
    }
  },
  methods: {
    async addUnit() {
      var maxId = Global.awesum.currentDatabaseItems.length == 0 ? 0 : linq(Global.awesum.currentDatabaseItems).max((databaseItem: ServerDatabaseItem) => databaseItem.id);
      var maxOrder = Global.awesum.currentDatabaseItems.length == 0 ? 0 : linq(Global.awesum.currentDatabaseItems).max((databaseItem: ServerDatabaseItem) => databaseItem.order);

      await Global.awesumDb.serverDatabaseItems.add({
        id: maxId + 1,
        order: maxOrder + 1,
        databaseId: 1,
        uniqueId: uuid(),
        lastModified: new Date().toISOString(),
        deleted: false,
        version: 0,
        loginid: '',
        appId: Global.awesum.serverApp.id,
        appUniqueId: Global.awesum.serverApp.uniqueId,
        unitId: Global.awesum.currentDatabaseUnit.id,
        letters: 'a,b,c,d,e\nr,w,c,k,v\ni,a,e,o,u\nc,w,t,y,g\nc,k,l,m,n',
        sound: 'TTS',
        text: 'brick',
        type: Global.awesum.currentItemType.id,
        unitUniqueId: Global.awesum.currentDatabaseUnit.uniqueId,
        image: '',
        rewardType: 0,
        reward: '',
        grouping: 0
      });
    },
    async deleteUnit() {
      this.showModal = false;
      await Global.awesumDb.serverDatabaseItems.delete(this.currentItem.id);
    },
    showDeleteModal(unit: any) {
      this.currentItem = unit;
      this.showModal = true;
    }
  }
}
</script>

<template>
  <div class="pageView" style="background-image: none;background-color: inherit;">
    <h1>{{ awesum.currentDatabaseItem.text }}</h1>
    <div class="content">
      <EditTextComponent 
        :parentObject="awesum.currentDatabaseItem" :displayName="'Item Text'" :propertyName="'text'" />
    </div>
  </div>
</template>
