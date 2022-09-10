<template>
  <div>
    <menu-bar :model="navigation" class="bg-blue-200 flex">
      <template #start>
        <div class="flex">
          <div class="m-3">
            <RouterLink to="/home-customer">
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
              @click="handleSearch"
              class="border-round p-3 px-3 w-full"
              placeholder="Search that mechanic here..."
            />
          </div>
          <div
            class="
              flex
              align-items-center
              justify-content-center
              cursor-pointer
              profile
              text-center
            "
          >
            <menu-bar :model="accountMenu"></menu-bar>
            <pv-avatar
              image="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=128"
              class="mr-2"
              size="large"
              shape="circle"
            />
            <span>{{customerName}}</span>
          </div>
        </div>
      </template>
    </menu-bar>
  </div>
</template>

<script>
import { RouterLink, useRouter } from "vue-router";
import { CustomersApiService } from "../customer/services/customers.service";

const router = useRouter();
export default {
  name: "customer-header",
  data() {
    return {
      navigation: [
        { label: "Home", icon: "pi pi-fw pi-home", to: "/home-customer" },
        {
          label: "Appointments",
          icon: "pi pi-fw pi-calendar",
          to: "/appointments-customer",
        },
        { label: "Favourites", icon: "pi pi-fw pi-star", to: "/favourites" },
        {
          label: "Notifications",
          icon: "pi pi-fw pi-bell",
          to: "/notifications",
        },
      ],
      accountMenu: [
        {
          items: [
            {
              label: "Profile",
              to: "/customer-profile",
              icon: "pi pi-fw pi-user",
            },
            { label: "Sign out", to: "/", icon: "pi pi-fw pi-sign-out" },
          ],
        },
      ],
      customerUserService: null,
      customer: null,
      customerId: null,
      customerName: 'name'
    };
  },
  created() {
    this.customerUserService = new CustomersApiService();
    this.customerId = localStorage.getItem("user");
    console.log(this.customerId);
    
    this.customerUserService.getByUserId(this.customerId).then((response) => {
      
      this.customer = response.data;
      this.customerName = response.data.name;
      console.log(this.customer);
    });
  },
  methods: {
    handleSearch() {
      console.log(router);
      router.push("/home-customer");
    },
  },
};
</script>

<style>
.p-menubar-end {
  width: 100%;
}

.profile > div {
  padding: 0px;
  border: 0;
}
@media only screen and (max-width: 992px) {
  .p-menubar-start {
    width: 100% !important;
  }
  .search-input {
    display: none;
  }
}
</style>
