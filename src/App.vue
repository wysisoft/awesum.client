<script lang="ts">
import { useFullscreen } from '@vueuse/core'
import type { ServerDatabaseUnit } from './clientClasses/ServerDatabaseUnit';



export default {

  setup() {
    const { isFullscreen, toggle } = useFullscreen()
    return {
      isFullscreen,
      toggle
    };
  },
  methods: {
    toggleFullScreen() {
      this.toggle();
    },
    changeUnit(unit:ServerDatabaseUnit) {
      this.awesum.currentDatabaseUnit = unit;
      this.$router.push({ path: this.$t(this.resources.Spelling.key), query: { unit: unit.name } });
    }
  }
}

</script>

<template>
  <div id="appDiv">

    <!-- Modal -->
    <div class="modal fade" id="addPairingModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Spelling Units</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-for="unit in awesum.currentDatabaseUnits">
              <button data-bs-dismiss="modal" type="button" class="btn btn-primary" @click="changeUnit(unit as ServerDatabaseUnit)">{{ $t(resources.Lets_Go.key) }}</button>
              <div >{{ unit.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>




    <div v-if="awesum.buttonPressed && $router.currentRoute.value.name != 'Start' &&
      $router.currentRoute.value.name != 'Name'" id="appViewHeader" style="position:relative">
      <div id="appViewHeaderButtons">
        <router-link to="/" class="btn btn-link">
          <FaHouse />
          <span>{{ $t(resources.Home.key) }}</span>
        </router-link>
        <button class="btn btn-link" data-bs-toggle="modal" data-bs-target="#addPairingModal">
          <FaBars />
          <span>{{ $t(resources.Units.key) }}</span>
        </button>
        <router-link :to="{ path: $t(resources.Areas.key) }" class="btn btn-link">
          <FaPuzzlePiece />
          <span>{{ $t(resources.Areas.key) }}</span>
        </router-link>

        <button to="" class="btn btn-link" @click="toggleFullScreen">
          <faCompress v-if="isFullscreen" />
          <faExpand v-else />
          <span>{{ $t(resources.Fullscreen.key) }}</span>
        </button>
        <router-link to="/Settings" class="btn btn-link">
          <faGears />
          <span>{{ $t(resources.Settings.key) }}</span>
        </router-link>
        <div id="appViewLoginDiv">
          <router-link to="/Login" class="btn btn-link">
            <faUser />
            <div id="loginTextDiv">
              <span v-if="awesum.clientApp.email">{{ awesum.clientApp.email }}</span>
              <span v-else>Log In</span>
            </div>
          </router-link>
        </div>
      </div>
      <div v-if="awesum.progressBarPercentage > 0" class="progress"
        style="height: .5vmin;position:absolute;top:5.3vmin;width:100%">
        <div id="progressBar" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
          v-bind:aria-valuenow="awesum.progressBarPercentage" aria-valuemin="0" aria-valuemax="100"
          v-bind:style="'width:' + awesum.progressBarPercentage + '%'"></div>
      </div>

    </div>

    <div id="appViewContent">
      <Suspense>
        <RouterView :key="$route.path" />
      </Suspense>
    </div>
  </div>
</template>

<style scoped>
#appDiv {
  height: 100%;
  display: flex;
  flex-direction: column;
}


#appViewHeader {
  width: 100%;
  background: #ffffad;
  height: 5.9vmin;
  border-bottom: .1vmin solid #c2c2c2;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: start;

}

#appViewHeaderButtons {
  width: 100%;
  background: #ffffad;
  height: 5.9vmin;
  border-bottom: .1vmin solid #c2c2c2;
  display: flex;
  align-items: center;
  padding-left: .5vmin;
  padding-right: .5vmin;
}

#appViewHeader .btn {
  padding-top: .1vmin;
  padding-bottom: .1vmin;
  padding-left: .5vmin;
  padding-right: .5vmin;
  border-radius: .5vmin;
  margin-left: .5vmin;
  height: 4vmin;
}

#appViewHeader span {
  font-size: 1.3vmin;
  display: block;
}

#appViewHeader a,
#appViewHeader button {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  align-items: center;
  color: inherit
}

#appViewHeader a:hover,
#appViewHeader button:hover {
  color: inherit
}

#appViewHeader svg {
  cursor: pointer;
  color: black;
  font-size: 1.5vmin;
  margin-top: .25vmin;
  margin-bottom: .25vmin;
}

#appViewLoginDiv {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
}

#appViewContent {
  flex-grow: 1;
}

.appVueTopButton {
  width: 6.5vmin;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#appViewHeader>#homeButton {
  margin-left: 1vmin;
  margin-right: 1vmin;
}

#appViewHeader #appViewLoginIcon {
  margin-left: 0vmin;
  margin-right: 1vmin;
}

.img-qr {
  width: 20vmin;
  height: 20vmin;
}

#PairingsSpacingDiv {
  flex-grow: 1;
}

.areaNameDiv {
  display: inline-block
}

#appDiv .progress {
  border-radius: 0;
  position: relative;
}
</style>