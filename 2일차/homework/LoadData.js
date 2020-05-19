$(document).ready(function () {
  //alert("다 로딩됐다!");
  // 여기에 환율 API Ajax 요청을 하면 되겠죠?
  const $exchangeRate = $("#exchangeRate");

  $.ajax({
    type: "GET",
    url: "https://api.manana.kr/exchange/rate.json",
    data: {},
    success: function (response) {
      //   alert(response[1]["rate"]);
      $exchangeRate.text(response[1]["rate"]);
    },
  });
});
