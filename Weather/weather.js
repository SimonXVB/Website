const city = document.getElementById("city-data");
const humidity = document.getElementById("humidity-data");
const visibility = document.getElementById("visibility-data");
const temp = document.getElementById("temp-data");
const desc = document.getElementById("desc-data");
const input = document.getElementById("input");
const submit = document.getElementById("submit");

const apiKey = "";

async function getData() {
submit.addEventListener("click", (e) => {

    e.preventDefault
    const link = `http://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}`

    if(input.value === ""){
        desc.innerHTML = "ENTER CITY NAME!"
        desc.style.color = "red"
    }
    else{
        fetch(link)
            .then((res) => {
                if(!res.ok){
                    throw new Error('Network response was not ok');
                }
                return res.json();
                })
                .then((data) => {
                    city.innerText = data.name
                    humidity.innerText = `${data.main.humidity}%`
                    visibility.innerText = `${data.visibility}m`
                    temp.innerText = `${(data.main.temp - 273.15).toFixed(1)}°C`
                    desc.innerText = (data.weather[0].description).toUpperCase()
            })
            .catch((error) => {
                console.error("Error:", error);
                desc.innerText = "CITY NOT FOUND!"
                desc.style.color = "red"
            });
            input.value = ""
        }}
    );
};
getData()