<script lang="ts">
import { AwesumDb } from '@/awesumDb';
import { Global } from '@/global';
import { ref } from 'vue';

export default {
  setup() {
    let resetEverythingValue = ref(0);
    return {
      resetEverythingValue
    };
  },
  async beforeCreate() {
  },
  mounted() {

  },

  methods: {
    async settingsDeleteAllServerDataButtonClicked(){
      var response = await fetch(window.location.origin + "/DeleteAllData?manualId=" + this.awesum.serverApp.manualId.toString(), {
        credentials: "include",
      });

      if (response.status == 200) {
        Global.router.push({
          path: '/'
        });
      }
    },
    settingsResetAllDataButtonClicked() {
      this.resetEverythingValue = 0;
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

    

    <h1>App Settings:</h1>
    <div class="settingsArea">
      <div>App Id: {{ awesum.serverApp.manualId == '' ? 'Never synced to server' :  awesum.serverApp.manualId }}</div>

      
    </div>

    <h1>Databases:</h1>
    
    <div  v-for="database in awesum.serverDatabases" class="serverDatabases">
      <div class="areaNameDiv">{{ database.name }}</div>
      <router-link :to="'/' + database.name" class="btn btn-primary">Edit</router-link>
    </div>

    <h1>Spelling Settings:</h1>
    <RouterLink :to="{ path: $t(resources.Type_Settings.key), query: { type: $t(resources.Spelling.key) } }">
      <button class="btn btn-primary" id="spellingDetails">{{ $t(resources.Go_To_Spelling_Settings.key) }}</button>
    </RouterLink>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Reset Everything</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <span>Are you sure you want to totally delete everything? If so, enter the result of 4 * 10 - 3 + 1</span>
            <br />
            <input type="number" v-model="resetEverythingValue" />

          </div>
          <div class="modal-footer" style="justify-content:space-between">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" v-if="resetEverythingValue == 38"
              @click="resetEverything">Submit</button>
          </div>
        </div>
      </div>
    </div>

    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
        @click="settingsResetAllDataButtonClicked">
        Reset all client data
      </button>

      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
        @click="settingsDeleteAllServerDataButtonClicked">
        Delete all server data
      </button>

  </div>
</template>
<style scoped>
.serverDatabases{
  display:flex;
  align-items:baseline;
  width:100%;
  background:blue
  
}
</style>