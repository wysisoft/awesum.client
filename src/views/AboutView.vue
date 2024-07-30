<script lang="ts">

export default {

}
</script>

<template>
  <div id="AboutView">
    <h1>About Awesum App</h1>
    <div class="content">

      <h2>
        What is the Awesum App?
      </h2>
      <p>Awesum app is a tool for kids that reinforces spelling and math with rewards. Teachers and parents can assign a
        kid assignments. Parents can monitor the completion of the assignments. It is a website located at
        https://awesum.app that can also run as an app installed from the app store.</p>
      <h2>
        Who am I?
      </h2>
      <p>I am a guy from Denver, CO USA with kids. I felt an app like this needed to exist.</p>
      <h2>
        Is my Data Safe?
      </h2>
      <p>The app runs on a server in Amazon AWS and is patched regularly. No one but me has access to user data. I don't
        look at user data, unless I have the users permission for troubleshooting. I do not store extremely sensitive
        data about my family on the app because that is bad use of the internet. I recommend you do not either.</p>
    </div>
  </div>
</template>

<style scoped>
#AboutView {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>