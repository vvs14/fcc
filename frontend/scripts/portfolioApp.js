$(document).ready(function () {
  
  $("#dropdownTributeAnchor, #dropdownConfusionAnchor").click(function(){
    var anchorClicked =  $(this).attr('id');
    $("div div div ul li").removeClass("active");
    $(".tab-pane").removeClass("active");
    if(anchorClicked==="dropdownTributeAnchor"){
      $("#tributeTabListItem").addClass("active");
      $("#tributeProject").addClass("active in");
    }
    else {
      $("#confusionTabListItem").addClass("active");
      $("#confusionProject").addClass("active in");
    }
  });

  //When clicked on home or brand
  $("#homeAnchor,#brandAnchor").click(function(){
    $("div div div ul li").removeClass("active");
    $(".tab-pane").removeClass("active");
    $("#tributeTabListItem").addClass("active");
    $("#tributeProject").addClass("active in");
  });
  
});