<template>
  <b-field :label="label">
    <b-autocomplete v-model="model" placeholder="Butter" keep-first open-on-focus :data="filteredData"
      field="name" @input="search" :loading="loading">
    </b-autocomplete>
  </b-field>
</template>

<script>
export default {
  props: {
    label: String,
    value: String
  },

  data() {
    return {
      filteredData: [],
      loading: false
    };
  },

  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },

  methods: {
    search(value) {
      this.loading = true;
      this.filteredData = [
        {
          name: "Butter"
        },
        {
          name: "Cheddar"
        },
        {
          name: value
        }
      ];
      this.loading = false;
    }
  }
};
</script>
