$(document).ready(() => {
  loading();
});

function loading() {
  $.ajax({
    type: "GET",
    url: "http://spartacodingclub.shop/post",
    data: {},
    success: function (response) {
      let articles = response["articles"];
      for (let i = 0; i < articles.length; i++) {
        let article = articles[i];
        const { comment, title, image, desc, url } = article;
        make_card(comment, title, image, desc, url);
      }
    },
  });
}

function make_card(comment, desc, image, title, url) {
  let temp_html = `<div class="card">
      <img class="card-img-top" src="${image}" alt="Card image cap">
      <div class="card-body">
        <a href="${url}" target="_blank" class="card-title">${title}</a>
        <p class="card-text">${desc}</p>
        <p class="card-text comment">${comment}</p>
      </div>
    </div>`;
  $("#cards-box").append(temp_html);
}
