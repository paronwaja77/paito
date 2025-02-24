$(document).ready(function () {
  // Reset tombol
  $("#rb").click(function () {
    $("span").removeClass("highlight");
    $("td").removeClass("e1 e2 e3 e4 e5 e6 e7 e8 e9 e0 k1 k2 k3 k4 k5 k6 k7 k8 k9 k0 c1 c2 c3 c4 c5 c6 c7 c8 c9 c0 a1 a2 a3 a4 a5 a6 a7 a8 a9 a0");

    // Reset semua select input ke nilai default (kosong atau nilai pertama)
    $("#asc, #kopc, #kepalac, #ekorc").prop("selectedIndex", 0); // Mereset pilihan
  });

  // Fungsi reset form
  function myFunction() {
    document.getElementById("myForm").reset(); // Mereset form secara keseluruhan
  }

  // Menangani perubahan pada input dengan ID 'ekorc' (dropdown)
  $("#ekorc").change(function () {
    $(".asu:nth-child(5n+4)").each(function () {
      var r = $(this).text();
      var t = $("#ekorc").val();
      if (r == t) {
        $(this).addClass("e" + r);
      } else {
        $(this).removeClass("e" + r);
      }
    });
  });

  // Menangani perubahan pada input dengan ID 'kepalac' (dropdown)
  $("#kepalac").change(function () {
    $(".asu:nth-child(5n+3)").each(function () {
      var r = $(this).text();
      var t = $("#kepalac").val();
      if (r == t) {
        $(this).addClass("k" + r);
      } else {
        $(this).removeClass("k" + r);
      }
    });
  });

  // Menangani perubahan pada input dengan ID 'kopc' (dropdown)
  $("#kopc").change(function () {
    $(".asu:nth-child(5n+2)").each(function () {
      var r = $(this).text();
      var t = $("#kopc").val();
      if (r == t) {
        $(this).addClass("c" + r);
      } else {
        $(this).removeClass("c" + r);
      }
    });
  });

  // Menangani perubahan pada input dengan ID 'asc' (dropdown)
  $("#asc").change(function () {
    $(".asu:nth-child(5n+1)").each(function () {
      var r = $(this).text();
      var t = $("#asc").val();
      if (r == t) {
        $(this).addClass("a" + r);
      } else {
        $(this).removeClass("a" + r);
      }
    });
  });
});
