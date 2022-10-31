
// Create Filter Function
let categories = document.querySelectorAll(".cat-filter li");

categories.forEach((li) => {
    li.addEventListener("click", removeActive);
    li.addEventListener("click", filterSection);
});

function removeActive() {
    categories.forEach((li) => {
        li.classList.remove("active");
        this.classList.add("active");
    })
};

function filterSection() {
    document.querySelectorAll(".all").forEach((img) => {
        img.style.display = "none";
    });
    document.querySelectorAll(this.dataset.cat).forEach((imgShow) => {
        imgShow.style.display = "block";
    })
}

// **********End Section*************

// Create Form Function

let placeName = document.getElementById("place-name");
let price = document.getElementById("price");
let info = document.getElementById("info");
let pic1 = document.getElementById("pic1");
let pic2 = document.getElementById("pic2");
let place = document.getElementById("location");
let submitBtn = document.getElementById("submit");

let listPlaces;

// console.log(localStorage.getItem("place"));
if (localStorage.getItem != null) {
    listPlaces = JSON.parse(localStorage.places);
} else {
    listPlaces = [];
}

let mode = "add";
let tmp;
submitBtn.addEventListener("click", function () {

    if (placeName.value !== "" || price.value) {

        let placeInput = {
            placeName: placeName.value,
            price: price.value,
            info: info.value,
            pic1: pic1,
            pic2: pic2,
            place: place.value,
        }
        
        if (mode === "add") {
            listPlaces.push(placeInput);
            // console.log(listPlaces);
            clearData();
            showPlaces();
        } else {
            listPlaces[tmp] = placeInput;
            clearData();
            showPlaces();
            mode = "add";
            submitBtn.innerHTML = "إضافة";
        }
        localStorage.setItem("places", JSON.stringify(listPlaces));
    }
});


let reader = new FileReader();
function saveImage(img) {
    img.addEventListener("change", function () {
        
        reader.addEventListener("load", function () {
            return this.result;
        })

        reader.readAsDataURL(this.files[0]);
    })
}

function clearData() {
    placeName.value = "";
    price.value = "";
    info.value = "";
    pic1 = "";
    pic2 = "";
    place.value = "";
};

let tBody = document.getElementById("tbody");

function showPlaces() {
    let table = "";
    for (let i = 0; i < listPlaces.length; i++) {
        table += `
        <tr draggable="true">
            <td>${i}</td>
            <td>${listPlaces[i].placeName}</td>
            <td>${listPlaces[i].price}</td>
            <td>
                <button onclick="updateData(${i})" class="btn" id="update">تعديل</button>
                <button href="" onclick="deleteData(${i})" class="btn" id="delete">حذف</button>
            </td>
        </tr>
        `
        tBody.innerHTML = table;
        // document.getElementById("testImg").setAttribute("src", listPlaces[i].pic1);
    }
};

showPlaces();

function deleteData(i) {
    listPlaces.splice(i, 1);
    localStorage.places = JSON.stringify(listPlaces);
    showPlaces();
}

function updateData(i) {
    mode = "update";
    tmp = i;
    placeName.value = listPlaces[i].placeName;
    price.value = listPlaces[i].price;
    info.value = listPlaces[i].info;
    place.value = listPlaces[i].place;

    submitBtn.innerHTML = "تعديل";
}

let trTable = document.querySelectorAll("#tbody tr");
let drag = null;
console.log(trTable);

function dragTr() {
    
    trTable.forEach((tr, index) => {
        tr.addEventListener("dragstart", function () {
            this.style.opacity = ".5";
            console.log(index)
        });
        tr.addEventListener("dragend", function () {
            tBody.append(tr);
            this.style.opacity = "1";
        });
        
})
}
dragTr();

let speech = new SpeechSynthesisUtterance();
speech.lang = "en";
// **********End Section*************

// Start Footer Section

let btnTextarea = document.querySelector(".btn-textarea");
let textArea = document.querySelector("textarea");



btnTextarea.onclick = function () {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    recognition.lang = "ar-AR";
    recognition.onresult = function(event) {
        let transcript = event.results[0][0].transcript;
        textArea.innerHTML = transcript;
    };
  
     // start recognition
     recognition.start();
}



// Send Message
let submitBtnTxtArea = document.querySelector(".btn-textarea-submit");

    function sendMessage() {
        Email.send({
            SecureToken : "802d792f-c9ad-461e-87bc-8c59063cd96d",
            To : 'elnegmabdo@gmail.com',
            From : "elnegmabdo@gmail.com",
            Subject : "موقع جونيور",
            Body : textArea.value
        }).then(
        message => alert(message)
        );
        textArea.value = "";
        };

    submitBtnTxtArea.addEventListener("click", sendMessage);
// **********End Section*************

// ********** Start Product Page **********

let searchInput = document.getElementById("search");
console.log(searchInput);