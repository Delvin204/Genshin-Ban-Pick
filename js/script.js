let geo = [];
let ameno = [];
let pyro = [];
let hydro = [];
let cryo = [];
let electro = [];
let dendro = [];

function setUp() {
    let player1 = document.getElementById("player1").value;
    let player2 = document.getElementById("player2").value;
    let timer = document.getElementById("timer").value;

    // Kiểm tra giá trị nhập
    if (!player1 || !player2 || !timer) {
        return;
    }

    // Lưu thông tin vào localStorage
    localStorage.setItem("player1", player1);
    localStorage.setItem("player2", player2);
    localStorage.setItem("timer", timer);

    // Chuyển hướng đến trang index.html
    window.location.href = "index.html";
}

// Lấy dữ liệu và hiển thị trên trang index.html
function loadPlayers() {
    let player1 = localStorage.getItem("player1");
    let player2 = localStorage.getItem("player2");

    if (player1 && player2) {
        document.getElementById("name1").innerText = player1;
        document.getElementById("name2").innerText = player2;
    }
    loadChar();
}

// Khai báo biến timer ở ngoài để lưu trữ tham chiếu của setInterval
let timer; 

function countDown() {
    // Nếu đã có một bộ định thời đang chạy, dừng nó
    if (timer) {
        clearInterval(timer);
    }

    // Lấy giá trị từ localStorage
    let countdownTime = parseInt(localStorage.getItem("timer")); // Chuyển đổi thành số nguyên

    // Cập nhật đồng hồ mỗi giây
    timer = setInterval(function () {
        const minutes = Math.floor(countdownTime / 60);
        const seconds = countdownTime % 60;

        // Hiển thị kết quả
        document.getElementById("clock").innerHTML = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Giảm thời gian còn lại
        countdownTime--;

        // Nếu thời gian kết thúc
        if (countdownTime < 0) {
            clearInterval(timer);
            timer = null; // Xóa tham chiếu để có thể chạy lại lần sau
            document.getElementById("clock").innerHTML = "Time's up";
        }
    }, 1000);
}


function useStar(num) {
    switch (num) {
        case 1:
            const star1 = document.getElementById("star1");
            star1.style.transition = "filter 0.5s ease"; // Thêm hiệu ứng chuyển đổi
            star1.style.filter = "grayscale(100%)";
            star1.style.animation = "none";
            break;
    
        case 2:
            const star2 = document.getElementById("star2");
            star2.style.transition = "filter 0.5s ease"; // Thêm hiệu ứng chuyển đổi
            star2.style.filter = "grayscale(100%)";
            star2.style.animation = "none";
            break;
    
        default:
            console.log("No matching case");
            break;
    }    
}

async function readJSON(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error reading JSON:", error);
    }
}

function loadData() {
    // Đọc file JSON và xử lý dữ liệu
    readJSON("character.json").then(data => {
        data.forEach(char => {
            switch (char.element) {
                case "Geo":
                    geo.push(char);
                    break;
                case "Ameno":
                    ameno.push(char);
                    break;
                case "Pyro":
                    pyro.push(char);
                    break;
                case "Hydro":
                    hydro.push(char);
                    break;
                case "Cryo":
                    cryo.push(char);
                    break;
                case "Electro":
                    electro.push(char);
                    break;
                case "Dendro":
                    dendro.push(char);
                    break;
                default:
                    break;
            }
        });

        // Sau khi xử lý xong, lưu các mảng vào localStorage
        localStorage.setItem("geo", JSON.stringify(geo));
        localStorage.setItem("ameno", JSON.stringify(ameno));
        localStorage.setItem("pyro", JSON.stringify(pyro));
        localStorage.setItem("hydro", JSON.stringify(hydro));
        localStorage.setItem("cryo", JSON.stringify(cryo));
        localStorage.setItem("electro", JSON.stringify(electro));
        localStorage.setItem("dendro", JSON.stringify(dendro));
    }).catch(error => {
        console.error("Error loading JSON:", error);
    });
}

// Hàm đọc file JSON
async function readJSON(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error reading JSON:", error);
    }
}

function loadChar() {
    const elements = ["geo", "ameno", "pyro", "hydro", "cryo", "electro", "dendro"];
    
    elements.forEach(element => {
        const data = JSON.parse(localStorage.getItem(element)) || []; // Lấy dữ liệu và chuyển sang array
        const container = document.getElementById(element);

        if (container) {
            data.forEach(char => {
                container.innerHTML += `<img class="col-3 my-2 px-1" style="cursor: pointer;" src="/image/Char/${char.image}" alt="" onclick='pickChar(${JSON.stringify(char)})'>`;
            });
        } else {
            console.warn(`Container for "${element}" not found.`);
        }
    });
}

function pickChar(char) {
    for (let i = 1; i <= 20; i++) {
        let element = document.getElementById(i);
        if (element.getAttribute("src") == "image/Material/empty.svg") {
            element.setAttribute("src", "image/Char/" + char.image);
            element.style.height = "100%";
            element.style.borderRadius = "5px";
            if (char.quality == 5 && (element.getAttribute("id") != 1 && element.getAttribute("id") != 2 && element.getAttribute("id") != 11 && element.getAttribute("id") != 12)) {
                element.parentElement.style.backgroundColor = "#975F2C";
            }
            else if (char.quality == 4 && (element.getAttribute("id") != 1 && element.getAttribute("id") != 2 && element.getAttribute("id") != 11 && element.getAttribute("id") != 12)) {
                element.parentElement.style.backgroundColor = "#726097";
            }
            break;
        }
    }

    let index; // Khai báo index trước
    switch (char.element) {
        case "Geo":
            index = geo.findIndex(charArr => char.name == charArr.name);
            if (index == -1) {
                break;
            }
            geo.splice(index, 1);
            localStorage.setItem("geo", JSON.stringify(geo));
            break;
        case "Ameno":
            index = ameno.findIndex(charArr => char.name == charArr.name);
            if (index == -1) {
                break;
            }
            ameno.splice(index, 1);
            localStorage.setItem("ameno", JSON.stringify(ameno));
            break;
        case "Pyro":
            index = pyro.findIndex(charArr => char.name == charArr.name);
            if (index == -1) {
                break;
            }
            pyro.splice(index, 1);
            localStorage.setItem("pyro", JSON.stringify(pyro));
            break;
        case "Hydro":
            index = hydro.findIndex(charArr => char.name == charArr.name);
            if (index == -1) {
                break;
            }
            hydro.splice(index, 1);
            localStorage.setItem("hydro", JSON.stringify(hydro));
            break;
        case "Cryo":
            index = cryo.findIndex(charArr => char.name == charArr.name);
            if (index == -1) {
                break;
            }
            cryo.splice(index, 1);
            localStorage.setItem("cryo", JSON.stringify(cryo));
            break;
        case "Electro":
            index = electro.findIndex(charArr => char.name == charArr.name);
            if (index == -1) {
                break;
            }
            electro.splice(index, 1);
            localStorage.setItem("electro", JSON.stringify(electro));
            break;
        case "Dendro":
            index = dendro.findIndex(charArr => char.name == charArr.name);
            if (index == -1) {
                break;
            }
            dendro.splice(index, 1);
            localStorage.setItem("dendro", JSON.stringify(dendro));
            break;
        default:
            break;
    }
}

function remove(element) {
    let elementChild = element.children[0]
    elementChild.setAttribute("src", "image/Material/empty.svg");
    elementChild.style.height = "50%";
    element.style.backgroundColor = "rgb(169, 169, 169)";
}