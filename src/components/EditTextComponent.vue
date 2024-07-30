<script lang="ts">

import { Global } from '@/global';

import { ItemLevel } from '@/itemLevel';
import { computed, getCurrentInstance, ref } from 'vue';
import { resources } from '@/resources/Resources';
import type { ServerDatabaseUnit } from './clientClasses/ServerDatabaseUnit';
import { GlobalConfig, useVuelidate } from '@vuelidate/core'
import { required, maxLength, helpers, email } from '@vuelidate/validators'
import { useRouter } from 'vue-router';
import { I18nGlobal } from '@/i18nGlobal';
import { CustomValidators } from '@/customValidators';
import { validatedValue } from '@/validatedValue';

export default {
  props: {
    requiresEditAndSave: Boolean,
    displayName: String,
    redirectUrlAfterSave: String,
    parentObject: Object,
    propertyName: String,
    maxLength: Number,
    forbiddenChars: String,
    required: Boolean,
    name: String
  },
  
  setup(props) {
    var currentInstance = getCurrentInstance();
    let propertyValue = ref(props.parentObject[props.propertyName]);
    let editing = ref(false);

    const router = useRouter();


    if (router.currentRoute.value.meta.itemLevel == ItemLevel.app) {
    }

    const propertyValueRules = {
      propertyValue: {} as validatedValue
    } as any;

    if (props.required) {
      propertyValueRules.propertyValue.required = helpers.withMessage(I18nGlobal.t(resources.Required.key), required)
    }
    if (props.maxLength) {
      var maxLengthMessage = I18nGlobal.t(resources.Must_be_less_than_.key) + props.maxLength.toString();
      propertyValueRules.propertyValue.maxLength = helpers.withMessage(maxLengthMessage, maxLength(props.maxLength))
    }
    if (props.forbiddenChars) {
      propertyValueRules.propertyValue.matchesRegex = helpers.withMessage(I18nGlobal.t(resources.Cannot_Contain_Slash.key), CustomValidators.matchesRegex(/^[^\/]*$/))
    }

    const v$ = useVuelidate(propertyValueRules, {propertyValue})

    return {
      propertyValue,
      editing,
      Global,
      v$
    };
  },
  async beforeCreate() {
  },
  async mounted() {

  },
  methods: {
    editButtonClicked() {
      this.editing = true;
    },
    cancelButtonClicked() {
      this.editing = false;
      this.propertyValue = this.$props.parentObject[this.$props.propertyName];
    },
    async saveButtonClicked() {

      var result = await this.v$.$validate();

      if (result) {

        this.editing = false;
        this.$props.parentObject[this.$props.propertyName] = this.propertyValue;
        await Global.waitForDexie();

        if (this.$props.redirectUrlAfterSave) {
          this.$router.push({
            path: this.$props.redirectUrlAfterSave + '/' + this.propertyValue
          });
        }
      }
    }
  },
};

</script>

<template>
  <div class="view">

    <div class="formRow">

      <div style="display:flex;justify-content:space-between">
        <label class="formLabel" :for="this.$props.name">{{ $props.displayName }}</label>
        <div style="width:60vmin;">
          <input :name="this.$props.name" v-if="!$props.requiresEditAndSave" type="text" class="form-control"
            v-model="$props.parentObject[$props.propertyName]" />
          <div class="input-group" v-if="$props.requiresEditAndSave">
            <input :name="this.$props.name" v-model="propertyValue" :readonly="!editing" type="text"
              class="form-control" placeholder="App Name" aria-label="App Name"
              :class="v$.propertyValue.$error ? 'is-invalid' : ''">
            <button class="btn btn-outline-secondary" style="margin:0vmin" type="button" @click="editButtonClicked"
              v-if="!editing">Edit</button>
              <button class="btn btn-outline-secondary" style="margin:0vmin" type="button" @click="cancelButtonClicked"
              v-if="editing">Cancel</button>
              <button class="btn btn-outline-secondary" style="margin:0vmin" type="button" @click="saveButtonClicked"
              v-if="editing">Save</button>

            
          </div>
          <div v-for="err in v$.propertyValue.$errors" class="invalid-feedback">
              {{ err.$message }}
            </div>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped lang="scss">
    .invalid-feedback {
        display: block;
}
</style>