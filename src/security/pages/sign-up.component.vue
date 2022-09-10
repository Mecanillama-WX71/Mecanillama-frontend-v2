<template>
    <div class="grid min-h-screen mr-0">
        <div class="col-12 md:col-6 p-0">
            <img class="w-full h-full"
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=980"
                alt="man diriving a car">
        </div>
        <div class="col-12 md:col-6 p-0 flex justify-content-center">
            <div class="flex flex-column align-items-center justify-content-center" style="max-width: 26rem;">
                <h1 class="text-center text-6xl my-7 font-bold">Join us!</h1>

                <form @submit.prevent="submit">
                    <div class="m-3 text-center">
                        <div class="px-3">
                            <span class="p-float-label">
                                <pv-input-text v-model="name"></pv-input-text>
                                <label for="name">Name</label>
                            </span>
                        </div>
                    </div>

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
                        <div class="px-3">
                            <span class="p-float-label">
                                <pv-dropdown required v-model="role" :options="roles" optionLabel="name"
                                    placeholder="Select a Role"></pv-dropdown>
                            </span>
                        </div>
                    </div>


                    <div class="button w-full text-center my-5">
                        <pv-button type="submit" class="w-full" label="Sign Up"></pv-button>
                    </div>
                </form>
                <div>
                    <span>Already have an account? </span>
                    <a href="/sign-in" class="font-semibold">Sign in!</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AuthenticationApiService from '../../security/services/auth.service.js'

export default {
    name: 'sign-up',
    data: () => {
        return {
            name: null,
            email: null,
            password: null,
            role: null,
            errors: [],
            roles: [
                { name: 'Mechanic', value: 'mechanic' },
                { name: 'Customer', value: 'customer' },
            ],
            uid: null
        };
    },

    methods: {
        async signUpUser(newUser) {
            await AuthenticationApiService.signUp(newUser)
                .then((response) => {
                    console.log(response.data.user)
                })
                .catch((error) => {
                    this.errors.push(error);
                });
        },

        async signInUser(createdUser) {
            const response = await AuthenticationApiService.signIn(createdUser);
            if (response.data.token) {
                console.log(response.data);
                const newresponse = await AuthenticationApiService.mostrar(
                    response.data.token
                );
                console.log(newresponse);
                localStorage.setItem("user", JSON.stringify(response.data.id));
                console.log(localStorage.getItem('user'));
                const newCreated = this.createBoth(this.name, parseInt(localStorage.getItem('user')));
                if (response.data.role === "customer") {
                    const createdResponse = await AuthenticationApiService.postCustomer(newCreated);
                    console.log(createdResponse);
                    this.$router.push("/home-customer");
                }
                if (response.data.role === "mechanic") {
                    const createdResponse = await AuthenticationApiService.postMechanic(newCreated);
                    console.log(createdResponse);
                    this.$router.push("/mechanic-admin/home");
                }
            }
        },

        createUser() {
            return {
                name: this.name,
                email: this.email,
                password: this.password,
                role: this.role.value,
            };
        },

        createdUser() {
            return {
                email: this.email,
                password: this.password,
            };
        },

        //create customer
        createBoth(name, userId) {
            return {
                name,
                userId
            };
        },

        async submit() {
            const newUser = this.createUser();
            await this.signUpUser(JSON.stringify(newUser));
            const createdUser = this.createdUser();
            await this.signInUser(JSON.stringify(createdUser));
            this.resetForm();
        },

        resetForm() {
            this.name = null;
            this.email = null;
            this.password = null;
            this.role = null;
        },
    },
};
</script>

<style>
.grid {
    grid-gap: 0 !important;
}
</style>