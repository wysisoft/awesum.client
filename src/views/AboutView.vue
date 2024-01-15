<script lang="ts">

export default {

}
</script>

<template>
  <div id="AboutView">
    {{ $t(resources.About.key)  }}
  </div>
</template>

<style scoped>
#AboutView{
  display:flex;
  flex-direction:column;
  height: 100%;
}
</style>