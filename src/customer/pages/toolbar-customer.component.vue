<template>
    <header>
        <pv-toolbar class="bg-primary">
        <template #start>
            <pv-button class="p-button-text text-white" icon="pi pi-bars" ></pv-button>
            <h3>TEST</h3>
        </template>
        <template #end>
            <div class="flex-column">
                <pv-button class="p-button-text text-white" >Here is a button</pv-button>
            </div>
        </template>
        </pv-toolbar>
    </header>
</template>

<script>
export default {
    name: 'toolbarCustomer'
}
</script>

<style>

</style>