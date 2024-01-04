<script lang="ts">
import { AwesumDb } from '@/awesumDb';
import { Global } from '@/global';
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength,helpers,email } from '@vuelidate/validators'
import { CustomValidators } from '@/customValidators';
import EditAudioComponent  from '@/components/EditAudioComponent.vue';


export default {
  components: {
    EditAudioComponent
  },
  setup() {

  },
  
  async beforeCreate() {
  },
  mounted() {
  },
  methods: {
  },
};

</script>

<template>
  <div id="appSettingsView" style="padding:2vmin;">
    <EditAudioComponent></EditAudioComponent>
  </div>
</template>
<style scoped></style>