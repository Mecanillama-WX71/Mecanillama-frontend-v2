<template>
<customer-header-component></customer-header-component>
        <div>
            <div class="m-6">
                <pv-data-table
                    ref="dt"
                    v-model:selection="selectedJobOffers"
                    :value="appointments"
                    data-key="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rows-per-page-options="[5, 10, 15]"
                    current-page-report-template="Showing {first} to {last} of {totalRecords} appointments"
                    responsive-layout="scroll">
                <template #header>
                <div
                    class="table-header flex flex-column md:flex-row md:justify-content-between">
                    <h5 class="mb-2 md:m-0 p-as-md-center text-xl">
                    List of appointments
                    </h5>
                    <span class="p-input-icon-left"
                    ><i class="pi pi-search" />
                    <pv-input-text
                        v-model="filters['global'].value"
                        placeholder="Search..." />
                    </span>
                </div>
                </template>

                <pv-column
                field="mechanic"
                header="Mechanic"
                :sortable="true"
                :style="{ minWidth: `16rem` }"></pv-column>
                <pv-column
                field="date"
                header="Date"
                :sortable="true"
                :style="{ minWidth: `16rem` }">
                </pv-column>
                <pv-column
                field="time"
                header="Time"
                :sortable="true"
                :style="{ minWidth: `16rem` }">
                </pv-column>
                <pv-column
                field="status"
                header="Status"
                :sortable="true"
                :style="{ minWidth: `12rem` }">
                <template #body="slotProps">
                    <pv-tag
                    v-if="slotProps.data.status === 'Finished'"
                    severity="success"
                    >{{ slotProps.data.status }}</pv-tag
                    >
                    <pv-tag v-else severity="info">{{ slotProps.data.status }}</pv-tag>
                </template>
                </pv-column>

                </pv-data-table>
            </div>
        </div>
</template>

<script>

import customerHeaderComponent from "../../components/customer-header.component.vue"
import { AppointmentsApiService } from "../services/appointments.service"
import { FilterMatchMode } from "primevue/api";

export default {
    name: 'appointments-customer',
    components: {
        customerHeaderComponent
    },
    data(){
        return {
            appointments: [],
            appointment:{},
            selectedJobOffers: null,
            filters: {},
            statuses: [
            { label: "Finished", value: "finished" },
            { label: "Due", value: "due" },
            ],
            appointmentsService: null,
        }
    },

    created(){
        this.appointmentsService = new AppointmentsApiService();
        this.appointmentsService.getAll().then(response =>{
            this.appointments = response.data;
            this.appointments.forEach(appointment => this.getDisplayableAppointment(appointment));
        });
        this.initFilters();
    },

    methods: {
    getDisplayableAppointment(appointment) {
        appointment.status = appointment.finished
            ? this.statuses[0].label
            : this.statuses[1].label;
        appointment.date = appointment.date.slice(0,10);
        appointment.time = appointment.time;
        return appointment;
    },
    getStorableAppointment(displayableAppointment) {
      return {
        id: displayableAppointment.id,
        customer: displayableAppointment.customer,
        mechanic: displayableAppointment.mechanic,
        date: displayableAppointment.date,
        time: displayableAppointment.time,
        finished: displayableAppointment.status.label === "Finished",
      };
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
    findIndexById(id) {
      return this.appointment.findIndex(appointment => appointment.id === id);
    },
    initFilters() {
            this.filters = {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS }
            }
        }
    }

}
</script>

<style>

</style>