(function($) {
  $.fn.device = function( options ) {

    var settings = $.extend({}, $.fn.device.defaults, options);
    var deviceCount = 0;

    return this.each( function() {
      var element = $(this);
      var image = element.attr("src");
      var deviceWidth = element.attr("data-width");
      var topHeight = element.attr("data-top");
      var bottomHeight = element.attr("data-bottom");
      var deviceOs = element.attr("data-os");
      var clicked = false, clickY;
      var dragStart, dragProgress, dragEnd, dragDistance;
      deviceCount++;

      console.log(image);

      element.after("<div class='device-wrap device-" + deviceOs + " device-" + deviceCount + "' style='width: " + deviceWidth + "px; border-radius: " + deviceWidth/7.5 + "px'><div class='device-top'><div class='device-speaker' style='border-radius: " + settings.width/10 + "px'></div></div><div class='device-screen'><div class='app-scrollable'></div></div><div class='device-bottom'><div class='device-button'></div></div></div>");
      element.appendTo(".device-" + deviceCount + " .app-scrollable");

      if (topHeight) {
        $("<div class='app-top'></div>").appendTo(".device-" + deviceCount + " .device-screen").css({
          height: element.attr("data-top"),
          backgroundImage: "url("+image+")"
        });
        console.log("top found, and it is " + topHeight);
      }

      if (bottomHeight) {
        $("<div class='app-bottom'></div>").appendTo(".device-" + deviceCount + " .device-screen").css({
          height: element.attr("data-bottom"),
          backgroundImage: "url("+image+")"
        });
        console.log("bottom found, and it is " + bottomHeight);
      }

      if (deviceOs === "android") {
        $(".device-" + deviceCount).css({borderRadius: deviceWidth/11.3});
      }

      $(".device-" + deviceCount + " .app-scrollable").on({
        "mousemove": function(e) {
          if (clicked) {
            dragDistance = e.pageY - dragProgress;
            dragProgress = e.pageY;
            $(this).scrollTop($(this).scrollTop() - (dragDistance*3));
            $(this).addClass("scrolling");
          }
        },
        "mousedown": function(e) {
          clicked = true;
          dragProgress = e.pageY;
        },
        "mouseup": function(e) {
          clicked = false;
          $(this).removeClass("scrolling");
        },
        "mouseout": function() {
          clicked = false;
          $(this).removeClass("scrolling");
        }
      });

    });
  };
  
  $.fn.device.defaults = {
    width   : 258,
    device  : "ios"
  };
})(jQuery);