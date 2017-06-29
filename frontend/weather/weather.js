var lat, lon, userLocation;
var temperature, temperatureUnit = 'F';
var speed, speedUnit='miles';

function setBackgroundAndText(icon) {
//  if (icon === "partly-cloudy-day") {
//    icon = 'cloudy';
//  }
//  var img = "../img/" + icon + ".jpg";
  var imgUrl;
  switch(icon){
    case 'wind':
      imgUrl = "url('https://preview.ibb.co/nkpdsk/wind_PKIMf_Q.jpg')";
      break;
    case 'sunny':
      imgUrl = "url('https://preview.ibb.co/iSMPXk/sunny_Yk_UAiv.jpg')";
      break;
    case 'snow':
      imgUrl = "url('https://preview.ibb.co/kAzpyQ/snow_g_Fk2ed.jpg')";
      break;
    case 'sleet':
      imgUrl = "url('https://preview.ibb.co/d8vjXk/sleet_6_Vi7_Dn.jpg')";
      break;
    case 'rain':
      imgUrl = "url('https://preview.ibb.co/dReYQ5/rain_fia_MIW.jpg')";
      break;
    case 'partly-cloudy-night':
      imgUrl = "url('https://preview.ibb.co/iwZBCk/partly_cloudy_night.jpg')";
      break;
    case 'hot':
      imgUrl = "url('https://preview.ibb.co/dhK8Q5/Webp_net_compress_image.jpg')";
      break;
    case 'fog':
      imgUrl = "url('https://preview.ibb.co/kNUpyQ/fog_8_WKnpw.jpg')";
      break;
    case 'cold':
      imgUrl = "url('https://preview.ibb.co/eUAjXk/cold_Ev_Il_SQ.jpg')";
      break;
    case 'cloudy':
      imgUrl = "url('https://preview.ibb.co/ft5wdQ/cloudy_PC15qn.jpg')";
      break;
    case 'clear-night':
      imgUrl = "url('https://preview.ibb.co/d0eNJQ/clear_night_9z_WCCN.jpg')";
      break;
    case 'clear-day':
      imgUrl = "url('https://preview.ibb.co/czTGdQ/clear_day_g_Ti_Yf_G.jpg')";
      break;
    
  }
  var bg = imgUrl + " no-repeat " + "center center fixed";
  document.body.style.background = bg;
  document.body.style.backgroundSize = "cover";
}

function resetElements(){
  document.getElementById('humidity').innerHTML = '---';
  document.getElementById('temperature').innerHTML = '---';
  document.getElementById('wind').innerHTML = '---';
}

function toggleTempUnit() {
    if (temperatureUnit == 'F') {
      temperature = ((temperature - 32) / 1.8).toFixed(2);
      temperatureUnit = 'C';

    } else {
      temperature = (temperature * 1.8 + 32).toFixed(2);
      temperatureUnit = 'F';
    }
    document.getElementById('temperature').innerHTML = temperature + '<a id="tempUnit" href="#">&deg;' + temperatureUnit + '</a>';
}

function toggleSpeedUnit() {
    if (speedUnit == 'miles') {
      speed = (speed* 1.6).toFixed(2);
      speedUnit = 'km';

    } else {
      speed = (speed* 0.6).toFixed(2);
      speedUnit = 'miles';
    }
    document.getElementById('wind').innerHTML = speed +' <a id="speedUnit" href="#"> '+ speedUnit + '/h</a>';
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
    url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&sensor=true',
    dataType: 'json'
  });

  getReadableLocation.done(function(response) {
    console.log(response);
    userLocation = response.results[4].address_components[0].long_name;
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
    url: 'https://crossorigin.me/https://api.darksky.net/forecast/48774be7d0c487b65dca6d2947c57c2b/' + lat + ',' + lon + '?exclude=minutely, hourly, daily,flags',
    dataType: 'json'
  });

  getWeather.done(function(response) {
    console.log(response);
    temperature = response.currently.temperature;
    temperatureUnit = 'F';
    speedUnit = 'miles';
    speed = response.currently.windSpeed;
    document.getElementById('humidity').innerHTML = response.currently.humidity*100+'%';
    document.getElementById('temperature').innerHTML = temperature + '<a id="tempUnit" href="#">&deg;' + temperatureUnit + '</a>';
    document.getElementById('wind').innerHTML = speed +' <a id="speedUnit" href="#"> '+ speedUnit + '/h</a>';
    setBackgroundAndText(response.currently.icon);
  });
}

/**
 * Function to change view when page is refreshed/loaded.
 */
$(document).ready(function() {

  getLocation();
  var locInterval = setInterval(function weatherUpdate() {
    if (typeof lat != 'undefined' && typeof lon != 'undefined') {
      reverseGeocodingAjax();
      getWeatherAjax();
      clearInterval(locInterval);
    }
  }, 300);
  $('#refreshBtn').click(function(){
    resetElements();
    getWeatherAjax();
  });
  
  $(document).on('click', 'a[id="tempUnit"]', function() {
    toggleTempUnit();
  });
  
  $(document).on('click', 'a[id="speedUnit"]', function() {
    toggleSpeedUnit();
  });
});