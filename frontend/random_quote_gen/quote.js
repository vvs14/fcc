$(document).ready( function() {
  $("#getNewQuoteBtn").click( function() {
    var request = new XMLHttpRequest();
    var boxColors = ["Blue","Brown","BurlyWood","CadetBlue","Chocolate","Coral","CornflowerBlue","Crimson","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkOliveGreen","Darkorange","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkViolet","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","ForestGreen","GoldenRod","Gray","Grey","Green","IndianRed","Indigo","LightCoral","LightSalmon","LightSeaGreen","LightSkyBlue","LightSteelBlue","Maroon","MediumSeaGreen","MediumSlateBlue","MediumTurquoise","MediumVioletRed","MidnightBlue","Navy","Olive","OliveDrab","Orange","PaleVioletRed","Peru","Plum","PowderBlue","Purple","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","Sienna","SkyBlue","SlateBlue","SlateGray","SlateGrey","SteelBlue","Tan","Teal","Tomato","Turquoise","Violet"];
    $.ajax( {
      beforeSend: function(request) {
        request.setRequestHeader("X-Mashape-Key","4NdvxRO66gmshRekE7U8D6WOrfdQp1QjawIjsn4U3iclF7Vnmy");
        request.setRequestHeader("Accept","application/json");
      },
      type: "GET",
      url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1",
      processData: true,
      dataType: "json",
      success: function(responseData){
        /*console.log(responseData);
        console.log(responseData.author);*/
        var boxColor = boxColors[Math.floor(Math.random() * boxColors.length)];
        $("#quotePara").html("<q>" + responseData.quote+ "</q>");
        $(".author").text("-"+responseData.author);
        /*$("#centerBox").css("background-color", boxColor).fadeIn(1000);*/
        $("#centerBox").css("background-color", boxColor);
        $("body").css("background-color", boxColor);
        console.log(boxColor);
      },
      error: function(req, err){ console.log('Some error occured here ' + err); }
    });
  });
});