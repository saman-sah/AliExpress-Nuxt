<template>
  <div
    id="IndexPage" 
    class="mt-4 max-w-[1200px] mx-auto px-2 "
  >
    <div class="grid xl:grid-cols-6 lg:grid-cols-5 md-grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
      <template v-if="products">
        <div
          v-for="product in products.data"
          :key="product"
        >
          <ProductItem :product="product" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
const userStore = useUserStore()
let products = ref(null)
onBeforeMount(async () => {
  products.value = await useFetch('/api/prisma/get-all-products')
  setTimeout(() => userStore.isLoading = false, 1000)
})
</script>
