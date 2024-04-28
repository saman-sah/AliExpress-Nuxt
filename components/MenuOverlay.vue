<template>
  <div
    id="MenuOverlay"
    class="fixed z-50 bottom-0 h-full w-full bg-white px-3"
  >
    <div class="flex items-center justify-between py-5">
      <NuxtLink
        to="/"
        @click="userStore.isMenuOverlay = false"
      >
        <img
          width="170"
          src="/AliExpress-logo.png"
        >
      </NuxtLink>
      <button
        @click="userStore.isMenuOverlay = false"
        class="rounded-full p-1 hover:bg-gray-200"
      >
        <Icon
          name="mdi:close"
          size="30"
        />
      </button>
    </div>

    <div class="flex items-center justify-between pt-5">
      <ul class="w-full">
        <li
          v-for="item in items"
          :key="item"
          @click="item.click"
          class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
        >
          <div class="flex items-center text-[20px] font-semibold">
            <Icon
              :name="item.icon"
              size="33"
            />
            <span class="pl-4">{{ item.label }}</span>
          </div>
          <div
            v-if="item.label === 'Shopping Cart'"
            class="flex items-center justify-center bg-primary h-[35px] min-w-[35px] text-lg text-white rounded-full"
          >
            {{ userStore.cart.length }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const userStore = useUserStore()

// const client = useSupabaseClient()
// const user = useSupabaseUser()

const goTo = (url) => {
  console.log('go tooooooooooooooo');
  userStore.isMenuOverlay = false
  return navigateTo(`/${url}`)
}

const signOut = () => {
  client.auth.signOut()
  userStore.isMenuOverlay = false
  return navigateTo('/')
}

const signIn = () => {
  userStore.isMenuOverlay = false
  return navigateTo('/auth')
}

const items = [
  {
    is_active: true,
    label: 'My Orders',
    icon: 'ph:pen-light',
    click : () => goTo('orders')
  },
  {
    is_active: true,
    label: 'Shopping Cart',
    icon: 'ph:shopping-cart-simple-light',
    click : () => goTo('shoppingcart')
  },
  {
    is_active: false,
    label: 'Sign out',
    icon: 'ph:sign-out-light',
    click : () => signOut()
  },
  {
    is_active: false,
    label: 'Sign in / Register',
    icon: 'ph:sign-in-light',
    click : () => signIn()
  }
]
</script>
