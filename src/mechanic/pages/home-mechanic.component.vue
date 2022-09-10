<template>
  <mechanic-header-component></mechanic-header-component>

  <div class="container">
    <div id="sup" class="container">
      <img
        src="https://images.unsplash.com/photo-1588993986550-6ae221c7146e?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=460"
      />
      <div>
        <span>
          <h1 class="mb-1">{{ mechanic.name }}</h1>
          <p class="m-1">
            {{ mechanic.description }}
          </p>
          <router-link to="">
            <pv-button id="button" label="Edit" />
          </router-link>
        </span>
      </div>
    </div>
    <div>
      <appointments-mechanic-component></appointments-mechanic-component>
    </div>
  </div>
</template>


<script>
import MechanicHeaderComponent from "../../components/mechanic-header.component.vue";
import appointmentsMechanicComponent from "../../appointments/pages/appointments-mechanic.component.vue";
import { MechanicsProfileApiService } from "../services/mechanics-api.service";
export default {
  name: "home-mechanic",
  components: {
    MechanicHeaderComponent,
    appointmentsMechanicComponent,
  },
  data() {
    return {
      mechanic: null,
      mechanicUserService: null,
      mechanicId: null,
    };
  },
  created() {
    this.mechanicUserService = new MechanicsProfileApiService();
    this.mechanicId = localStorage.getItem("user");
    console.log(this.mechanicId);
    this.mechanicUserService.getByUserId(this.mechanicId).then((response) => {
      console.log(response);
      this.mechanic = response.data;
    });
    
  },
};
</script>

<style>
#sup {
  display: flex;
  height: 300px;
  background: black;
  align-items: center;
}
#sup img {
  height: 95%;
  left: 10%;
  border-radius: 25px;
}
#sup div {
  display: flex;
  position: absolute;
  width: 30%;
  height: 100%;
  right: 5%;
  background: white;
  opacity: 80%;
  align-items: center;
  text-align: center;
}
#button {
  width: 70%;
}
</style>