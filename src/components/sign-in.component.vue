<template>
<div class="m-3 my-8 flex flex-column align-items-center justify-content-center">
    <h1 class="text-center text-6xl">Sign In</h1>
    <div class="m-3 text-center">
        <div class="px-3">
            <span class="p-inputgroup-addon inline">
                <i class="pi pi-user"></i>
            </span>
            <pv-input-text placeholder="Username" class="pr-8" />
        </div>
    </div>

        <div class="m-3 text-center">
        <div class="px-3">
            <span class="p-inputgroup-addon inline">
                <i class="pi pi-lock"></i>
            </span>
            <pv-input-text placeholder="Password" class="pr-8" type="password" />
        </div>
    </div>
<div class="text-xl flex flex-column m-3">
    <div class="field-radiobutton w-full">
        <pv-radio-button id="option1" name="user" value="home-customer" v-model="user" />
        <label for="city1">I am a driver</label>
    </div>
    <div class="field-radiobutton w-full">
            <pv-radio-button id="option2" name="user" value="home-mechanic" v-model="user" />
            <label for="city1">I am a mechanic</label>
    </div>
</div>
    <div class="button">
            <RouterLink to="/home-customer">
                <pv-button label = "Sign In" class = "p-button-rounded p-button-lg w-full" />
            </RouterLink>
    </div>
</div>
</template>

<script>
export default {    
    name: 'signin',
    data(){
        return{
            user:null,
            value:null
        }
    },
    methods: {
        
    }
}
</script>

<style>

</style>