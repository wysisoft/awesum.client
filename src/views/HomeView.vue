<script lang="ts">
export default {

}
</script>

<template>
    <div id="homeView"
    :style="{ backgroundImage: (awesum.serverApp.homePageIcon ? 'url(' + awesum.serverApp.homePageIcon + ')' : ''), backgroundSize: (awesum.serverApp.homePageIcon ? 'cover' : '') }"
    >
    <div id="homePageContainer">
        <RouterLink :to="{ path: $t(resources.Spelling.key) }"><span>Spelling</span></RouterLink>
      </div>        
    </div>
  </template>
  
  