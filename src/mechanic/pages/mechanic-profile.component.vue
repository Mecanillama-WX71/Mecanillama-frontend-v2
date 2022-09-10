<template>
  <customer-header-component></customer-header-component>
  <div class="m-6">
    <div class="grid">
      <div class="col text-center">
        <img
          class="text-center"
          src="https://images.unsplash.com/photo-1588993986550-6ae221c7146e?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=460"
          alt="car repair shop image"
        />
      </div>
      <div
        class="
          col
          text-center
          align-items-center
          flex flex-column
          main-description
        "
      >
        <h2 class="font-bold text-4xl">{{ selectedMechanic.name }}</h2>
        <span>
          <span class=""> <i class="pi pi-star-fill"></i></span>
          47 reviews
        </span>
        <p>{{ selectedMechanic.location }}</p>
        <p class="font-semibold">{{ selectedMechanic.phone }}</p>
        <pv-button @click="openNew">Make an appointment</pv-button>
      </div>

      <pv-dialog
        v-model:visible="appointmentDialog"
        :style="{ width: '450px' }"
        header="Make an appointment"
        :modal="true"
        class="p-fluid"
      >
        <div class="field mt-3">
          <div class="field">
            <label for="date">Date</label>
            <pv-calendar
              placeholder="Select a Date"
              id="date"
              v-model="appointment.date"
              :reduce="(availableTimes) => availableTimes.time"
              autocomplete="off"
              dateFormat="dd-mm-yy"
              :minDate="minDate"
            ></pv-calendar>
          </div>
        </div>

        <div class="field mt-3">
          <div class="field">
            <label for="time">Time</label>
            <pv-dropdown
              required
              id="time"
              v-model="appointment.time"
              :options="availableTimes"
              optionLabel="time"
              placeholder="Select a Time"
            ></pv-dropdown>
          </div>
        </div>

        <template #footer>
          <pv-button
            :label="'Cancel'.toUpperCase()"
            icon="pi pi-times"
            class="p-button-text"
            @click="hideDialog"
          />
          <pv-button
            :label="'Save'.toUpperCase()"
            icon="pi pi-check"
            class="p-button-text"
            @click="saveAppointment"
          />
        </template>
      </pv-dialog>
    </div>
    <div
      class="
        text-left
        bg-white
        flex flex-column
        about-section
        p-6
        m-3
        border-round
      "
    >
      <h2 class="font-semibold text-2xl">About</h2>
      <div>
        <p>
          {{ selectedMechanic.description }}
        </p>
      </div>
    </div>
    <div
      class="
        reviews-section
        text-left
        bg-white
        flex flex-column
        p-6
        m-3
        border-round
      "
    >
      <h2 class="font-semibold text-2xl">Reviews</h2>
      <div>
        <span class="font-semibold text-2xl p-3"> 4.5 </span>
        <span class="">
          <i class="pi pi-star-fill" style="font-size: 2rem"></i>
          <i class="pi pi-star-fill" style="font-size: 2rem"></i>
          <i class="pi pi-star-fill" style="font-size: 2rem"></i>
          <i class="pi pi-star-fill" style="font-size: 2rem"></i>
          <i class="pi pi-star-fill" style="font-size: 2rem"></i>
        </span>
      </div>
      <div class="flex flex-column">
        <ul style="list-style: none">
          <li v-for="review in reviews" :key="review.id">
            <div class="grid box-review p-5">
              <div class="col flex flex-column justify-content-center m-2">
                <p class="font-semibold p-2">{{ review.publisher }}</p>
                <span clas="p-2"
                  ><i class="pi pi-car p-2"></i>{{ review.car }}</span
                >
              </div>
              <div class="col">
                <div class="grid align-items-center p-2">
                  <pv-rating
                    :modelValue="review.rating"
                    :readonly="true"
                    :cancel="false"
                  />

                  <span class="font-semibold pl-6" style="font-size: 1.1rem">
                    {{ review.date }}
                  </span>
                </div>
                <p>
                  {{ review.body }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="flex flex-column text-center w-full">
        <pv-rating
          v-model="rating"
          :modelValue="5"
          @click="newMethod"
          :cancel="false"
        />
        <pv-textarea
          v-model="body"
          :autoResize="true"
          rows="5"
          cols="50"
          maxlength="500"
          :placeholder="'Enter your review here'"
          required="true"
        />
        <div
          :class="{
            'review-alert': field == true,
            'review-alert-disabled': field == false,
          }"
        >
          <h3>Please fill out all fields</h3>
        </div>
        <pv-button
          class="mt-2"
          label="Submit"
          icon="pi pi-check"
          iconPos="right"
          @click="addComment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import customerHeaderComponent from "../../components/customer-header.component.vue";
