<template>
  <div
    id="IndexPage" 
    class="mt-4 max-w-[1200px] mx-auto px-2 "
  >
 
    <div class="grid xl:grid-cols-6 lg:grid-cols-5 md-grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
      <div
        v-if="products"
        v-for="product in products"
        :key="product"
      >
        <ProductItem :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>


const products = [
  {id: 1, title: "title 1", description: "this is a disc", url: "https://picsum.photos/id/7/800/800", price: 990 },
  {id: 2, title: "title 2", description: "this is a disc", url: "https://picsum.photos/id/7/800/800", price: 990 },
  {id: 3, title: "title 3", description: "this is a disc", url: "https://picsum.photos/id/7/800/800", price: 990 },
  {id: 4, title: "title 4", description: "this is a disc", url: "https://picsum.photos/id/7/800/800", price: 990 },
  {id: 5, title: "title 5", description: "this is a disc", url: "https://picsum.photos/id/7/800/800", price: 990 },
  {id: 6, title: "title 6", description: "this is a disc", url: "https://picsum.photos/id/7/800/800", price: 990 },
  {id: 7, title: "title 7", description: "this is a disc", url: "https://picsum.photos/id/7/800/800", price: 990 },
  {id: 8, title: "title 8", description: "this is a disc", url: "https://picsum.photos/id/7/800/800", price: 990 },
  {id: 9, title: "title 9", description: "this is a disc", url: "https://picsum.photos/id/7/800/800", price: 990 }
]
</script>
