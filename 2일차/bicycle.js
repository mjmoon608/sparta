function q1() {
  const $namesQ1 = $("#names-q1");

  $namesQ1.empty();

  $.ajax({
    type: "GET",
    url:
      "http://openapi.seoul.go.kr:8088/6d4d776b466c656533356a4b4b5872/json/bikeList/1/99",
    data: {},
    success: function (response) {
      let rows = response["rentBikeStatus"]["row"];

      for (let i = 0; i < rows.length; i++) {
        let stationName = rows[i]["stationName"];
        let parkingBikeTotCnt = rows[i]["parkingBikeTotCnt"];
        let rackTotCnt = rows[i]["rackTotCnt"];

        if (parkingBikeTotCnt < 5) {
          parkingBikeTotCnt_style = "color:red";
        } else {
          parkingBikeTotCnt_style = "color:black";
        }

        let temp_html = `<tr>
        <td><span style=${parkingBikeTotCnt_style}>${stationName}</span></td>
        <td><span style=${parkingBikeTotCnt_style}>${parkingBikeTotCnt}</span></td>
        <td><span style=${parkingBikeTotCnt_style}>${rackTotCnt}</span></td>
        </tr>`;

        $namesQ1.append(temp_html);
      }
    },
  });
}
