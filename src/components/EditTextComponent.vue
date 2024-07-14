<script lang="ts">

import { Global } from '@/global';

import { ItemLevel } from '@/itemLevel';
import { getCurrentInstance, ref } from 'vue';
import { resources } from '@/resources/Resources';
import type { ServerDatabaseUnit } from './clientClasses/ServerDatabaseUnit';

import { useRouter } from 'vue-router';

export default {
  props: {
    requiresEditAndSave: Boolean,
    displayName: String,
    redirectUrlAfterSave: String,
    parentObject: Object,
    propertyName: String,
  },
  setup(props) {
    var currentInstance = getCurrentInstance();
    let propertyValue = ref(props.parentObject[props.propertyName]);
    let editing = ref(false);
    const router = useRouter();

    if (router.currentRoute.value.meta.itemLevel == ItemLevel.app) {
    }

    return {
      propertyValue,
      editing,
      Global
    };
  },
  async beforeCreate() {
  },
  async mounted() {

  },
  methods: {
    editButtonClicked(){
      this.editing = true;
    },
    async saveButtonClicked(){
      this.editing = false;
      this.$props.parentObject[this.$props.propertyName] = this.propertyValue;
      debugger;
      Global.awesum.currentDatabaseUnit.name = this.propertyValue;
      await Global.waitForDexie();
      
      if(this.$props.redirectUrlAfterSave){
        this.$router.push({
          path: this.$props.redirectUrlAfterSave + '/' + this.propertyValue
        });
      }      
    }
  },
};

</script>

<template>
  <div class="view">

    <div class="formRow">
      <div class="formLabel" style="display:flex;justify-content:space-between">{{ $props.displayName }}
        <div class="formLabelSelectDiv">

          <input v-if="!$props.requiresEditAndSave" type="text" class="form-control"
            v-model="$props.parentObject[$props.propertyName]" />
          <div class="input-group" v-if="$props.requiresEditAndSave">
            <input v-model="propertyValue" :readonly="!editing" type="text" class="form-control" placeholder="App Name"
              aria-label="App Name">
            <button class="btn btn-outline-secondary" style="margin:0vmin" type="button" @click="editButtonClicked" v-if="!editing">Edit</button>
            <button class="btn btn-outline-secondary" style="margin:0vmin" type="button" @click="saveButtonClicked" v-if="editing">Save</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss"></style>