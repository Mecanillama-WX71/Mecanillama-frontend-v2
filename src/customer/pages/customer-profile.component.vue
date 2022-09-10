<template>
    <customer-header-component></customer-header-component>
    <p>{{getUserName()}}</p>
</template>

<script>
import customerHeaderComponent from "../../components/customer-header.component.vue";
import AuthService from '../../security/services/auth.service.js'

export default {
  name: "customer-profile",
  components: {
    customerHeaderComponent,
  },
  methods: {
      getUserName(){
        const user=JSON.parse(AuthService.getCurrentUser());
        return user.email;
      }
  }
}

</script>

<style>

</style>