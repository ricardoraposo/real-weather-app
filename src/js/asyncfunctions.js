import config from "./config"

const apiKey = config.SECRET_API_KEY

async function getLocationData(locationInput) {
  const fetchData = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${locationInput}&limit=5&appid=${apiKey}`, { mode: 'cors' })
  const locationData = await fetchData.json()
  return locationData
}

async function getWeather(locationInput) {
  console.log("fodase vc broder")
  const locationData = await getLocationData(locationInput)
  const fetchData = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${locationData[0].lat}&lon=${locationData[0].lon}&appid=${apiKey}&units=metric`, { mode: 'cors' })
  const weatherData = await fetchData.json()
  return weatherData
}

async function getCurrentDate (locationInput) {
  const weatherData = await getWeather(locationInput)
  const response = await fetch(`https://worldtimeapi.org/api/timezone/${weatherData.timezone}`)
  const timezoneData = await response.json()
  return timezoneData
}


export {getWeather, getLocationData, getCurrentDate}
