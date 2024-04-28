<template>
  <div
    id="AuthPage"
    class="w-full h-[100vh] bg-white"
  >
    <div class="w-full flex items-center justify-center p-5 border-b border-b-gray-300">
      <NuxtLink
        to="/"
        class="min-w-[170px]"
      >
        <img
          src="/AliExpress-logo.png"
          alt=""
          width="170"
        >
      </NuxtLink>
    </div>
    <div class="max-w-[400px] mx-auto px-2">
      <div class="text-center my-6">
        Login / Register
      </div>

      <button
        v-for="btn in loginButton"
        :key="btn"
        class="flex items-center justify-center mt-6 gap-3 p-1.5 w-full border hover:bg-gray-100 rounded-full text-lg font-semibold"
        @click="loginButton(btn.label)"
      >
        <img
          :src="btn.img"
          class="w-full max-w-[30px]"
          :alt="btn.title"
        >
        <div>{{ btn.title }}</div>
      </button>
    </div>
  </div>
</template>

<script setup>

// const client = useSupabaseClient()
// const user = useSupabaseUser()

// watchEffect(() => {
//   if(UserActivation.value) { 
//     return navigateTo('/')
//   }
// })

const lofin = async (provider) => {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: provider
  })
}
const loginButton = [
  {
    title: 'Google',
    label: 'google',
    img: '/google-logo.png'
  },
  {
    title: 'Github',
    label: 'github',
    img: '/github-logo.png'
  }
]
</script>
