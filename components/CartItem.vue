<template>
  <div class="flex justify-start my-2">
    <div class="my-auto">
      <div
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
        class="flex items-center justify-start p-0.5 cursor-pointer"
      >
        <div
          @click="isSelected = !isSelected"
          :class="[
            isSelected && 'bg-[#FD374F]',
            isHover ? 'border-[#FD374F]' : 'border-gray-300',
            'flex items-center justify-center h-[20px] w-[20px] rounded-full border mr-5 ml-2'
          ]"
        >
          <div class="h-[8px] w-[8px] rounded-full bg-white" />
        </div>
      </div>
    </div>
    <img
      :src="product.url"
      alt=""
      class="rounded-md md:w-[150px] w-[90px]"
    >
    <div class="overflow-hidden pl-2 w-full">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center justify-between truncate">
          <span class="sm:block hidden text-center bg-[#FD374F] text-white text-[9px] font-semibold px-1.5 rounded-sm min-w-[80px]">
            Welcome Deal
          </span>
          <div class="truncate sm:pl-2">
            {{ product.title }}
          </div>
        </div>
        <button
          @click="removeFromChart()"
          class="mx-3 sm:block hidden -mt-0.5 hover:text-red-500"
        >
          <Icon
            name="material-symbols:delete-outline"
            size="20"
          />
        </button>
      </div>
      <div class="text-xl font-semibold">
        $<span class="font-bold">
          {{ product.price / 100 }}
        </span>
      </div>
      <p class="text-[#009A66] text-xs font-semibold pt-1">
        Free 11-day delivery over $8.28
      </p>
      <p class="text-[#009A66] text-xs font-semibold pt-1">
        Free Shipping
      </p>
      <div class="flex items-center justify-end">
        <button
          @click="removeFromChart()"
          class="sm:hidden block -mt-0.5 hover:text-red-500"
        >
          <Icon
            name="material-symbols:delete-outline"
            size="20"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    default: () => {}
  },
  selectedArray: {
    type: Array,
    default: () => []
  }
})
const { product, selectedArray } = toRefs(props)

const emits = defineEmits([
  'selectedRadio'
])

const userStore = useUserStore()
let isHover= ref(false)
let isSelected= ref(false)

const removeFromCart = () => {
  userStore.cart.forEach((pro, index) => {
    if(pro.id === product.value.id) {
      userStore.cart.splice(index, 1)
    }
  })
}

watch(()=> isSelected.value, (val) => {
  emits('selectedRadio', {
    id: product.value.id,
    val: val
  })
})
</script>
