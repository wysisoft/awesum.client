<script lang="ts">

export default {
  setup() {
    return {
    }
  },
}
</script>

<template>
  <div id="errorView">
    <p>{{ awesum.errorMessage ? awesum.errorMessage : $t(resources.No_Error_Found.key) }}</p>
  </div>
</template>
