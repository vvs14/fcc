var lat, lon, userLocation;

/**
 * Function to get location of user
 */
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      console.log('Geolocation supported.');
      console.log(lat);
      console.log(lon);
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

function reverseGeocoding() {
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

/**
 * Function to set element text
 * @param {string} id of element
 */

function setElementText(id, response) {
    console.log(response);
    /*document.getElementById(id)*/
  }
  /**
   * Function to change view when page is refreshed/loaded.
   */
$(document).ready(function() {

  getLocation();
  setTimeout(reverseGeocoding, 1500);
  setTimeout(function makeAjaxCall() {
    var getWeather = $.ajax({
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Accept', 'application/json');
      },
      type: 'GET',
      url: 'https://crossorigin.me/https://api.darksky.net/forecast/48774be7d0c487b65dca6d2947c57c2b/' + lat + ',' + lon,
      dataType: 'json'
    });

    getWeather.done(function(response) {
      document.getElementById('humidity').innerHTML = response.currently.humidity;
      document.getElementById('temperature').innerHTML = response.currently.temperature+'&deg;F';
      document.getElementById('wind').innerHTML = response.currently.windSpeed+ ' miles/h';
//      console.log(response.currently.humidity);
//      console.log(response.currently.temperature);
//      console.log(response.currently.windSpeed);
    });
  }, 2000);
});