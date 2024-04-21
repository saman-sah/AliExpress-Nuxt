<template>
  <div
    id="MainLayout" 
    class="w-full fixed z-50 "
  >
    <div
      id="TopMenu"
      class="w-full bg-[#FAFAFA] border-b md:block hidden"
    >
      <ul class="flex items-center justify-end text-xs text-[#333333] font-light px-2 h-10 bg-[#FAFAFA] max-w-[1200px]">
        <li
          v-for="item in menuItem"
          :key="item" 
          class="border-r border-r-gray-400 px-3 hover:text-primary cursor-pointer"
        >
          {{ item.title }}
        </li>
        <li class="px-3 hover:text-primary cursor-pointer">
          <Icon
            name="ic:sharp-install-mobile"
            size="17"
          />
          App
        </li>
        <li
          @mouseenter="isAccountMenu = true"
          @mouseleave="isAccountMenu = false"
          :class="[
            isAccountMenu ? 'bg-white border z-40 shadow-[0_15px_100px_40px_rgba(0,0,0,0.3)]' : 'border border-[#FAFAFA]',
            'relative flex items-center px-2.5 hover:text-primary h-full cursor-pointer'
          ]"
        >
          <Icon
            name="ph:user-thin"
            size="17"
          />
          Account
          <Icon
            name="mdi:chevron-down"
            size="17"
          />
          <div
            v-if="isAccountMenu"
            id="AccountMenu"
            class="absolute bg-white w-[220px] text-[#333333] z-40 top-[38px] -left-[100px] border-x border-b" 
          >
            <div v-if="true">
              <div class="text-semibold text-[15px] my-4 px-3">
                Wlcome to AliExpress!
              </div>
              <div class="flex items-center gap-1 px-3 mb-3">
                <NuxtLink 
                  to="/auth"
                  class="bg-primary text-center w-full text-[16px] rounded-sm text-white font-semibold p-2"
                >
                  Login / Register
                </NuxtLink>
              </div>
            </div>
            <div class="bg-white" />
            <ul>
              <li
                @click="navigateTo('/orders')"
                class="text-[13px] py-2 px-4 w-full hover:bg-gray-200"
              >
                My Orders
              </li>
              <li
                v-if="true"
                class="text-[13px] py-2 px-4 w-full hover:bg-gray-200"
              >
                Sign out
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div
      id="MainHeader"
      class="flex items-center w-full bg-white"
    >
      <div class="flex lg:justify-start justify-between gap-10 max-w-[1150px] w-full px-3 py-5 mx-auto">
        <NuxtLink 
          to="/"
          class="min-w-[170px]"
        >
          <img
            width="170"
            :src="Logo"
            />
        </NuxtLink>
        <div class="max-w-[700] w-full md:block hidden">
          <div class="relative">
            <div class="flex items-center border-2 border-primary rounded-md w-full">
              <input
                type="text"
                class="w-full placeholder-gray-400 text-sm pl-3 focus:outline-none"
                placeholder="kitchen accessories"
                v-model="searchItem"
              >
              <Icon
                v-if="isSearching"
                name="eos-icons:loading"
                size="25"
                class="mr-2"
              />
              <button class="flex items-center h-[100%] p-1.5 px-2 bg-primary">
                <Icon
                  v-if="isSearching"
                  name="ph:magnifying-glass"
                  color="#ffffff"
                  size="20"
                />
              </button>
            </div>
            <div class="absolute bg-white max-w-[700px] h-auto w-full">
              <div
              v-if="false" 
                class="p-1"
              >
                <NuxtLink
                  to="/product/1"
                  class="flex items-center justify-between w-full cursor-pointer hover:bg-gray-100"
                >
                  <div class="flex items-center">
                    <img 
                      src="https://picsum.photos/id/82/300/320"
                      alt=""
                      class="rounded-md"
                      width="40"
                    >
                    <div class="truncate ml-2">
                      Tseting
                    </div>
                  </div>
                  <div class="truncate">
                    $998.99
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <NuxtLink
          to="/shoppingcart"
          class="flex items-center"
        >
          <button
            class="relative md:block hidden text-pri"
            @mouseenter="isCartHover = true"
            @mouseleave="isCartHover = false"
          >
            <span class="absolute flex items-center justify-center -right-[3px] top-0 bg-primary h-[17px] min-w-[17px] text-xs text-white px-0.5 rounded-full">
              0
            </span>
            <div class="min-w-[40px]">
              <Icon
                v-if="isSearching"
                name="ph:shopping-cart-simple-light"
                :color="!isCartHover || '#FF4646'"
                size="33"
              />
            </div>
          </button>
        </NuxtLink>        
        <button
          @click="userStore.isMenuOverlay = true"
          class="md:hidden block rounded-full p-1.5 -mt-[4px] hover:bg-gray-200"
        >
          <Icon
            name="radix-icons:hamburger-menu"
            size="33"
          />
        </button>
      </div>
    </div>
  </div>

  <Loading v-if="userStore.isLoading" />

  <div class="lg:pt-[150px] md:pt[130px] pt-[80px]" />
  <div class="bg-gray-200 py-8">
    <slot />

  </div>

  <Footer v-if="!userStore.isLoading" />
</template>

<script setup>
import Logo from '/AliExpress-logo.png'

const userStore = useUserStore()

const searchItem = ref('')
const isSearching = ref(true)
const isCartHover = ref(false)
const isAccountMenu = ref(false)



const menuItem = [
  {
    to: '/',
    title: 'Sales on AliExpress'
  },
  {
    to: '/',
    title: 'Cookie Preferences'
  },
  {
    to: '/',
    title: 'Help'
  },
  {
    to: '/',
    title: 'Buyer Protection'
  }
]
</script>
