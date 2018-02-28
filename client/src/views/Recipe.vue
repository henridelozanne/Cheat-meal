<template>
  <div class="container">
    <h1 class="title">Submit your recipe</h1>
    
    <form @submit.prevent="submitRecipe" id="form" action="/recipe" method="POST">

    <label for="title">Recipe title:</label>
    <input v-model="title" type="text" name="title">

    <label for="cost">Cost:</label>
    <input v-model="cost" type="text" name="cost">

     <button class="button is-primary">Submit recipe</button>

    </form>

  </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      title: "",
      cost: "",

      error: null
    };
  },
  methods: {
    submitRecipe() {
      this.error = null;
      api
        .submitRecipe({
          title: this.title,
          cost: this.cost
        })
        .then(() => {
          this.$router.push("/recipe");
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>
