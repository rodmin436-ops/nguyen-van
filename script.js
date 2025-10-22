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

// Apply input filter and focus/blur effects (Chỉ chạy sau khi DOM đã sẵn sàng)
$(document).ready(function () {
  $("#s1 input").inputFilter(function (value) {
    return /^-?\d*$/.test(value);
  });

  $("#mn input").inputFilter(function (value) {
    return /^-?\d*$/.test(value);
  });

  $("#s1 input.search-field")
    .blur(function () {
      $("#s1 input.search-field").css("border", "1px solid #fff");
    })
    .focus(function () {
      $(this).css("border", "1px solid blue");
    });

  $("#mn input.search-field")
    .blur(function () {
      $("#mn input.search-field").css("border", "1px solid #f2f3f4");
    })
    .focus(function () {
      $(this).css("border", "1px solid blue");
    });
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

/*
  RESPONSIVE FIX (SỬA ỔN ĐỊNH)
  - Không chạy liên tục (không dùng setInterval)
  - Không xóa style inline của phần tử (không dùng removeAttr)
  - Chỉ chạy khi load và khi resize
*/
function applyResponsiveFix() {
  var $targetItems = $(".tt1 .table .btw .owl-item");
  var $targetStage = $(".tt1 .table .btw .owl-stage");

  // Nếu không tìm thấy các phần tử mục tiêu thì dừng (tránh lỗi)
  if ($targetItems.length === 0 || $targetStage.length === 0) return;

  var windowWidth = $(window).width();

  if (windowWidth >= 768) {
    // Desktop: 2 cột
    $targetStage.css({
      display: "flex",
      "flex-wrap": "wrap",
      width: "100%",
      transform: "none",
    });

    $targetItems.each(function () {
      // Ghi đè những thuộc tính cần thiết nhưng giữ nguyên các inline style khác
      $(this).css({
        width: "50%",
        "max-width": "50%",
        flex: "0 0 50%",
        transform: "none",
      });
    });
  } else {
    // Mobile: 1 cột
    $targetItems.each(function () {
      $(this).css({
        width: "100%",
        "max-width": "100%",
        flex: "0 0 100%",
        transform: "none",
      });
    });
    $targetStage.css("transform", "none");
  }
}

// Chạy fix khi load và khi resize (không chạy liên tục bằng setInterval)
$(document).ready(function () {
  applyResponsiveFix();
  $(window).on("resize", function () {
    applyResponsiveFix();
  });
});

// Run once after full window load to catch plugin init (safe, not continuous)
$(window).on('load', function(){
  setTimeout(function(){ applyResponsiveFix(); }, 600);
});
