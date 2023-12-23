<script lang="ts">
import { Global } from '@/global';
import { I18nGlobal } from '@/i18nGlobal';
import { resources } from '@/resources/Resources';

const props = {} as any;

props[I18nGlobal.t(resources.sourcePath.key)] = {
  type: String,
  required: false
}
props[I18nGlobal.t(resources.sourceQuery.key)] = {
  type: String,
  required: false
}

export default {
  // beforeCreate() {
  // },
  computed: {
    _sourceQuery() {
      return this[I18nGlobal.t(resources.sourceQuery.key)];
    },
    _sourcePath() {
      return this[I18nGlobal.t(resources.sourcePath.key)];
    },
  },
  props,
  methods: {
    buttonClicked() {
      this.awesum.buttonPressed = true;

      var sourcePath = this._sourcePath;
      if (sourcePath === null || sourcePath === undefined || sourcePath === '') {
        sourcePath = '/';
      }

      var sourceQuery = this._sourceQuery;
      if (sourceQuery === null || sourceQuery === undefined || sourceQuery === '') {
        sourceQuery = '{}';
      }

      Global.router.push({
        path: sourcePath,
        query: JSON.parse(sourceQuery)
      });

    }
  }
}
</script>

<template>
  <div id="startView">
    <div @click="buttonClicked" id="startButton">
      <a href="#">{{ $t(resources.AWESUM.key) }}</a>
    </div>
  </div>
</template>

<style scoped>
#startView {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
}

#startButton {
  position: relative;
  top: -4vmin;
  display: inline-block;
  z-index: 9999;
  cursor: pointer;
}

#startButton a {
  color: white;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  font-size: 3.515625vmin;
  /* 36px */
  text-align: center;
  text-decoration: none;
  background-color: #FFA12B;
  display: block;
  position: relative;
  padding: 1.953125vmin 3.90625vmin;
  /* 20px 40px */


  text-shadow: 0vmin 0.09765625vmin 0vmin #000;
  /* 0px 1px 0px */
  filter: dropshadow(color=#000, offx=0vmin, offy=0.09765625vmin);

  -webkit-box-shadow: inset 0 0.09765625vmin 0 #FFE5C4, 0 0.9765625vmin 0 #915100;
  /* 0 1px 0, 0 10px 0 */
  -moz-box-shadow: inset 0 0.09765625vmin 0 #FFE5C4, 0 0.9765625vmin 0 #915100;
  box-shadow: inset 0 0.09765625vmin 0 #FFE5C4, 0 0.9765625vmin 0 #915100;

  -webkit-border-radius: 0.48828125vmin;
  /* 5px */
  -moz-border-radius: 0.48828125vmin;
  border-radius: 0.48828125vmin;
}

#startButton a:active {
  top: 0.9765625vmin;
  /* 10px */
  background-color: #F78900;

  -webkit-box-shadow: inset 0 0.09765625vmin 0 #FFE5C4, inset 0 -0.29296875vmin 0 #915100;
  /* 0 1px 0, 0 -3px 0 */
  -moz-box-shadow: inset 0 0.09765625vmin 0 #FFE5C4, inset 0 -0.29296875vmin 0 #915100;
  box-shadow: inset 0 0.09765625vmin 0 #FFE5C4, inset 0 -0.29296875vmin 0 #915100;
}

#startButton:after {
  content: "";
  height: 100%;
  width: 100%;
  padding: 0.390625vmin;
  /* 4px */
  position: absolute;
  bottom: -1.46484375vmin;
  /* -15px */
  left: -0.390625vmin;
  /* -4px */
  z-index: -1;
  background-color: #2B1800;
  -webkit-border-radius: 0.48828125vmin;
  /* 
    /* Continuing from the last point */
  -moz-border-radius: 0.48828125vmin;
  /* 5px */
  border-radius: 0.48828125vmin;
}</style>