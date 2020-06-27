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
  $("#check-img").hide();
});

$("#user-img").on("change", function () {
  const preview = document.querySelector("#user-check");
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }

  $("#check-img").show();
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
  user_img = $("#user-img").val();
  // user_img = $("#user-img")[0].file;
  // const form = document.querySelector("form");
  // const formData = new FormData(form);
  // formData.append("img", user_img);
  // console.log(formData);

  if (user_name !== "" && user_age !== "" && user_img !== "") {
    analyze(user_name, user_age, user_img);
    $("#test_start_btn").hide();
  } else {
    alert("이름과 나이, 사진을 확인해주세요😉");
  }
});

function analyze(user_name, user_age) {
  // user_img = $("#user-img").val();
  // path = document.getElementById("user-img").files[0].path;
  // console.log(path);

  const form = $("#FILE_FORM")[0];
  const formData = new FormData(form);
  formData.append("img", $("#user-img")[0].files[0]);
  formData.append("name", user_name);
  formData.append("age", user_age);
  // console.log(user_name, user_age);

  $.ajax({
    type: "POST",
    url: "/api/analyze",
    // processData: false, // 이게 뭔지 모룸.
    // data: { "user-img": path },
    data: formData,
    processData: false,
    contentType: false,
    // dataType: "dataType",
    success: function (response) {
      if (response["result"] == false) {
        alert(response["result"], "얼굴 분석에 실패했습니다.");
      } else {
        alert("얼굴 분석에 성공했습니다.");
        // console.log(response);

        face = response["result"][0];
        celebrity = response["result"][1]["faces"][0]["celebrity"];

        if (face["faces"][0]["emotion"]["value"] === "angry") {
          emotion_text = `${
            face["faces"][0]["emotion"]["confidence"] * 100
          }%로 화난 표정이에요. 좀 더 웃으시는건 어떨까요??😊`;
          //😡
          $(".emotion_test").text("😡");
        } else if (face["faces"][0]["emotion"]["value"] === "disgust") {
          emotion_text = `${
            face["faces"][0]["emotion"]["confidence"] * 100
          }%로 싫어하는 표정이에요.. 활짝 웃으면 기분도 좋아질 거에요👍 `;
          //😣
          $(".emotion_test").text("😣");
        } else if (face["faces"][0]["emotion"]["value"] === "fear") {
          emotion_text = `${
            face["faces"][0]["emotion"]["confidence"] * 100
          }%로 두려워하는 표정이에요. 공포영화를 보고 오신 후이신가요??😉`;
          //😱
          $(".emotion_test").text("😱");
        } else if (face["faces"][0]["emotion"]["value"] === "laugh") {
          emotion_text = `${
            face["faces"][0]["emotion"]["confidence"] * 100
          }%로 활짝 웃고 있는 표정이에요. 즐거운 일이 있으신가봐요❓❓`;
          //😁
          $(".emotion_test").text("😁");
        } else if (face["faces"][0]["emotion"]["value"] === "neutral") {
          emotion_text = `${
            face["faces"][0]["emotion"]["confidence"] * 100
          }%로 무표정이시네요. 좀 더 활짝 웃어보아요❗❗ 그럼 기분이 좋아질 거에요😜`;
          //😐
          $(".emotion_test").text("😐");
        } else if (face["faces"][0]["emotion"]["value"] === "sad") {
          emotion_text = `${
            face["faces"][0]["emotion"]["confidence"] * 100
          }%로 슬픈 표정이네요. 너무 슬퍼하지 마세요. 제가 위로해 드릴게요😤`;
          //😭
          $(".emotion_test").text("😭");
        } else if (face["faces"][0]["emotion"]["value"] === "surprise") {
          emotion_text = `${
            face["faces"][0]["emotion"]["confidence"] * 100
          }%로 놀란 표정이네요. 서프라이즈 이벤트를 받았나요?? 부럽네요😗`;
          //😲
          $(".emotion_test").text("😲");
        } else if (face["faces"][0]["emotion"]["value"] === "smile") {
          emotion_text = `${
            face["faces"][0]["emotion"]["confidence"] * 100
          }%로 웃는 표정이네요. 밝은 인상으로 편안함을 주는 군요. 상대방에게 좋은 인상을 심어 줄 수 있겠어요`;
          //😊
          $(".emotion_test").text("😊");
        } else if (face["faces"][0]["emotion"]["value"] === "talking") {
          emotion_text = `${
            face["faces"][0]["emotion"]["confidence"] * 100
          }%로 수다쟁이상이에요. 저랑도 얘기해 주세요😉`;
          //😛
          $(".emotion_test").text("😛");
        }

        if (
          user_age > face["faces"][0]["age"]["value"].slice(0, 2) &&
          user_age < face["faces"][0]["age"]["value"].slice(3, 5)
        ) {
          $(".age_test").text("🧑");
        } else if (face["faces"][0]["age"]["value"].slice(3, 5) < user_age) {
          $(".age_test").text("👶");
        } else {
          $(".age_test").text("👴");
        }

        celebrity_text = `${user_name}님은 ${celebrity["value"]}와 ${
          celebrity["confidence"] * 100
        }% 닮았습니다.`;

        face_age_text = `${user_name}님은 원래 나이인 ${user_age}가 아닌 ${
          face["faces"][0]["age"]["value"]
        }의 나이로 보일 확률이 ${
          face["faces"][0]["age"]["confidence"] * 100
        }% 입니다. `;

        face_emotion = `${user_name}님은 ${emotion_text}`;

        $("#celebrity_text").text(celebrity_text);
        $("#face-age-text").text(face_age_text);
        $("#face-emotion").text(face_emotion);

        $("#result-cards").show();
        $("#test_start_btn").show();
      }
    },
    error: function (request, status, error) {
      console.log(request, status, error);
      alert("얼굴 분석에 실패하였습니다. 다시 시도해 주세요.");
      $("#test_start_btn").show();
    },
  });
}

// function uploadFile() {
//   var form = $("#FILE_FORM")[0];
//   var formData = new FormData(form);
//   formData.append("fileObj", $("#FILE_TAG")[0].files[0]);

//   $.ajax({
//     type: "POST",
//     url: "url",
//     data: "data",
//     dataType: "dataType",
//     success: function (response) {},
//   });
// }
