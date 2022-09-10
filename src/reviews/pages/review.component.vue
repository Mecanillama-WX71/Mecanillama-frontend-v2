<template>
  <div class="flex flex-column" style="max-width: 500px">
    <pv-rating v-model="rating" :modelValue="5" :cancel="false" />
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
</template>

<script>
import { ReviewsApiService } from "../services/reviews-api.service";

export default {
  name: "review-component",
  component: {},
  data() {
    return {
      rating: null,
      body: null,
      field: false,
      newReview: {
        rating: null,
        body: null,
        car: "car test",
        publisher: "name test",
        date: "date test",
        mechanicId: null,
      },

      selectedMechanic: {},
      reviews: [],
      reviewsService: null
    };
  },
  created() {
    this.reviewsService = new ReviewsApiService();
    this.reviewsService
      .findByMechanicId(this.selectedMechanic.id)
      .then((response) => {
        this.reviews = response.data;
      });
  },
  methods: {
    updateSelectedMechanic() {
      this.reviewsService
        .findByMechanicId(this.selectedMechanic.id)
        .then((response) => {
          this.reviews = response.data;
        });
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

<style>
</style>