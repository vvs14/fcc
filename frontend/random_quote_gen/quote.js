//http://usejsdoc.org/about-getting-started.html
/** 
 * Function to get background color for box and body
 */
function getBackgroundColor() {
    var boxColors = ["Blue", "Brown", "BurlyWood", "CadetBlue", "Chocolate", "Coral", "CornflowerBlue", "Crimson", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkOliveGreen", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkViolet", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "ForestGreen", "GoldenRod", "Gray", "Grey", "Green", "IndianRed", "Indigo", "LightCoral", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSteelBlue", "Maroon", "MediumSeaGreen", "MediumSlateBlue", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "Olive", "OliveDrab", "Orange", "PaleVioletRed", "Peru", "Plum", "PowderBlue", "Purple", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "Sienna", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "SteelBlue", "Tan", "Teal", "Tomato", "Turquoise"];
    return boxColors[Math.floor(Math.random() * boxColors.length)];
}

/** 
 * Function to change view
 * @param {ajaxResponse} responseData
 * @param {string} backgroundColor - Background color to be used for center box and body
 */
function changeView(responseData, backgroundColor) {
    $("#quotePara").html("<q>" + responseData.quote + "</q>");
    $(".author").text("- " + responseData.author);
    $("#centerBox").css("background-color", backgroundColor);
    $("body").css("background-color", backgroundColor);
}

/**
* Function to set text of tweet in href
* @param {ajaxResponse} responseData
*/
function setTweetText(responseData) {
    var newHref = "https://twitter.com/intent/tweet?hashtags=quotes&text=\'" + responseData.quote + "\' " + responseData.author;
    document.getElementById("twitterBtn").setAttribute("href", newHref);
    //console.log(newHref);
    console.log(document.getElementById("twitterBtn").getAttribute("href"));
}


/**
 * Function to change view when newQuoteBtn is clicked.
 */
$(document).ready(function() {
    $("#getNewQuoteBtn").click(function() {
      
        var ajaxCall = $.ajax({
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-Mashape-Key", "4NdvxRO66gmshRekE7U8D6WOrfdQp1QjawIjsn4U3iclF7Vnmy");
                xhr.setRequestHeader("Accept", "application/json");
            },
            type: "GET",
            url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1",
            processData: true,
            dataType: "json"
        });

        ajaxCall.done(function(responseData) {
            var backgroundColor = getBackgroundColor();
            changeView(responseData, backgroundColor);
            setTweetText(responseData);
            //console.log(responseData.author + " "+ backgroundColor);
        });

        ajaxCall.fail(function(jqXHR, textStatus, errorThrown) {
            // If fail
            console.log(textStatus + ': ' + errorThrown);
        });
    });
});