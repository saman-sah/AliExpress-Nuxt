<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <MenuOverlay
    :class="[
        userStore.isMenuOverlay
        ? 'max-h-[100vh] ease-in visible'
        : 'max-h-0 ease-out invisible',
        'max-h-[100vh] transition-all duration-200'
    ]"
  />
</template>

<script setup>
const userStore = useUserStore()

const route = useRoute()

let windowWidth = ref(process.client ? window.innerWidth : '')

onMounted(() => {
  userStore.isLoading = false
  window.addEventListener('resize', function () {
    windowWidth.value = this.window.innerWidth;
  })
})

watch(() => windowWidth.value, () => {
    if (windowWidth.value >= 767) {
        userStore.isMenuOverlay = false
    }
})

watch(() => route.fullPath , () => {
    if (windowWidth.value >= 767) {
        userStore.isMenuOverlay = false
    }
})
</script>