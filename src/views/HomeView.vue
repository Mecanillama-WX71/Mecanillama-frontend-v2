<template>
  <RouterView />
  <div class="home">
    <h1 class="mr-2">Mecanillama</h1>
    <p>The app for connecting driver and mechanic</p>
    <div class="buttons">
      <div class="button">
        <RouterLink to="/sign-up">
          <pv-button label="Sign up" class="p-button-rounded p-button-lg" />
        </RouterLink>
      </div>
      <div class="button">
        <RouterLink to="/sign-in">
          <pv-button label="Sign in" class="p-button-rounded p-button-lg" />
        </RouterLink>
      </div>
    </div>
    <div class="mb-3">
      <img
        style="
           {
            height: 360px;
            width: 640px;
          }
        "
        src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
        alt="man over a car"
      />
    </div>
  </div>
</template>


<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  name: "HomeView",
  components: {},
};
</script>

