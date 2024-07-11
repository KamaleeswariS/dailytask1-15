let container = document.createElement("div")
container.classList.add("container", "table-responsive")

let table = document.createElement("table");
table.setAttribute('id', 'table');
table.classList.add("table")

let thead = document.createElement("thead")
thead.classList.add("bg-dark", "text-light")

let trHead = document.createElement("tr")

let tdHead1 = document.createElement("td")
tdHead1.innerHTML = "Id"

let tdHead2 = document.createElement("td")
tdHead2.innerHTML = "Name"

let tdHead3 = document.createElement("td")
tdHead3.innerHTML = "Email"
let tbody = document.createElement("tbody")
tbody.setAttribute("id", "table-body")

let span = document.createElement("span")
span.innerHTML = ""

let pagination = document.createElement("div")
pagination.setAttribute("id", "buttons")
 pagination.classList.add("container", "buttons")

  pagination.setAttribute('class','d-flex justify-content-center')

// append the all 
trHead.append(tdHead1)
trHead.append(tdHead2)
trHead.append(tdHead3)
thead.append(trHead)

table.append(thead)
table.append(tbody)
container.append(span)
container.append(table)

document.body.append(container)
container.append(pagination)

function createTableRow(id, name, email) {
    let tr = document.createElement("tr")
    let td1 = document.createElement("td")
    let td2 = document.createElement("td")
    let td3 = document.createElement("td")
    td1.innerHTML = id
    td2.innerHTML = name
    td3.innerHTML = email
    tr.append(td1)
    tr.append(td2)
    tr.append(td3)
    tbody.append(tr)
}
//XMLHttpRequest in Json format...............
let request = new XMLHttpRequest();
request.open("GET", "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json", true);
request.send();
request.onload = function () {
    let tabledata = JSON.parse(this.response);

    let Setdata = {
        "queryset": tabledata,
        "page": 1,
        "rows": 10,
        "window": 10
    }

    buildTable()
    function pagination(queryset, page, rows) {
        let trimStart = (page - 1) * rows;
        let trimEnd = trimStart + rows;
        let trimedData = queryset.slice(trimStart, trimEnd)
        let pages = Math.ceil(tabledata.length / rows);
        return {
            "queryset": trimedData,
            "pages": pages
        }
    }

    function pageButtons(pages) {
        let ss = document.getElementById("buttons")
        ss.innerHTML = ""
        let maxLeft = (Setdata.page - Math.floor(Setdata.window / 2));
        let maxRight = (Setdata.page + Math.floor(Setdata.window / 2));
        if (maxLeft < 1) {
            maxLeft = 1
            maxRight = Setdata.window
        }
        if (maxRight > pages) {
            maxLeft = pages - (Setdata.window - 1)
            maxRight = pages
            if (maxLeft < 1) {
                maxLeft = 1;

            }
        }
        for (let page = maxLeft; page <= maxRight; page++) {
            ss.innerHTML = ss.innerHTML + `<button value="${page}" class="page">${page}</button>`

        }
        if (Setdata.page !== 1) {
            ss.innerHTML = `<button value=${1} class="page"> First</button>` + ss.innerHTML
        }
        if (Setdata.page != pages) {
            ss.innerHTML += `<button value=${pages} class="page">Last</button>`
        }
        let dd = document.getElementById("buttons")
        dd.addEventListener("click", function (e) {
            document.getElementById("table-body").innerHTML = ""
            Setdata.page = Number(e.target.value)
            buildTable()
        })

    }

    function buildTable() {
        let data = pagination(Setdata.queryset, Setdata.page, Setdata.rows)
        let array = data.queryset
        for (let i = 0; i < array.length; i++) {
            createTableRow(array[i].id, array[i].name, array[i].email);
        }
        pageButtons(data.pages)
    }
}