export default defineNuxtRouteMiddleware((from, to, next) => {
  const user = useSupabaseUser()

  if (!user.value && to.fullPath == '/checkout') {
    return navigateTo('/auth')
  } else {
    navigateTo(to)
  }
})