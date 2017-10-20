<template>
  <div>
    <ul v-for="(product, key) in products">
      <h3>{{product.name}}</h3>
      <li v-for="(item,keyItem) in product.options" :key="item.id"> 
        <b>{{item.details}}</b>
        <span>{{item.price | toCurrency}}</span>
        <button @click="addProduct(keyItem,key)">Add to <i class="fa fa-cart-plus"></i></button>
      </li>
    </ul>
  </div>
</template>
<script src="../data.js" type="text/javascript"></script>
<script>
export default {
  name: 'list',
  props: ['products'],
  data() {
    return {
      productsCart:[],
      quantity: 0
    }
  },
  methods: {
    addProduct: function(item,key){
      var product = {"name": this.products[key].name, "option": this.products[key].options[item], "quantity": 1};
      this.$emit('click-add-item', product);
    }
  }
}
</script>

<style scoped>

</style>
