import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  
  const cart = reactive([])
  const checkout = reactive([])
  const isLoading = ref(false)
  const isMenuOverlay = ref(false)
  // const doubleCount = computed(() => count.value * 2)

  return {
    cart,
    checkout,
    isLoading,
    isMenuOverlay
  }
})