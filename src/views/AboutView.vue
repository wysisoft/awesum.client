<script lang="ts">

export default {

}
</script>

<template>
  <div id="AboutView">
    <h2>
    {{ $t(resources.About.key)  }}
  </h2>
  </div>
</template>

<style scoped>
#AboutView{
  padding:1vmin;
  display:flex;
  flex-direction:column;
  height: 100%;
}
</style>