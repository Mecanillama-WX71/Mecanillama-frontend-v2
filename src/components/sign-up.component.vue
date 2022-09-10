<template>
<div class="m-3 my-8 flex flex-column align-items-center justify-content-center">
    <h1 class="text-center text-6xl">Sign up</h1>

    <div class="m-3 text-center">
        <div class="px-3">
            <span class="p-inputgroup-addon inline">
                <i class="pi pi-inbox"></i>
            </span>
            <pv-input-text placeholder="Email" class="pr-8" />
        </div>
    </div>

    <div class="m-3 text-center">
        <div class="px-3">
            <span class="p-inputgroup-addon inline">
                <i class="pi pi-user"></i>
            </span>
            <pv-input-text placeholder="Username" class="pr-8" type="text" />
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

    <div class="m-3 text-center">
        <div class="px-3">
            <span class="p-inputgroup-addon inline">
                <i class="pi pi-lock"></i>
            </span>
            <pv-input-text placeholder="Confirm your password" class="pr-8" type="password" />
        </div>
    </div>

    <div class="text-xl flex flex-column m-3">
        <div class="field-radiobutton w-full">
            <pv-radio-button id="option1" name="user" value="driver" v-model="user" />
            <label for="city1">I am a driver</label>
        </div>

        <div class="field-radiobutton w-full">
            <pv-radio-button id="option2" name="user" value="mechanic" v-model="user" />
            <label for="city1">I am a mechanic</label>
        </div>

    </div>
    <div class="button">
            <RouterLink to="/home-customer">
                <pv-button label = "Sign up" class = "p-button-rounded p-button-lg w-full" />
            </RouterLink>
    </div>
</div>
</template>

<script>
export default {    
    name: 'signup',
    data(){
        return{
            user:null
        }
    }
}
</script>

<style>

</style>