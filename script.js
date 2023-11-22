let boxes = document.querySelector(".boxes");
let sp = document.querySelector("span");
let cit = document.querySelector("h1");
console.log(boxes);
filterGetCity = (selectedCity) => {
    let requist = new XMLHttpRequest();
    let country = "MA";
    let city = selectedCity;
    requist.open("GET",`http://api.aladhan.com/v1/timingsByCity?country=${country}&city=${city}`);
    requist.responseType = "json";
    requist.send();
    requist.onload = () => {
        if(requist.status >=200 && requist.status < 300 ){
            let time = requist.response;
            let c = selectedCity;
            let x = time.data.timings;
            let d = time.data.date.readable;
            cit.innerHTML = c;
            sp.innerHTML = d.replace("Nov","نوفمبر").replace("Jan","يناير").replace("Feb","فبراير").replace("Mar","مارس").replace("Apr","ابريل").replace("May","ماي").replace("June","يونيو").replace("July","يوليوز").replace("Aug","غشت").replace("Sept","سبتمبر").replace("Oct","اكتوبر").replace("Dec","ديسمبر");
            let res = Object.keys(x).map((key)=>[key,x[key]]);
            console.log(typeof res);
            boxes.innerHTML = "";
            res.forEach(element => {
                boxes.innerHTML += `<div class="box"><h3>${element[0].replace("Fajr","الفجر").replace("Asr","العصر").replace("Isha","العشاء").replace("Dhuhr","الظهر").replace("Maghrib","المغرب").replace("Sunrise","شروق الشمس").replace("Sunset","غروب").replace("Imsak","إمساك").replace("Midnight","منتصف الليل").replace("Firstthird","الاول الثالث").replace("Lastthird","الثلث الأخير")}</h3><h1>${element[1]}</h1></div>`
            });
            
            console.log("succusfuly");
        }
        else {
            console.log("error");
        }
    }
}



const selectElement = document.getElementById("mySelect");

selectElement.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    filterGetCity(selectedOption);
});