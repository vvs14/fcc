$(document).ready(function () {
  //Tribute Project
  $("#dropdownTributeAnchor").click(function () {
    $("div div div ul li").removeClass("active");
    $(".tab-pane").removeClass("active");
    $("#tributeTabListItem").addClass("active");
    $("#tributeProject").addClass("active in");
  });
  //ConfusionProject
  $("#dropdownConfusionAnchor").click(function(){
    $("div div div ul li").removeClass("active");
    $(".tab-pane").removeClass("active");
    $("#confusionTabListItem").addClass("active");
    $("#confusionProject").addClass("active in");
  });
});