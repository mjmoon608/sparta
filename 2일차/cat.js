function q1() {
  const $imgCat = $("#img-cat");
  $.ajax({
    type: "GET",
    url: "https://api.thecatapi.com/v1/images/search",
    data: {},
    success: function (response) {
      let img_url = response[0]["url"];

      $imgCat.attr("src", img_url);
    },
  });
}
