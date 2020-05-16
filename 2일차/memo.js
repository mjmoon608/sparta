const $postBoxEl = $("#post-box");
const $btnPostingBoxEl = $("#btn-posting-box");

function openclose() {
  $postBoxEl.toggle();

  if ($postBoxEl.css("display") == "block") {
    $btnPostingBoxEl.text("포스팅박스 닫기");
  } else {
    $btnPostingBoxEl.text("포스팅박스 열기");
  }
}
