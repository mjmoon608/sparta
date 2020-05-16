function q1() {
  const $magicNum = $("#magicnum").val();
  const $meaning = $("#meaning");

  if ($magicNum == "") {
    alert("숫자를 입력하세요.");
  } else {
    $.ajax({
      type: "GET",
      url: `http://numbersapi.com/${$magicNum}`,
      data: {},
      success: function (response) {
        $meaning.text(response);
      },
    });
  }
}
