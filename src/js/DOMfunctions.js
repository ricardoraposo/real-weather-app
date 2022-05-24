import { capitalize, formatDate, getHour, daysOfTheWeek, checkValidDay, svgPicker, } from "./util"
import "../../node_modules/@fortawesome/fontawesome-free/css/all.css"
import "../../node_modules/@fortawesome/fontawesome-free/js/all.js"

const body = document.body
const topWrapper = document.createElement("div")
const bottomWrapper = document.createElement("div")
body.appendChild(topWrapper)
body.appendChild(bottomWrapper)
topWrapper.classList.add("top-wrapper")
bottomWrapper.classList.add("bottom-wrapper")

async function renderLeftWrapper(weather, location, date) {
  const rightWrapper = document.createElement("div")
  rightWrapper.classList.add("right-wrapper")
  const currentDescription = document.createElement("div")
  currentDescription.classList.add("desc-big")
  currentDescription.textContent = capitalize(weather.current.weather[0].description)
  const locationName = document.createElement("div")
  locationName.classList.add("desc-medium")
  locationName.textContent = location[0].name
  const dateDiv = document.createElement("div")
  dateDiv.classList.add("desc-small")
  dateDiv.textContent = formatDate(date.datetime, date.day_of_week)
  const hour = document.createElement("div")
  hour.classList.add("desc-small")
  hour.textContent = getHour(date.datetime)
  const currentTemp = document.createElement("div")
  currentTemp.classList.add("desc-extra-big")
  currentTemp.textContent = `${Math.round(weather.current.temp)} ºC`
  const svgIcon = document.createElement("i")
  svgPicker(weather.current, svgIcon)
  svgIcon.classList.add("svg-icon")
  const searchDiv = document.createElement("div")
  searchDiv.classList.add("search")
  const searchInput = document.createElement("input")
  searchInput.classList.add("search-input")
  searchInput.setAttribute("placeholder", "Search location here...")
  searchInput.setAttribute("id", "search-input")
  const searchButton = document.createElement("a")
  const searchButtonSvg = document.createElement("i")
  searchButton.setAttribute("id","search-button")
  searchButtonSvg.classList.add("search-button")
  searchButtonSvg.classList.add("fa-solid")
  searchButtonSvg.classList.add("fa-magnifying-glass")
  searchButton.appendChild(searchButtonSvg)
  searchDiv.appendChild(searchInput)
  searchDiv.appendChild(searchButton)
  rightWrapper.appendChild(currentDescription)
  rightWrapper.appendChild(locationName)
  rightWrapper.appendChild(dateDiv)
  rightWrapper.appendChild(hour)
  rightWrapper.appendChild(currentTemp)
  rightWrapper.appendChild(svgIcon)
  rightWrapper.appendChild(searchDiv)
  topWrapper.appendChild(rightWrapper)
}

async function renderRightWrapper(weather) {
  const leftWrapper = document.createElement("div")
  leftWrapper.classList.add("left-wrapper")
  const feelsLikeWrapper = renderInfoBlock("Feels Like", `${Math.round(weather.current.feels_like)}ºC`, "fa-temperature-half")
  const humidityWrapper = renderInfoBlock("Humidity", `${weather.current.humidity}%`, "fa-droplet")
  const chanceOfRainWrapper = renderInfoBlock("Chance of Rain", `${weather.daily[0].pop * 100}%`, "fa-cloud-rain")
  const windSpeedWrapper = renderInfoBlock("Wind Speed", `${weather.current.wind_speed} km/h`, "fa-wind")
  leftWrapper.appendChild(feelsLikeWrapper)
  leftWrapper.appendChild(humidityWrapper)
  leftWrapper.appendChild(chanceOfRainWrapper)
  leftWrapper.appendChild(windSpeedWrapper)
  topWrapper.appendChild(leftWrapper)
}

function renderInfoBlock(name, data, svg) {
  const feelsLikeWrapper = document.createElement("div")
  feelsLikeWrapper.classList.add("fells-like-wrapper")
  feelsLikeWrapper.classList.add("low")
  const feelsLikeInfoWrapper = document.createElement("div")
  feelsLikeInfoWrapper.classList.add("wide")
  const feelsLikeText = document.createElement("div")
  feelsLikeText.classList.add("desc-small")
  const feelsLikeNumber = document.createElement("div")
  feelsLikeNumber.classList.add("desc-medium")
  const feelsLikeSvg = document.createElement("i")
  feelsLikeSvg.classList.add("fa-solid")
  feelsLikeSvg.classList.add(svg)
  feelsLikeSvg.classList.add("svg-icon-small")
  feelsLikeText.textContent = name
  feelsLikeNumber.textContent = `${data}`
  feelsLikeInfoWrapper.appendChild(feelsLikeText)
  feelsLikeInfoWrapper.appendChild(feelsLikeNumber)
  feelsLikeWrapper.appendChild(feelsLikeSvg)
  feelsLikeWrapper.appendChild(feelsLikeInfoWrapper)
  return feelsLikeWrapper
}

function blockGenerator(date, weather) {
  const weatherBlock = document.createElement("div")
  const dayName = document.createElement("div")
  dayName.classList.add("desc-medium")
  dayName.textContent = date
  const maxTemp = document.createElement("div")
  maxTemp.classList.add("desc-big")
  maxTemp.textContent = `${Math.round(weather.temp.max)} ºC`
  const minTemp = document.createElement("div")
  minTemp.classList.add("desc-medium")
  minTemp.textContent = `${Math.round(weather.temp.min)} ºC`
  const svgIcon = document.createElement("i")
  svgPicker(weather, svgIcon)
  svgIcon.classList.add("svg-icon-block")
  weatherBlock.appendChild(dayName)
  weatherBlock.appendChild(maxTemp)
  weatherBlock.appendChild(minTemp)
  weatherBlock.appendChild(svgIcon)
  bottomWrapper.appendChild(weatherBlock)
}

async function renderBottom(date, weather) {
  let currentDay = date.day_of_week + 1
  weather.daily.forEach(day => {
    if (day == weather.daily[0]) return
    blockGenerator(daysOfTheWeek[currentDay], day)
    checkValidDay(currentDay) ? currentDay++ : currentDay = 0
  });
}

export {
  renderLeftWrapper,
  renderRightWrapper,
  renderBottom,
}
