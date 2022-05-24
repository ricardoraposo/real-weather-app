function capitalize(words) {
  const separateWord = words.toLowerCase().split(' ');
  for (let i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}

const daysOfTheWeek = {
  0:"Sunday",
  1:"Monday",
  2:"Tuesday",
  3:"Wednesday",
  4:"Thursday",
  5:"Friday",
  6:"Saturday",
}

const monthsOfTheYear = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
}

function checkValidDay (currentDay) {
  if (currentDay >= 6) {
    return false
  } else{
    return true
  }
}

function formatDate (date,dayName) {
  const year = date.slice(0,4)
  const month = date.slice(5,7)
  const day = date.slice(8,10)
  return `${daysOfTheWeek[dayName]}, ${day}th ${monthsOfTheYear[month]} ${year}`
}

function getHour(date){
  const hour = date.slice(11,16)
  const hourNumber = Number(hour.slice(0,2))
  if(hourNumber > 12){
    return `${hourNumber - 12}${hour.slice(2)} pm`
  } else {

    return `${hourNumber}${hour.slice(2)} am` 
  }
}

function svgPicker (weatherData,svgItem) {
  if(weatherData.weather[0].main == "Thunderstorm"){
    svgItem.classList.add("fa-solid")
    svgItem.classList.add("fa-cloud-bolt")
  }
  else if(weatherData.weather[0].main == "Drizzle"){
    svgItem.classList.add("fa-solid")
    svgItem.classList.add("fa-faucet-drip")
  }
  else if(weatherData.weather[0].main == "Rain"){
    svgItem.classList.add("fa-solid")
    svgItem.classList.add("fa-cloud-showers-heavy")
  }
  else if(weatherData.weather[0].main == "Snow"){
    svgItem.classList.add("fa-solid")
    svgItem.classList.add("fa-snowflake")
  }
  else if(weatherData.weather[0].main == "Clear"){
    svgItem.classList.add("fa-solid")
    svgItem.classList.add("fa-sun")
  }
  else if(weatherData.weather[0].main == "Clouds"){
    svgItem.classList.add("fa-solid")
    svgItem.classList.add("fa-cloud")
  } else{
    svgItem.classList.add("fa-solid")
    svgItem.classList.add("fa-face-dizzy")
  }
}



export {
  capitalize,
  formatDate,
  getHour,
  daysOfTheWeek,
  checkValidDay,
  svgPicker,
}
