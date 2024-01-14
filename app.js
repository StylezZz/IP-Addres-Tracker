
var map = L.map('map',
    {minZoom: 3,}).setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var myIconMark = L.icon({
    iconUrl : 'images/icon-location.svg',
    iconSize : [46, 56],
    iconAnchor : [23, 56],
    popupAnchor : [0, -10]  
});

var marker = L.marker([51.505, -0.09], {icon: myIconMark}).addTo(map);



const inputValue = document.getElementById('ip-text');
const searchButton = document.getElementById('submit');

searchButton.addEventListener('click',(e)=>{
    e.preventDefault();
    const ipAddress = inputValue.value;
    if(ipAddress===''){
        alert('Debe ingresar una dirección IP');
    }else{
        const URL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_7LeSgveLvHVL9YQDkiK7VMwdSb8w4&ipAddress=${ipAddress}`;
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const idAdressP = document.getElementById('ip-adress');
            const locationP = document.getElementById('location');
            const timezoneP = document.getElementById('timezone');
            const ispP = document.getElementById('isp');
            
            idAdressP.innerHTML = data.ip;
            locationP.innerHTML = data.location.country + ', ' + data.location.region + ' ' + data.location.postalCode;
            timezoneP.innerHTML = data.location.timezone;
            ispP.innerHTML = data.isp;

            const latitud = data.location.lat;
            const lotitud = data.location.lng;

            map.setView([latitud, lotitud], 13);
            marker.setLatLng([latitud, lotitud]);
        })
    }
})

//Cuando la pagina termine de cargarse

window.addEventListener('load',()=>{
    const success = (position)=>{
        console.log(position);
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
        map.setView([latitud, longitud], 13);
        marker.setLatLng([latitud, longitud]);
    }

    const error = (error)=>{
        console.log('Debe permitir la ubicación');
    }

    navigator.geolocation.getCurrentPosition(success, error);

});



