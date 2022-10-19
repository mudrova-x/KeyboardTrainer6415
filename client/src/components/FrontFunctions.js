// зоны клавиатуры
export const firstZone = [
    " ",
  "а",
  "п",
  "м",
  "и",
  "к",
  "е",
  "о",
  "р",
  "т",
  "ь",
  "н",
  "г",
  "5",
  "6",
  "7",
  "8",
]
export const secondZone = ["в", "с", "у", "л", "б", "ш", "9", "4"]
export const thirdZone = ["ы", "ч", "ц", "д", "ю", "щ", "0", "3"]
export const fourthZone = ["ж", "э", "з", "х", "ъ", ".", "-", "+", "\\"]

export function GetZone(level) {
  console.log(level)
  let validSymbols

  switch (level) {
    // объеденить массивы
    case "1": {
      validSymbols = firstZone
      validSymbols = validSymbols.concat(firstZone)
      break
    }
    case "2": {
      validSymbols = firstZone
      validSymbols = validSymbols.concat(firstZone, secondZone)
      break
    }
    case "3": {
      validSymbols = firstZone
      validSymbols = validSymbols.concat(secondZone, thirdZone)
      break
    }
    case "4": {
      validSymbols = firstZone
      validSymbols = validSymbols.concat(secondZone, thirdZone, fourthZone)
      break
    }
    default: {
      break
    }
  }

  return level === 0 ? null : validSymbols
}

export function CheckZone(holeText, level) {
  
  let validSymbols = GetZone(level)
    let res = 0
    for (let i = 0; i < holeText.length; i++) {
        res += validSymbols.find((el) => {
           // console.log(el + " - " + holeText[i] + " = "+(el === holeText[i]))
            return el === holeText[i]
        }) ? 0 : -1
        //console.log(res)
    }
  return res
}
// проверка соотвествия зонам
