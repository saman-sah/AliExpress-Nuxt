<template>
  <div>
    <client-only>
      <input
        :type="inputType"
        :placeholder="placeholder"
        v-model="value"
        :class="[
          isFocused && 'border-gray-900',
          error && 'border-red-500',
          'w-full bg-white text-gray-800 border text-sm border-[#EFF0EB] rounded-lg p-3 placeholder-gray-500 focus:outline-none'
        ]"
        @focus="isFocused = true"
        @blur="isFocused = true"
        autocomplete="off"
      >
    </client-only>
    <span
      v-if="error"
      class="text-red-500 text-[14px] font-semibold"
    >
      {{ error }}
    </span>
  </div>
</template>

<script setup>
const enit = defineEmits(['update:input'])

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  inputType: {
    type: String,
    default: ''
  },
  max: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
})

const {
  max,
  error,
  inputType,
  placeholder
} = toRefs(props)

let isFocused = ref(false)
const value = defineModel()
// const inputComputed = computed({
//   get: () => input.value,
//   set: (val) => emit('update:input', val)
// })
</script>
