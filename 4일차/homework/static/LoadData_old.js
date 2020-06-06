$(document).ready(function () {
  //alert("다 로딩됐다!");
  // 여기에 환율 API Ajax 요청을 하면 되겠죠?
  const $exchangeRate = $("#exchangeRate");
  $.ajax({
    type: "GET",
    url: "https://api.manana.kr/exchange/rate.json",
    data: {},
    success: function (response) {
      // alert(response[1]["rate"]);
      $exchangeRate.text(response[1]["rate"]);
    },
  });
  $("#orders-box").html("");
  listing();
});

function listing() {
  // 1. 리뷰 목록을 서버에 요청하기
  // 2. 요청 성공 여부 확인하기
  // 3. 요청 성공했을 때 리뷰를 올바르게 화면에 나타내기
  $.ajax({
    type: "GET",
    url: "/order",
    data: {},
    success: function (response) {
      if (response["result"] == "success") {
        // 2. 성공했을 때 리뷰를 올바르게 화면에 나타내기
        let orders = response["orders"];
        // 3. 요청이 성공했을 때 립뷰를 올바르게 화면에 나타내기
        for (let i = 0; i < orders.length; i++) {
          make_card(
            orders[i]["name"],
            orders[i]["num"],
            orders[i]["address"],
            orders[i]["phone"]
          );
        }
        //   alert("리뷰를 받아왔습니다.");
      } else {
        alert("주문 정보를 받아오지 못했습니다");
      }
    },
  });
}

function make_order() {
  let customerName = $("#customer-name").val();
  let customNum = $("#customer-num").val();
  let customerAdress = $("#customer-adress").val();
  let customerTel = $("#customer-tel").val();
  let isSuccess = true;

  if (customerName === "") {
    alert("⚠ 주문자 이름을 입력해주세요❗❗ ⚠");
    isSuccess = false;
  } else if (customNum === "0") {
    alert("⚠ 수량을 선택해주세요❗❗ ⚠");
    isSuccess = false;
  } else if (customerAdress === "") {
    alert("⚠ 주소를 입력해주세요❗❗ ⚠");
    isSuccess = false;
  } else if (customerTel === "") {
    alert("⚠ 전화번호를 입력해주세요❗❗ ⚠");
    isSuccess = false;
  } else if (customerTel.slice(0, 3) !== "010" || customerTel.length !== 11) {
    alert("⚠ 전화번호 형식을 지켜주세요❗❗ ⚠\n            ex)01078789696😉");
    isSuccess = false;
  }

  if (
    customerName !== "" &&
    customNum !== "" &&
    customerAdress !== "" &&
    customerTel !== ""
  ) {
    isSuccess = true;
    console.log(isSuccess);
  }
  // else {
  //   alert("🎉 주문이 완료됐습니다 🎉");
  // }
  $.ajax({
    type: "POST",
    url: "/order",
    data: {
      name_give: customerName,
      num_give: customNum,
      address_give: customerAdress,
      phone_give: customerTel,
      isSuccess_give: isSuccess,
    },

    success: function (response) {
      // console.log(response);
      if (response["result"] == true) {
        alert(response["msg"]);
        window.location.reload();
      }
    },
  });
}
