function q1() {
  const $inputQ1ElVal = $("#input-q1").val();
  if ($inputQ1ElVal == "") {
    alert("입력하세요!");
  } else if ($inputQ1ElVal != "") {
    alert($inputQ1ElVal);
  }
}

function q2() {
  const $inputQ2El = $("#input-q2");
  if ($inputQ2El.val().includes("@")) {
    const stIndex = $inputQ2El.val().indexOf("@");
    const tempText = $inputQ2El.val().slice(stIndex + 1);
    const edIndex = tempText.indexOf(".");
    alert(tempText.slice(0, edIndex));
  } else {
    alert("이메일이 아닙니다.");
  }
}

const $namesQ3El = $("#names-q3");

function q3() {
  const $inputQ3El = $("#input-q3");
  let temp_html = `<li>${$inputQ3El.val()}</li>`;
  if ($inputQ3El.val() == "") {
    alert("이름을 입력하세요.");
  } else if ($inputQ3El.val() != "") {
    $namesQ3El.append(temp_html);
    $inputQ3El.val("");
  }
}

function q3_remove() {
  $namesQ3El.empty();
}

$.ajax({
  type: "GET", // GET 방식으로 요청한다.
  url:
    "http://openapi.seoul.go.kr:8088/6d4d776b466c656533356a4b4b5872/json/RealtimeCityAir/1/99",
  data: {}, // 요청하면서 함께 줄 데이터 (GET 요청시엔 비워두세요)
  success: function (response) {
    // 서버에서 준 결과를 response라는 변수에 담음
    return response; // 서버에서 준 결과를 이용해서 나머지 코드를 작성
  },
});
