var lat, lon, userLocation;

function setBackgroundAndText(icon) {
  if (icon === "partly-cloudy-day") {
    icon = 'cloudy';
  }
  var img = "../img/" + icon + ".jpg";
  var imgUrl = 'url(' + img + ')';
  var bg = imgUrl + " no-repeat " + "center center fixed";
  document.body.style.background = bg;
  document.body.style.backgroundSize = "cover";
}

/**
 * Function to get location of user
 */
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      console.log('Geolocation supported.');
    })
  } else {
    console.log('HTML5 Geolocation is not supported in this browser.');
    var ipApiRequest = $.ajax({
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Accept', 'application/json');
      },
      type: 'GET',
      url: 'http://ip-api.com/json',
      processData: true,
      dataType: 'json'
    });

    ipApiRequest.done(function(response) {
      lat = response.lat;
      lon = response.lon;
      console.log(lat);
      console.log(lon);
    });
  }
};

/**
 * Funtion to convert lattitude and longitude to human readable location
 */
function reverseGeocodingAjax() {
  var getReadableLocation = $.ajax({
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Accept', 'application/json');
    },
    type: 'GET',
    url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&sensor=true',
    dataType: 'json'
  });

  getReadableLocation.done(function(response) {
    userLocation = response.results[5].formatted_address;
    document.getElementById('location').innerHTML = userLocation;
    console.log(userLocation);
  });
}

function getWeatherAjax() {
  var getWeather = $.ajax({
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Accept', 'application/json');
    },
    type: 'GET',
    url: 'https://crossorigin.me/https://api.darksky.net/forecast/48774be7d0c487b65dca6d2947c57c2b/' + lat + ',' + lon,
    dataType: 'json'
  });

  getWeather.done(function(response) {
    console.log(response);
    document.getElementById('humidity').innerHTML = response.currently.humidity;
    document.getElementById('temperature').innerHTML = response.currently.temperature + '&deg;F';
    document.getElementById('wind').innerHTML = response.currently.windSpeed + ' miles/h';
    setBackgroundAndText(response.currently.icon);
  });
}

/**
 * Function to change view when page is refreshed/loaded.
 */
$(document).ready(function() {

  getLocation();
  setTimeout(reverseGeocodingAjax, 2000);
  setTimeout(getWeatherAjax, 1500);
  $('#refreshBtn').click(getWeatherAjax);
});