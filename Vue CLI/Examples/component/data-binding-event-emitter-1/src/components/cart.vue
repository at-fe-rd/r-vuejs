<template>
  <div class="cart-box">
    <h2><i class="fa fa-cart-plus"></i> Shopping Cart</h2>
    <ul>
      <li class="cart-item" v-for="(item,key) in itemInCart">
        <button class="btn btn-xs btn-default" type="button" title="Remove One"><i class="fa fa-minus" @click="minusItem(key)"></i></button>
        <span>{{item.quantity}}</span>
        <button class="btn btn-xs btn-default" type="button" title="Add One"><i class="fa fa-plus" @click="plusItem(key)"></i></button>
        <span>{{item.name}} {{item.option.details}} ({{item.option.price | toCurrency}})</span>
        <button class="btn btn-xs btn-danger btn-delete to-the-right" type="button" title="Remove From Cart" @click="removeItem(key)"><i class="fa fa-times"></i></button>
        <b class="to-the-right">{{item.option.price * item.quantity | toCurrency}}</b>
      </li>
    </ul>
    <p>---------------------------------------------------------------------------</p>
    <div class="price-info">
      <span>{{itemInCart.length}} item(s)</span>
      <b class="to-the-right">{{total() | toCurrency}}</b>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cart',
  props: ['itemInCart'],
  data () {
    return {
    }
  },
  methods: {
    total: function(){
      if(this.itemInCart.length!=0) {
        return this.itemInCart.map(function(a){
          return a.option.price * a.quantity;
        })
        .reduce(function(a,b){
          return a+b;
        }, 0);
      }
    },
    minusItem: function(key) {
      if(this.itemInCart[key].quantity<=1) {
        this.removeItem(key);
      }
      else{
         this.itemInCart[key].quantity--;
      }
    },
    plusItem: function(key) {
      this.itemInCart[key].quantity++;
    },
    removeItem: function(key) {
      this.itemInCart.splice(key, 1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../assets/css/cart.css">
</style>
