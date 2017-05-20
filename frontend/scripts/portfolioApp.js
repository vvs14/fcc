$(document).ready(function () {
  
  $("#dropdownTributeAnchor, #homeAnchor, #brandAnchor, #dropdownConfusionAnchor").click(function(){
    var anchorClicked =  $(this).attr('id');
    $("div div div ul li").removeClass("active");
    $(".tab-pane").removeClass("active");
    if(anchorClicked==="dropdownTributeAnchor" ||
       anchorClicked=="homeAnchor"||
       anchorClicked=="brandAnchor"){
      $("#tributeTabListItem").addClass("active");
      $("#tributeProject").addClass("active in");
    }
    else {
      $("#confusionTabListItem").addClass("active");
      $("#confusionProject").addClass("active in");
    }
  });
  
});