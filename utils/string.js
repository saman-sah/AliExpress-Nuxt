const SEPARATOR = '٬'

const NUMBERS_WORD_LIST = {
  1: 'یک',
  2: 'دو',
  3: 'سه',
  4: 'چهار',
  5: 'پنج',
  6: 'شش',
  7: 'هفت',
  8: 'هشت',
  9: 'نه',
  10: 'ده',
  11: 'یازده',
  12: 'دوازده',
  13: 'سیزده',
  14: 'چهارده',
  15: 'پانزده',
  16: 'شانزده',
  17: 'هفده',
  18: 'هجده',
  19: 'نوزده',
  20: 'بیست',
  30: 'سی',
  40: 'چهل',
  50: 'پنجاه',
  60: 'شصت',
  70: 'هفتاد',
  80: 'هشتاد',
  90: 'نود',
  100: 'صد',
  200: 'دویست',
  300: 'سیصد',
  400: 'چهارصد',
  500: 'پانصد',
  600: 'ششصد',
  700: 'هفتصد',
  800: 'هشتصد',
  900: 'نهصد',
  1000: 'هزار',
  1000000: 'میلیون',
  1000000000: 'میلیارد',
  1000000000000: 'بیلیون',
  1000000000000000: 'بیلیارد',
  1000000000000000000: 'تریلیون'
}

export const addPriceSeparator = price => {
  return `${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, SEPARATOR)
}

export const toWordify = input => {
  const getPersianWord = n => NUMBERS_WORD_LIST[n] || ''
  const toPersianWord = n => {
    if (n === 0) return ''
    if (n <= 9) return getPersianWord(n)
    if (n >= 11 && n <= 19) return getPersianWord(n)
    const residual = n <= 99 ? n % 10 : n % 100
    return residual === 0
      ? getPersianWord(n)
      : `${getPersianWord(n - residual)} و ${toPersianWord(residual)}`
  }

  if (isNaN(input) || input === 0) return 'صفر'

  if (input <= 999) return toPersianWord(input)

  const getUnitName = numberOfZeros =>
    numberOfZeros === 0
      ? ''
      : NUMBERS_WORD_LIST[parseInt(`1${'0'.repeat(numberOfZeros)}`)]

  const seperated = addPriceSeparator(input).split(SEPARATOR)

  const numbers = seperated
    .map((number, index) => {
      const transformed = toPersianWord(parseInt(number, 10))
      const unitName = getUnitName((seperated.length - (index + 1)) * 3)
      return transformed ? `${transformed} ${unitName}` : ''
    })
    .filter(Boolean)

  return numbers.join(' و ').trim()
}
