<template>
<div>
  <menu-bar :model="navigation" class="bg-blue-200 flex">
    <template #start>
        <div class = "flex">
            <div class="m-3">
                <RouterLink to="/home-mechanic">
                    <h1 class="font-bold">Mecanillama</h1>
                </RouterLink>
            </div>
        </div>
    </template>
    <template #end>
        <div class="flex">
        <div class="m-3 search-input w-full">
            <pv-input-text
                v-model="search"
                class="border-round p-3 px-3 w-full"
                placeholder="Search here..." />
        </div>    
            <div class="flex align-items-center justify-content-center cursor-pointer profile text-center">
                <menu-bar :model="accountMenu"></menu-bar>
                <pv-avatar image="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=128"  class="mr-2" size="large" shape="circle" />
                <span>Formula I</span>
            </div>
        </div>
    </template>
  </menu-bar>
  </div>
</template>

<script>

export default{
    name: 'mechanic-header',
    data(){
        return{
            navigation:[
                { label: "Home",icon:'pi pi-fw pi-home', to: "/home-customer" },
                { label: "Appointments", icon:'pi pi-fw pi-calendar',to: "/appointments-customer" },
                { label: "Notifications", icon:'pi pi-fw pi-bell', to: "/notifications" },
            ],
            accountMenu: [{
                items: [
                    { label: "Profile", to: "/customer-profile", icon: 'pi pi-fw pi-user'},
                    { label: "Sign out", to: "/", icon: 'pi pi-fw pi-sign-out' },
                ]
            }
            ]
        }
    },
    methods: {
        toggleMenu(){
            
        }
    }
}

</script>

<style>
.p-menubar-end{
    width:100%;
}

.profile > div{
    padding:0px;
    border:0;
}
@media only screen and (max-width: 992px) {
  .p-menubar-start{
      width: 100% !important;
  }
  .search-input{
      display:none;
  }
}
</style>
