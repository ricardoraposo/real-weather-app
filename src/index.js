import { getWeather, getLocationData, getCurrentDate, } from "./js/asyncfunctions"
import { renderLeftWrapper, renderRightWrapper, renderBottom, } from "./js/DOMfunctions"
import "./style.css"

const locationInput = "belo horizonte"

getCurrentDate(locationInput)

async function renderAll(locationInput) {
  const weatherData = await getWeather(locationInput)
  const locationData = await getLocationData(locationInput)
  const currentDate = await getCurrentDate(locationInput)
  renderLeftWrapper(weatherData, locationData, currentDate)
  renderRightWrapper(weatherData)
  renderBottom(currentDate, weatherData)
}

async function renderAndAddEL() {
  await renderAll(locationInput)
  const topWrapper = document.querySelector(".top-wrapper")
  const bottomWrapper = document.querySelector(".bottom-wrapper")
  const searchButton = document.getElementById("search-button")
  const searchInput = document.getElementById("search-input")

  searchButton.addEventListener("click", async () => {
    if (searchInput.value.trim().length == 0) return
    topWrapper.innerHTML = ""
    bottomWrapper.innerHTML = ""
    await renderAll(searchInput.value)
    searchInput.value = ""
  })
}

renderAndAddEL()
