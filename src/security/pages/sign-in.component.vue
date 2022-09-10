<template>
  <div class="grid min-h-screen mr-0">
    <div class="col-12 md:col-6 p-0">
      <img class="w-full h-full"
        src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=980"
        alt="man diriving a car" />
    </div>
    <div class="col-12 md:col-6 p-0 flex justify-content-center">
      <div class="flex flex-column align-items-center justify-content-center" style="max-width: 26rem">
        <h1 class="text-center text-6xl my-7 font-bold">Welcome again!</h1>

        <form @submit.prevent="login">
          <div class="m-3 text-center">
            <div class="px-3">
              <span class="p-float-label">
                <pv-input-text v-model="email"></pv-input-text>
                <label for="email">Email</label>
              </span>
            </div>
          </div>

          <div class="m-3 text-center">
            <div class="px-3">
              <span class="p-float-label">
                <pv-input-text type="password" v-model="password"></pv-input-text>
                <label for="password">Password</label>
              </span>
            </div>
          </div>
          <div class="m-3 text-center">
            <span class="font-semibold">Forgot password?</span>
          </div>

          <div class="button w-full text-center my-5">
            <pv-button type="submit" class="w-full" label="Sign In"></pv-button>
          </div>
        </form>
        <div>
          <span>Don't have an account? </span>
          <a href="/sign-up" class="font-semibold">Sign up!</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthenticationApiService from "../../security/services/authentication-api.service.js";
export default {
  name: "sign-in",
  data: () => {
    return {
      email: null,
      password: null,
    };
  },
  created() { },

  methods: {
    async login() {
      const response = await AuthenticationApiService.iniciar(
        this.email,
        this.password
      );
      if (response.data.token) {
        console.log(response.data);
        const newresponse = await AuthenticationApiService.mostrar(
          response.data.token
        );
        console.log(newresponse);
        localStorage.setItem("user", JSON.stringify(response.data.id));
        console.log(localStorage.getItem('user'));
        if (response.data.role === "customer") {
          this.$router.push("/home-customer");
        }
        if (response.data.role === "mechanic") {
          this.$router.push("/mechanic-admin/home");
        }
      }
    },
    async submit() {
      const userGiven = this.getUser();
      await AuthenticationApiService.signIn(JSON.stringify(userGiven))
        .then((response) => {
          //localStorage.setItem("user", JSON.stringify(response.data.user));
          // localStorage.setItem("accessToken",JSON.stringify(response.data.accessToken));
          this.goToComponent(response.data.userId);
          // const user=JSON.parse(AuthService.getCurrentUser());
          // console.log(user)
          if (user.role === "customer") {
            this.$router.push("/home-customer");
          }
          if (user.role === "mechanic") {
            this.$router.push("/mechanic-admin/home");
          }
          // console.log(userGiven.email)
        })
        .catch((error) => {
          if (error.request.status === 400) {
            alert("User does not exist");
          }
        });
    },
    getUser() {
      return {
        email: this.email,
        password: this.password,
      };
    },
    async goToComponent(userId) {
      let login = false;
      await MechanicsApiService.getByUserId(userId)
        .then((response) => {
          localStorage.setItem("mechanic", JSON.stringify(response.data.user));
          login = true;
          this.$router.push("/mechanic-admin/home");
        })
        .catch((e) => {
          console.log(e);
        });
      if (!login) {
        await CustomersApiService.getByUserId(userId)
          .then((response) => {
            localStorage.setItem(
              "customer",
              JSON.stringify(response.data.user)
            );
            login = true;
            this.$router.push("//home-customer");
          })
          .catch((e) => {
            console.log(e);
          });
      }

      if (!login) {
        alert("Wrong data!");
      }
    },
  },
};
</script>

<style>
.grid {
  grid-gap: 0 !important;
}
</style>