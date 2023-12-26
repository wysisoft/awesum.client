<script lang="ts">
import { Global } from '@/global';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { ref, toRaw } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers, email } from '@vuelidate/validators'
import { I18nGlobal } from '@/i18nGlobal';
import { CustomValidators } from '@/customValidators';
import { resources } from '@/resources/Resources';



export default {
  validations: {
    name: {
      required: helpers.withMessage(I18nGlobal.t(resources.Required.key), required),
    }
  },
  setup() {
    let name = ref('');
    let v$ = useVuelidate();
    return {
      name, v$
    };
  },
  methods: {
    async onSubmit() {

      var result = await this.v$.$validate();

      if (result) {
        this.awesum.serverApp.name = this.name;
        await this.awesum.clientApp.waitFor();

        this.awesum.buttonPressed = true;

        this.$router.push({
          path: '/' + this.$t(this.resources.Login.key)
        });
      }
    }
  },
};

</script>

<template>
  <div id="gettingStartedDiv">
    <form @submit.prevent="onSubmit()" class="needs-validation" id="form">
      <div>
        <label for="name" class="form-label">User Name:</label>
        <input v-model="name" id="name" :class="v$.name.$error ? 'is-invalid' : ''" type="text"
          class="form-control">
        <div v-for="err in v$.name.$errors" class="invalid-feedback">
          {{ err.$message }}
        </div>
      </div>
        <button class="btn btn-primary" id="submitButton" type="submit">Submit form</button>
    </form>
  </div>
</template>

<style scoped>
#gettingStartedDiv {
  display: flex;
  align-items: start;
  justify-content: center;
  height: 100%;
  padding-top: 35vmin;
}

#form{
  width: 40vmin;
}

#submitButton {
  margin-top: 1.5vmin;
}

</style>