/*!
 * Start Bootstrap - Freelancer v6.0.0 (https://startbootstrap.com/themes/freelancer)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-freelancer/blob/master/LICENSE)
 */
(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 71,
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: 80,
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Floating label headings for the contact form
  $(function () {
    $("body")
      .on("input propertychange", ".floating-label-form-group", function (e) {
        $(this).toggleClass(
          "floating-label-form-group-with-value",
          !!$(e.target).val()
        );
      })
      .on("focus", ".floating-label-form-group", function () {
        $(this).addClass("floating-label-form-group-with-focus");
      })
      .on("blur", ".floating-label-form-group", function () {
        $(this).removeClass("floating-label-form-group-with-focus");
      });
  });
})(jQuery); // End of use strict

// $(document).ready(function () {
//   //alert("다 로딩됐다!");
//   // 여기에 환율 API Ajax 요청을 하면 되겠죠?
//   const $exchangeRate = $("#exchangeRate");
//   $.ajax({
//     type: "GET",
//     url: "https://api.manana.kr/exchange/rate.json",
//     data: {},
//     success: function (response) {
//       // alert(response[1]["rate"]);
//       $exchangeRate.text(response[1]["rate"]);
//     },
//   });
//   $("#orders-box").html("");
//   listing();
// });

$(document).ready(function () {
  $("#result-cards").hide();
});

$("#test_start_btn").on("click", function (event) {
  event.preventDefault();
  // alert("분석완료!");
  // $.ajax({
  //   type: "GET",
  //   url: "./face.py",
  //   data: "data",
  //   dataType: "dataType",
  //   success: function (response) {
  //     console.log(response);
  //   },
  //   error: function(){
  //     alert("Not Working")
  //   }
  // });
  user_name = $("#user-name").val();
  user_age = $("#user-age").val();
  user_img = $("#mj_text")[0].file;
  const form = document.querySelector("form");
  const formData = new FormData(form);
  formData.append("img", user_img);
  console.log(formData);

  if (user_name !== "" && user_age !== "" && user_img !== "") {
    analyze(user_name, user_age, formData);
  } else {
    alert("이름과 나이, 사진을 확인해주세요😉");
  }
});

function analyze(user_name, user_age, formData) {
  $.ajax({
    type: "POST",
    url: "/api/analyze",
    data: formData,
    // dataType: "dataType",
    success: function (response) {
      if (response["result"] == false) {
        alert(response["result"], "얼굴 분석에 실패했습니다.");
      } else {
        alert("얼굴 분석에 성공했습니다.");
        console.log(response);

        face = response["result"][0];
        celebrity = response["result"][1]["faces"][0]["celebrity"];

        celebrity_text = `${user_name}님은 ${celebrity["value"]}와 ${celebrity["confidence"]}% 닮았습니다.`;
        face_age_text = `${user_name}님은 원래 나이인 ${user_age}가 아닌 ㅇ날ㄴㅇ무ㅏㅣㄹ ${face["faces"][0]["age"]["value"]}의 나이일 확률이 ${face["faces"][0]["age"]["confidence"]}% 입니다. `;
        face_emotion = `${user_name}님은 ${face["faces"][0]["emotion"]["value"]} 인뎅`;

        $("#celebrity_text").text(celebrity_text);
        $("#face-age-text").text(face_age_text);
        $("#face-emotion").text(face_emotion);

        $("#result-cards").show();
      }
    },
  });
}
