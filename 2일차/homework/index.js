function order_product() {
  let customerName = $("#customer-name").val();
  let customNum = $("#customer-num").val();
  let customerAdress = $("#customer-adress").val();
  let customerTel = $("#customer-tel").val();

  if (customerName === "") {
    alert("⚠ 주문자 이름을 입력해주세요❗❗ ⚠");
  } else if (customNum === "0") {
    alert("⚠ 수량을 선택해주세요❗❗ ⚠");
  } else if (customerAdress === "") {
    alert("⚠ 주소를 입력해주세요❗❗ ⚠");
  } else if (customerTel === "") {
    alert("⚠ 전화번호를 입력해주세요❗❗ ⚠");
  } else if (customerTel.slice(0, 3) !== "010" || customerTel.length !== 11) {
    alert("⚠ 전화번호 형식을 지켜주세요❗❗ ⚠\n            ex)01078789696😉");
  } else {
    alert("🎉 주문이 완료됐습니다 🎉");
  }
}
