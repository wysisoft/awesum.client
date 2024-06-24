<script lang="ts">

import { Global } from '@/global';

import { ItemLevel } from '@/itemLevel';
import { getCurrentInstance, ref } from 'vue';

import {useRouter} from 'vue-router';

export default {
  props: {
    displayName: String,
    parentObject: Object,
    propertyName: String,
  },
  setup(props) {
    var currentInstance = getCurrentInstance();
    let propertyValue = ref('');
    const router = useRouter();
    
    if(router.currentRoute.value.meta.itemLevel == ItemLevel.app){
    }

    return {
      propertyValue
    };
  },
  async beforeCreate() {
  },
  async mounted() {

  },
  methods: {

  },
};

</script>

<template>
  <div class="view">

    <div class="formRow">
      <div class="formLabel" style="display:flex;justify-content:space-between">{{$props.displayName}}
        <div class="formLabelSelectDiv">
          <input type="text" class="form-control" v-model="$props.parentObject[$props.propertyName]" />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss"></style>