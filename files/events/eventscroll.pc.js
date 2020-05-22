
$(document).ready(function() {
    var curPage = 1
    var numOfPages = $(".skw-page").length
    var animTime = 1000
    var scrolling = false
    var pgPrefix = ".skw-page-"
    var $body = $("body")
    $body.removeClass().addClass("page-1")
    function pagination() {
      scrolling = true
  
      $(pgPrefix + curPage).removeClass("inactive").addClass("active");
      $(pgPrefix + (curPage - 1)).addClass("inactive");
      $(pgPrefix + (curPage + 1)).removeClass("active");
  
      setTimeout(function() {
        scrolling = false;
      }, animTime);
        $body.removeClass().addClass("page-" + curPage)
    }
  
    function navigateUp() {
      if (curPage === 1) return
      curPage--
      pagination()
    }
  
    function navigateDown() {
      if (curPage === numOfPages) return
      curPage++
      pagination()
    }
  
    $(document).on("mousewheel DOMMouseScroll", function(e) {
      if (scrolling) return;
      if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
        navigateUp()
      } else {
        navigateDown()
      }
    })
  
    $(document).on("keydown", function(e) {
      if (scrolling) return
      if (e.which === 38) {
        navigateUp()
      } else if (e.which === 40) {
        navigateDown()
      }
    })
  
    $("#page1").click(function() {
      curPage = 1
      pagination()
    })
  
    $("#page2").click(function() {
      curPage = 2
      pagination()
    })
    $("#page3").click(function() {
      curPage = 3
      pagination()
    })
    $("#page4").click(function() {
      curPage = 4
      pagination()
    })
    $("#page5").click(function() {
      curPage = 5
      pagination()
    })
    $("#page6").click(function() {
      curPage = 6
      pagination()
    })
    $("#page7").click(function() {
      curPage = 7
      pagination()
    })
    $("#page8").click(function() {
      curPage = 8
      pagination()
    })
    $("#page9").click(function() {
      curPage = 9
      pagination()
    })
    $("#page10").click(function() {
      curPage = 10
      pagination()
    })
    $("#page11").click(function() {
      curPage = 11
      pagination()
    })
    $("#page12").click(function() {
      curPage = 12
      pagination()
    })
    $("#page13").click(function() {
      curPage = 13
      pagination()
    })
  })