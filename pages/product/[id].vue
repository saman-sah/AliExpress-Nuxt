<template>
  <div
    id="ItemPage"
    class="mt-4 max-w-[1200] mx-auto px-2"
  >
    <div class="md:flex gap-4 justify-between mx-auto w-full">
      <div class="md:w-[40%]">
        <img
          v-if="currentImage"
          :src="currentImage"
          alt=""
          class="rounded-lg object-cover"
        >
        <div
          v-if="images[0] !== ''"
          class="flex items-center justify-center mt-2"
        >
          <div
            v-for="image, index in images"
            :key="index"
          >
            <img
              :src="image"
              alt="product image"
              width="70"
              @mouseover="currentImage = image"
              @click="currentImage = image"
              :class="[
                currentImage !== image || 'border-[#FF5353]',
                'rounded-md object-fit border-[3px] cursor-pointer'
              ]"
            >
          </div>
        </div>
      </div>
      <div class="md:w-[60%] bg-white p-3 rounded-lg">
        <div v-if="product && product.data">
          <p class="mb-2">
            {{ product.data.title }}
          </p>
          <p class="font-light text-[12px] mb-2">
            {{ product.description }}
          </p>
        </div>
        <div class="flex items-center pt-1.5">
          <span class="h-4 min-w-4 rounded-full p-0.5 bg-[#FFD000] mr-2">
            <Icon
              name="material-symbols:star-rounded"
              class="-mt-[17px]"
              size="12"
            />
          </span>
          <p class="text-primary">
            Extra 5%off
          </p>
        </div>
        <div class="flex items-center justify-start my-2">
          <Icon
            v-for="n in 5"
            :key="n"
            name="ic:baseline-star"
            color="#FF5353"
            size="12"
          />
          <span class="text-[13px]">
            5 213 Reviews 1, 000+ orders
          </span>
        </div>
        <div class="border-b" />
        <div class="flex items-center justify-start gap-2 my-2">
          <div class="text-xl font-bold">
            ${{ priceComputed }}
          </div>
          <span class="bg-[#F5F5F5] border text-[#C08562] text-[9px] font-semibold px-1.5 rounded-sm">
            70% off
          </span>
        </div>
        <p class="text-[#009A66] text-xs font-semibold pt-1">
          Free Shippingg
        </p>
        <div class="py-2" />
        <button
          @click="addToCart()"
          :disabled="isInCart"
          class="px-6 py-2  rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-[#FF851A] to-[#FFAC2C]"
        >
          <div v-if="isInCart">
            Is Added
          </div>
          <div v-else>
            Add to Cart
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

const currentImage = ref(null)
const userStore = useUserStore()
const route = useRoute()

const isInCart = computed(() => {
  let res = false
  userStore.cart.forEach(pro => {
    if(route.params.id == pro.id) {
      res = true
    }
  })
  return res
})

const images = ref([
  '',
  'https://picsum.photos/id/212/800/800',
  'https://picsum.photos/id/233/800/800',
  'https://picsum.photos/id/165/800/800',
  'https://picsum.photos/id/99/800/800',
  'https://picsum.photos/id/144/800/800',
])

let product = ref(null)

onBeforeMount(async () => {
  product.value = await useFetch(`/api/prisma/get-product-by-id/${route.params.id}`)
})

watchEffect(() => {
  if(product.value && product.value.data) {
    console.log('product.value', product.value.data);
    currentImage.value = product.value.data.url
    images.value[0] = product.value.data.url
    userStore.isLoading = false
  }
})

const priceComputed = computed(() => {
  if(product.value && product.value.data) {
    return product.value.data.price / 100
  }
  return '0.00'
})

const addToCart = () =>{
  userStore.cart.push(product.value.data)
}
</script>
