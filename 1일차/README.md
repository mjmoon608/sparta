# 스파르타 코딩클럽 1일차

- html 간단한 태그 설명

- css 설명
- 자식선택자 : class 명 밑에 나오는 자식태그 선택

```
.class3 > h1 {
	color: red;
}
```

- 자주 사용되는 css 속성들(http://www.walterz.net/2017/08/18/주-사용되는-css-속성/)

```
    배경관련
    background-color
    background-image
    background-size

    사이즈
    width
    height

    폰트
    font-size
    font-weight
    font-famliy
    color

    간격
    margin
    padding
```

- <b>검색할때 how to "모르는 내용" 검색 ㅋㅋ</b>

- css에서 `background-image` 를 이용해서 배경사진으로 바로 넣을 수 있음

  - `background-position`, `background-size` 와 같이 사용

- 가운데 정렬할 때 `magin:10px auto` 라고 쓰면 편함

  - 시계방향 순서대로 적용됨

- 주석처리 `ctrl + /`

- flex layout은 자식 컴포넌트를 정렬할때 사용하는 것

  - 부모에 `display: flex` 를 주고 자식에게 flex:1 의 값을 주어서 자리차지비율 조절하거나, <br>
    `flex: none, width: 200` 을 사용하여 해당 자식만 고정하고 나머지는 유동적으로 사용할 수도 있다.

  - 정렬을 할 때는 부모 컴포넌트에서 설정을 하는 것이다. 생각해보면 당연한 것.
  - https://youtu.be/DK9OOiXEjKM
  - https://youtu.be/eprXmC_j9A4
