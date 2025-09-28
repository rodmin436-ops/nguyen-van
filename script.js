// Input filter for numeric inputs only
(function ($) {
  $.fn.inputFilter = function (inputFilter) {
    return this.on(
      "input keydown keyup mousedown mouseup select contextmenu drop",
      function () {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      }
    );
  };
})(jQuery);

// Apply input filter to search fields
$(document).ready(function () {
  $("#s1 input").inputFilter(function (value) {
    return /^-?\d*$/.test(value);
  });

  $("#mn input").inputFilter(function (value) {
    return /^-?\d*$/.test(value);
  });

  // Modal functionality
  $(".tbc2 .cls, .tbc2 .cls2").click(function () {
    $(".tbc2").removeClass("tbc2c");
    $(".ovltbc2").removeClass("tbc2c");
    $(".qh_new").addClass("bb22");
    $(".ovl_checkmes").addClass("ovl_checkmesc");
  });

  $(".qh_new p i").click(function (event) {
    event.preventDefault();
    $(".qh_new").removeClass("bb22");
    $(".ovl_checkmes").removeClass("ovl_checkmesc");
  });

  // Search field focus effects
  if ($(window).width() < 768) {
    $("#s1 input.search-field")
      .blur(function () {
        $("#s1 input.search-field").css("border", "1px solid #ddd");
      })
      .focus(function () {
        $(this).css("border", "1px solid blue");
      });
  } else {
    $("#s1 input.search-field")
      .blur(function () {
        $("#s1 input.search-field").css("border", "1px solid #fff");
      })
      .focus(function () {
        $(this).css("border", "1px solid blue");
      });
  }

  $("#mn input.search-field")
    .blur(function () {
      $("#mn input.search-field").css("border", "1px solid #f2f3f4");
    })
    .focus(function () {
      $(this).css("border", "1px solid blue");
    });

  // Set logo in navigation
  var gtt = $(".gtt").data("ss");
  var link = "https://admin.checkscam.vn";
  $("#mn .l").html(gtt);
  $("#mn .l").parent().attr("href", link);
});

// AJAX search function
function fetch() {
  jQuery.ajax({
    url: "https://admin.checkscam.vn/wp-admin/admin-ajax.php",
    type: "post",
    data: { action: "data_fetch", keyword: jQuery("#keyword").val() },
    success: function (data) {
      jQuery("#datafetch").html(data);
    },
  });
}

// Close modal functionality
$(".ess").click(function () {
  $(this).css("display", "none");
  $(".ifr").css("display", "none");
});

// Redirect to HTTPS if on HTTP
if (window.location.protocol == "http:") {
  window.location.href = window.location.href.replace("http:", "https:");
}

// Redirect if URL contains 'profile'
if (window.location.href.indexOf("profile") > 0) {
  window.location.href = window.location.href.replace("/profile/", "/");
}

// Redirect if URL contains '/www.'
if (window.location.href.indexOf("/www.") > 0) {
  window.location.href = window.location.href.replace("/www.", "/");
}
// Thêm đoạn code này để hiển thị thông báo khi trang web tải xong
$(document).ready(function() {
    // Thêm class 'tbc2c' để hiển thị thông báo (.tbc2) và lớp phủ (.ovltbc2)
    $('.tbc2').addClass('tbc2c');
    $('.ovltbc2').addClass('tbc2c');
});