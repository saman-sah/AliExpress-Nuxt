<template>
  <div
    id="OrdersPage"
    class="mt-4 max-w-[1200px] mx-auto p-6 min-h-[500px]"
  >
    <div class="bg-white w-full p-6 min-h-[150px]">
      <div  class="flex items-center text-xl">
        <Icon
          name="carbon:delivery"
          color="#5FCB04"
          size="35"
        />
        <span class="pl-4">
          Orders
        </span>
      </div>
      <template
        v-if="orers && orders.data"
      >
        <div
          v-for="(order, index) in onprogress.data"
          :key="index"
          class="text-sm pl-[50px]"
        >
          <div>
            <p class="border-b py-1">
              Stripe ID: {{ order.stripId }}
            </p>
            <div class="pt-2"></div>
            <div
              v-for="(item, itemIndex) in order.orderItem"
              :key="itemIndex"
            >
              <NuxtLink
                class="flex items-center gap-3 p-1 hover:text-blue-500"
                :to="`product/${item.productId}`"
              >
                <img
                  :src="item.product.url"
                  width="40"
                  alt=""
                >
                {{ item.product.title }}
              </NuxtLink>
            </div>
            <div class="pt-2 pb-5">
              {{ order.name }}, {{ order.address }}, {{ order.zipcode }}, {{ order.city }}, {{ order.country }}
            </div>
          </div>
        </div>
      </template>
      <div
        v-else
        class="flex items-center justify-center"
      >
        You have no order history
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser()
const userStore = useUserStore()

let orders = ref(null)

orders.value = await useFetch(`/api/prisma/get-all-orders-by-user/${user.value.id}`)

if(!user.value) {
  navigateTo('/auth')
}
setTimeout(() => {
  userStore.isLoading = false
}, 200);
</script>
