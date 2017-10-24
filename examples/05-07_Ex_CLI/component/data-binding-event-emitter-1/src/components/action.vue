<template>
  <div class="input-group product-search action-box">
    <input class="form-control" placeholder="Search products..." v-model="searchName" @keyup.stop="filteredProducts()" type="text">
    <div class="input-group-btn">
      <button class="btn btn-default" type="button" @click.prevent="sortList()">
        <i class="fa fa-unsorted"></i>
        Sort By Name
      </button>
    </div>
  </div>
</template>

<script src="./src/data.js"></script>
<script>

export default {
  name: 'action',
  data () {
    return {
      searchName: ""
    }
  },
  methods:{
    filteredProducts: function() {
      this.$emit('type-in-search',this.searchName);
    },
    sortList: function() {
      this.$emit('sort-list',123);
    }
  }
}
</script>

<style src="../assets/css/action.css"></style>
