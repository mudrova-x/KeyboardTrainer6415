// зоны клавиатуры
export const firstZone = [ " ","а","п","м","и","к","е","о","р","т","ь","н","г","5","6","7","8"]
export const secondZone = ["в", "с", "у", "л", "б", "ш", "9", "4"]
export const thirdZone = ["ы", "ч", "ц", "д", "ю", "щ", "0", "3"]
export const fourthZone = ["ж", "э", "з", "х", "ъ", ".", "-", "+","1","2", "\\", "ф", "я", "й", "ё"]

// regex zone
// 1 - [ апмикеортьнг5678]

export function GetZone(level) {
  console.log("level = " + level)
  console.log("level = "+ typeof level)
  let validSymbols = []

  switch (level.toString()) {
    // объеденить массивы
    case "1": {
      console.log("fffffff = "+ typeof level)
      validSymbols = firstZone
      //validSymbols = validSymbols.concat(firstZone)
      break
    }
    case "2": {
      validSymbols = firstZone
      validSymbols = validSymbols.concat(secondZone)
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
  console.log(holeText, level)
  if (level==="0") return -1
  let validSymbols = GetZone(level.toString())
  let res = 0
  console.log(validSymbols)
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


export function Decode(length, level, array) {
  try {
    if (!array || !length || !level || parseInt(length) === 0) throw Error('Ошибка данных')
    const uintArr = new Uint8Array(array)
    const fileText = new TextDecoder().decode(uintArr)
    //console.log(fileText)
    console.log(typeof fileText)
    const task = FileCreate(parseInt(length), level, fileText)
    return task
  }
 catch(e) {
    console.log(e.message)
    return null
 }
}

export function FileCreate(length, level, fileText) {
  try {
    if (fileText === '') throw Error('Пустой файл')
    const include = GetZone(level)
    console.log(include)
    const text = fileText.toLowerCase()
    let res = ''
    for (let i = 0; i < text.length && res.length < length; i++) {
      if (!!include.find((el) => el === text[i]))
        res += text[i]
    }
    console.log("res = " + res)
      if (res.length<length)  throw Error('Недостаточно символов')
    console.log("res.length" + res.length)
    if(CheckZone(res, level)<0) throw Error('Ошибка данных')
    return res
  }
 catch(e) {
    console.log(e.message)
    return null
 }
}

export function AutoCreate(length, level) {
  try {
    if (!length || !level || parseInt(length) === 0) throw Error('Ошибка данных')
    const include = GetZone(level)
    let res = ''
    for (let i = 0; i < length; i++) {
        res += include[Math.floor(Math.random() * include.length)]
    }
    console.log("res = " + res)
      if (res.length<length)  throw Error('Ошибка длины')
    console.log("res.length" + res.length)
    if(CheckZone(res, level)<0) throw Error('Ошибка данных')
    return res
  }
 catch(e) {
    console.log(e.message)
    return null
 }
}