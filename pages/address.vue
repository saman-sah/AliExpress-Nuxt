<template>
  <div
    id="AddressPage"
    class="mt-4 max-w-[500px] mx-auto px-2"
  >
  
  <input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />
<datalist id="ice-cream-flavors">
  <option value="Chocolate"></option>
  <option value="Coconut"></option>
  <option value="Mint"></option>
  <option value="Strawberry"></option>
  <option value="Vanilla"></option>
</datalist>
    <div class="mx-auto bg-white rounded-lg p-3">
      <div class="text-xl text-bold mb-2">
        Address Details
        <form @submit.prevent="submit()">
          <TextInput
            class="w-full"
            placeholder="Content Name"
            v-model="contactName"
            inputType="text"
            :error="error && error.type == 'contactName' ? error.message : ''"
          />

          <TextInput
            class="w-full mt-2"
            placeholder="Address"
            v-model="address"
            inputType="text"
            :error="error && error.type == 'address' ? error.message : ''"
          />

          <TextInput
            class="w-full mt-2"
            placeholder="Zip Code"
            v-model="zipCode"
            inputType="text"
            :error="error && error.type == 'zipCode' ? error.message : ''"
          />

          <TextInput
            class="w-full mt-2"
            placeholder="City"
            v-model="city"
            inputType="text"
            :error="error && error.type == 'city' ? error.message : ''"
          />

          <TextInput
            class="w-full mt-2"
            placeholder="Country"
            v-model="country"
            inputType="text"
            :error="error && error.type == 'country' ? error.message : ''"
          />

          <button
            :disabled="isWorking"
            type="submit"
            class="mt-6 bg-gradient-to-r from-[#FE630C] to-[#FF3200] w-full text-white text-[21px] font-semibold p-1.5 rounded-full"
          >
            <div v-if="!isWorking">
              Update Address
            </div>
            <Icon
              v-else
              name="eos-icons:loading"
              size="25"
              class="mr-2"
            />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const userStore = useUserStore()


let contactName = ref(null)
let address = ref(null)
let zipCode = ref(null)
let city = ref(null)
let country = ref(null)


let currentAddress = ref(null)
let isUpdate = ref(null)
let isWorking = ref(null)
let error = ref(null)

watchEffect(() => {
  userStore.isLoading = false
})

const submit = async () => {
  console.log('submut')
  isWorking.value = true
  error.value = null
  if(!contactName.value) {
    error.value = {
      type: 'contactName',
      message: 'A contact name is required'
    }
  } else if (!address.value){
    error.value = {
      type: 'address',
      message: 'A address name is required'
    }
  } else if (!zipCode.value){
    error.value = {
      type: 'zipCode',
      message: 'A zipcode name is required'
    }
  }else if (!city.value){
    error.value = {
      type: 'city',
      message: 'A city name is required'
    }
  } else if (!country.value){
    error.value = {
      type: 'country',
      message: 'A country name is required'
    }
  }
  console.log('submut', error.value)

  if (error.value) {
    isWorking.value = false
    return
  }
}
</script>