<template>
  <div class="container">
    <div class="col-md-6">
      <action @type-in-search="searchList" @sort-list="sortList"></action>
      <list @click-add-item="addToCart" :products="filterProducts"></list>
    </div>
    <div class="col-md-6">
      <cart :itemInCart="productsCart"></cart>
    </div>
  </div>
</template>
<script>
import action from './components/action'
import cart from './components/cart'
import list from './components/list'
import data from './data.js';
export default {
  components: {
    cart,
    list,
    action
  },
  data() {
    return {
      productsCart:[],
      searchData: '',
      order: false
    }
  },
  methods: {
    addToCart: function(value){
      let check = 0;
      this.productsCart.forEach(function(element) {
        if(element.option.id == value.option.id){
          check = 1;
          element.quantity++;
          return 0;
        }
      }, this);
      if(check==0) {
        this.productsCart.push(value);
      }
    },
    searchList: function(value) {
      this.searchData=value;
    },
    sortList: function(value) {
      this.order = true;
    }
  },
  computed: {
    filterProducts: function() {
      if (this.order == true) {
      }
      else if(this.order == false && this.searchData == '') {
        return data;
      }
      else {
        let productList = [];
        data.forEach((item) => {
          if(item.name.toLowerCase().indexOf(this.searchData.toLowerCase())>=0) {
            productList.push(item);
          }
        });
        return productList;
      }
    } 
  }
}
</script>
<style src="./assets/css/app.css"></style>