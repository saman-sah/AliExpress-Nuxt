<template>
  <div
    id="CheckoutPage"
    class="mt-4 max-w-[1200px] mx-auto px-2"
  >
    {{ toWordify(2310034) }}
    <div class="md:flex gap-4 justify-between mx-auto w-full">
      <div class="md:w-[65%]">
        <div class="bg-white rounded-lg p-4">
          <div class="text-xl font-semibold mb-2">
            Shipping Address
          </div>
          <div v-if="currentAddress && currentAddress.data">
            <NuxtLink
              to="/address"
              class="flex items-center text-blue-500 hover:text-red-400"
            >
              <Icon
                name="mdi:plus"
                size="18"
                class="mr-2"
              />
              Update Address
            </NuxtLink>

            <div class="pt-2 border-t">
              <div class="underline pb-1">
                Delivery Address
              </div>
              <ul class="text-xs">
                <li class="flex items-center gap-2">
                  <div>Contact name:</div>
                  <div class="font-bold">
                    {{ currentAddress.data.name }}
                  </div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Address:</div>
                  <div class="font-bold">
                    {{ currentAddress.data.address }}
                  </div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Zip Code:</div>
                  <div class="font-bold">
                    {{ currentAddress.data.zipcode }}
                  </div>
                </li>
                <li class="flex items-center gap-2">
                  <div>City:</div>
                  <div class="font-bold">
                    {{ currentAddress.data.city }}
                  </div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Country:</div>
                  <div class="font-bold">
                    {{ currentAddress.data.country }}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <NuxtLink
            v-else
            to="/address"
            class="flex items-center text-blue-500 hover:text-red-400"
          >
            <Icon
              name="mdi:plus"
              size="18"
              class="mr-2"
            />
            Add New Address
          </NuxtLink>
        </div>
        <div
          id="Items"
          class="bg-white rounded-lg p-4 mt-4"
        >
          <div
            v-for="product in userStore.checkout"
            :key="product"
          >
            <CheckoutProductItem :product="product" />
          </div>
        </div>
      </div>
      <div class="md:hidden block my-4" />

      <div class="md:w-[35%]">
        <div
          id="Placeholder"
          class="bg-white rounded-lg p-4"
        >
          <div class="text-2xl font-extrabold mb-2">
            Summary
          </div>
          <div class="flex items-center justify-between my-4">
            <div>Totla Shipoping</div>
            <div> Free</div>
          </div>

          <div class="border-t" />

          <div class="flex items-center justify-between my-4">
            <div class="font-semibold">Totla Shipoping</div>
            <div class="text-2xl font-semibold">
              $ <span class="font-extrabold">
                {{ total / 100 }}
              </span>
            </div>
          </div>

          <form @submit.prevent="pay()">
            <div
              id="card-element"
              class="border border-gray-500 p-2 rounded-sm"
            />
            <p 
              id="card-error"
              role="alert"
              class="text-red-700 text-center font-semibold"
            />
            <button
              :class="[
                isProcessing ? 'opacity-70' : 'opacity-100',
                'mt-4 bg-gradient-to-r from-[#FE630C] to-[#FF3200] w-full text-white text-[21PX] font-semibold p-1.5 rounded-full'
              ]"
              type="submit"
              :disabled="isProcessing"
            >
              <Icon
                v-if="isProcessing"
                name="eos-icons:loading"
              />
              <div v-else>
                Place order
              </div>
            </button>
          </form>

        </div>

        <div class="bg-white rounded-lg p-4 mt-4">
          <div class="text-lg font-semibold mb-2 mt-2">
            AliExpress
          </div>
          <p class="my-2">
            AliExpress keeps your information and purchases safe.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toWordify } from 'src/utils/string'
const route = useRoute()
const user = useSupabaseUser()
const userStore = useUserStore()
let from = null
let card = null
let stripe = null
let elements = null
let total = ref(0)
let clientSecret = null
let currentAddress = null
let selectedArray = ref([])
let isProcessing = ref(false)

onBeforeMount(async () => {
  if(userStore.checkout.length < 1) {
    return navigateTo('/shoppingcart')
  }

  total.value = 0.00

  if(user.value) {
    currentAddress.value = await useFetch(`/api/prisma/get-address-by-user/${user.value.id}`)
    setTimeout(() => {
      userStore.isLoading = false
    }, 200);
  }
})

onMounted(() => {
  isProcessing.value = true
  userStore.checkout.forEach(item => {
    total.value += item.price
  })
})

watch(() => total.value, () => {
  if(total.value > 0 ) {
    stripeInit()
  }
})

const stripeInit = () => {

}

const pay = () => {
  
}

const createOrder = (stripeId) => {
  
}

const showError = (errorMsgText) => {

}

</script>
