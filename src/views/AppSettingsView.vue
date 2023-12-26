<script lang="ts">
import { AwesumDb } from '@/awesumDb';
import { Global } from '@/global';
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength,helpers,email } from '@vuelidate/validators'
import { CustomValidators } from '@/customValidators';



export default {
  validations: {
  	name: {
    	required:helpers.withMessage('Name is required',required),
      minLength: helpers.withMessage('Name must be at least 3 characters',minLength(3)),
      email: helpers.withMessage('Email is required',email),
    }
  },
  setup() {
    let name = ref('');
    let v$ = useVuelidate();
    return { name, v$};

  },
  
  async beforeCreate() {
  },
  mounted() {
  },
  methods: {
    async onSubmit() {
      const result = await this.v$.$validate()
      debugger;
      
      if (!result) {
        // notify user form is invalid
        return
      }
      // perform async actions
    },
  },
};

</script>

<template>
  <div id="appSettingsView" style="padding:2vmin;">
    <form ref="form" @submit.prevent="onSubmit()" class="row g-3 needs-validation">
      <div class="col-md-3">
        <label for="name" class="form-label">Zip</label>
        <input v-model="name" name="validationCustom05" :class="v$.name.$error ? 'is-invalid':''" type="text" class="form-control">
        <div v-for="err in v$.name.$errors" class="invalid-feedback">
          {{ err.$message }}
        </div>
      </div>

      <div class="col-12">
        <button class="btn btn-primary" type="submit">Submit form</button>
      </div>
    </form>
  </div>
</template>
<style scoped></style>