import { ReviewsApiService } from "../../reviews/services/reviews-api.service";
import { MechanicsProfileApiService } from "../services/mechanics-api.service";
import { AppointmentsApiService } from "../../appointments/services/appointments.service";
import reviewComponent from "../../reviews/pages/review.component.vue";

export default {
  components: { reviewComponent },
  name: "mechanic-profile",
  components: {
    customerHeaderComponent,
    reviewComponent,
  },
  data() {
    return {
      appointmentDialog: false,
      rating: null,
      body: null,
      field: false,
      newReview: {
        rating: null,
        body: null,
        car: "car test",
        publisher: "name test",
        date: "date test",
      },
      appointment: {
        customerId: null,
        mechanicId: null,
        date: null,
        time: null,
      },
      availableTimes: [
        { time: "08:00 AM", value: "08:00" },
        { time: "10:00 AM", value: "10:00" },
        { time: "12:00 PM", value: "12:00" },
        { time: "14:00 PM", value: "2:00" },
        { time: "16:00 PM", value: "4:00" },
        { time: "18:00 PM", value: "6:00" },
      ],
      mechanics: [],
      mechanicId: null,
      selectedMechanic: {},
      reviews: [],
      reviewsService: null,
      mechanicsService: null,
      appointmentsService: null,
      minDate: null,
    };
  },
  created() {
    this.appointment.mechanicId = this.$route.params.mechanicId;
    this.mechanicId = this.$route.params.mechanicId;
    this.appointment.customerId = localStorage.getItem("user");
    this.reviewsService = new ReviewsApiService();
    this.mechanicsService = new MechanicsProfileApiService();
    this.appointmentsService = new AppointmentsApiService();
    let today = new Date();
    this.minDate = new Date();
    this.minDate.setDate(today.getDate() + 1);
    this.mechanicsService.getById(this.mechanicId).then((response) => {
      this.selectedMechanic = response.data;
    });

    this.mechanicsService.getAll().then((response) => {
      this.mechanics = response.data;
      this.reviewsService
        .findByMechanicId(this.selectedMechanic.id)
        .then((response) => {
          this.reviews = response.data;
        });
    });
  },
  methods: {
    openNew() {
      this.appointment = {};
      this.submitted = false;
      this.appointmentDialog = true;
    },
    updateSelectedMechanic() {
      this.reviewsService
        .findByMechanicId(this.selectedMechanic.id)
        .then((response) => {
          this.reviews = response.data;
        });
    },
    saveAppointment() {
      this.submitted = true;
      this.appointment.time = this.appointment.time.value;
      this.appointment.mechanicId = this.$route.params.mechanicId;
      this.appointment.customerId = localStorage.getItem("user");
      this.mechanicId = this.$route.params.mechanicId;
      console.log(this.appointment);
      this.appointmentsService.create(this.appointment).then((response) => {
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Appointment Created",
          life: 3000,
        });
        console.log(response);
      });
      this.appointmentDialog = false;
    },

    hideDialog() {
      this.appointmentDialog = false;
    },
    addComment() {
      if (this.rating == null || this.body == null) this.field = true;
      else {
        console.log(this.rating, this.body);
        this.field = false;
        this.newReview.rating = this.rating;
        this.newReview.body = this.body;
        this.newReview.mechanicId = this.selectedMechanic.id;
        this.reviewsService.create(this.newReview).then((response) => {
          this.reviews.push(response.data);
        });
        this.rating = null;
        this.body = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pi-star-fill {
  color: #e98b2f;
  padding: 10px;
  font-size: 1.5rem;
}

.main-description,
.about-section,
.reviews-section {
  gap: 1em;
}

.box-review {
  border-bottom: 1px solid #dae1e7;
}

::v-deep() {
  .p-rating .p-rating-star {
    height: 500px;
  }
}

.review-alert {
  color: red;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
}
.review-alert-disabled {
  display: none;
}
</style>
