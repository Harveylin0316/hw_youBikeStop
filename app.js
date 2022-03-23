// 程式碼寫這裡

const API =
  "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"

const sitelist = document.querySelector(".siteList")
const form = document.querySelector("#searchForm")

async function findYoubikeSite(searchKeyword) {
  const rawData = await fetch(API)
  const youbikeData = await rawData.json()
  // 找出含有搜尋名稱地址的陣列
  let matchingStop = youbikeData.filter((data) =>
    data.ar.includes(searchKeyword)
  )

  matchingStop.forEach((station) => {
    sitelist.insertAdjacentHTML(
      "beforeend",
      `<li class="list-group-item fs-5">
    <i class="fas fa-bicycle"></i>
    ${station.sna.replace("YouBike2.0_", "")} (${station.sbi})<br />
    <small class="text-muted">${station.ar}</small>
  </li>`
    )
  })
}

form.addEventListener("submit", (e) => {
  const searchKeyword = document.querySelector("#searchKeyword")

  event.preventDefault()
  if (searchKeyword.value === "") return alert("請輸入路名關鍵字")

  sitelist.innerHTML = ``
  findYoubikeSite(searchKeyword.value)
})
