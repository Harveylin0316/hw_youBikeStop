// 程式碼寫這裡

const API =
  "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"

const sitelist = document.querySelector(".siteList")

async function findYoubikeSite(searchKeyword) {
  const rawData = await fetch(API)
  const youbikeData = await rawData.json()
  // 找出含有搜尋名稱地址的陣列
  let matchingStop = youbikeData.filter((data) =>
    data.ar.includes(searchKeyword)
  )

  matchingStop.forEach((station) => {
    sitelist.insertAdjacentHTML(
      "afterbegin",
      `<li class="list-group-item fs-5">
    <i class="fas fa-bicycle"></i>
    ${station.sna} (${station.sbi})<br />
    <small class="text-muted">${station.ar}</small>
  </li>`
    )
  })
}

document.querySelector("#searchKeyword").addEventListener("keyup", (e) => {
  const searchKeyword = document.querySelector("#searchKeyword").value
  if (e.key === "Enter") {
    if (searchKeyword == "") {
      alert("請輸入")
    } else {
      sitelist.innerHTML = ``
      findYoubikeSite(searchKeyword)
    }
    event.preventDefault()
  }
})

document.querySelector(".btn-success").addEventListener("click", () => {
  const searchKeyword = document.querySelector("#searchKeyword").value
  if (searchKeyword == "") {
    alert("請輸入")
  } else {
    sitelist.innerHTML = ``
    findYoubikeSite(searchKeyword)
  }
  event.preventDefault()
})
