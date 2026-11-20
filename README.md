# Grid 26 - 나의 F1 블로그

평소 좋아하는 F1(포뮬러 원)을 주제로 만든 반응형 팬 블로그입니다.  
수업 시간에 배운 HTML, CSS(`display: flex`, `display: grid`, `position`, `@keyframes`, `@media`), 바닐라 자바스크립트, Swiper를 한 페이지에 모아서 구현했습니다.

- **배포 사이트**: [https://naracoffee.github.io/web-standard/](https://naracoffee.github.io/web-standard/)

---

## 1. 실행 방법

1. 저장소를 내려받거나 프로젝트 폴더를 엽니다.
2. `index.html` 파일을 브라우저로 바로 열거나, VS Code의 **Live Server** 확장 프로그램으로 실행합니다.
3. 터미널에서 간단한 로컬 서버를 띄워 확인하려면 아래 명령어를 입력합니다.
   ```bash
   python -m http.server 5500
   ```
   실행 후 브라우저 주소창에 `http://localhost:5500`을 입력해 확인합니다.

---

## 2. 폴더 구조

```txt
web-standard
├─ index.html          # 전체 페이지 HTML 구조
├─ css
│  └─ style.css        # 기본 레이아웃, 애니메이션, Swiper 스타일
├─ meda
│  └─ media.css        # 태블릿(1024px), 모바일(768px) 반응형 CSS
├─ js
│  └─ app.js           # 스크롤 감지, 모바일 메뉴, 탭 전환, Swiper 연결
└─ img                 # F1 로고, 배너 이미지 3장, 드라이버 사진들
```

---

## 3. 주요 기능

- **상단 배너 슬라이더 (Hero)**: Swiper를 연결해 F1 배경 이미지 3장이 좌우 화살표와 하단 점 버튼으로 넘어가도록 구현함.
- **스크롤 반응 상단 바 & TOP 버튼**: 페이지를 `100px` 이상 내리면 상단 메뉴 배경이 진해지고, 오른쪽 아래 TOP 버튼이 나타나며 클릭 시 맨 위로 부드럽게 올라감.
- **내 소개 카드 (`.notice`)**: `position: relative`와 `top: -80px`을 이용해 상단 배너와 살짝 겹치도록 배치하고 관심사 태그를 달아줌.
- **F1 알아보기 탭 메뉴 (`#guide`)**: 상단 탭(`드라이버`, `레이스`, `F1 머신`, `챔피언십`)이나 카드를 클릭하면 해당 카드가 넓어지면서(`flex: 1.6`) 배지와 설명이 나타남.
- **현재 1위 & 선수 소개**: 1위 드라이버 점수에 `pulse` 애니메이션을 적용했고, 선수 소개 카드는 `reverse` 클래스를 이용해 사진과 글이 좌우 번갈아 나오도록 배치함.
- **더 많은 정보 (`#more`)**: `display: grid`와 `grid-template-areas`를 이용해 5개의 링크 타일을 보기 좋게 나눔.
- **반응형 화면 지원**:
  - **태블릿 (`1024px` 이하)**: 카드와 하단 정보 타일이 2열로 바뀌고 배너 높이를 조절(`420px`)해 차량이 잘리지 않게 맞춤.
  - **모바일 (`768px` 이하)**: 햄버거 메뉴 버튼 토글을 추가하고, 슬라이더 화살표 크기를 줄여(`28px`) 글씨와 겹치지 않게 여백을 확보함.

---

## 4. 핵심 코드 설명

### 1) 스크롤 위치에 따라 메뉴와 TOP 버튼 바꾸기 (`js/app.js`)
`window.scrollY`로 스크롤 거리를 확인해서 `body`에 `page-scrolled` 클래스를 붙였다 뗍니다. CSS에서는 이 클래스가 있을 때만 메뉴 배경을 진하게 하고 TOP 버튼을 보여줍니다.
```js
function updateScroll() {
    if (window.scrollY > 100) {
        page.classList.add('page-scrolled');
    } else {
        page.classList.remove('page-scrolled');
    }
}
window.addEventListener('scroll', updateScroll);
```

### 2) 모바일 햄버거 메뉴 열기/닫기 (`js/app.js`)
모바일 화면에서 햄버거 버튼을 누르면 `body`에 `m-nav-open` 클래스를 토글하고, 메뉴 항목을 클릭하면 화면을 가리지 않도록 메뉴를 닫습니다.
```js
menuToggle.addEventListener('click', function () {
    page.classList.toggle('m-nav-open');
});
menuLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        page.classList.remove('m-nav-open');
    });
});
```

### 3) F1 알아보기 탭 전환 (`js/app.js`, `css/style.css`)
모든 탭과 카드에서 `on` 클래스를 지운 뒤(`reset`), 클릭한 번호(`num`)에만 `on` 클래스를 붙입니다(`init`). 선택된 카드는 CSS에서 `flex: 1.6`으로 넓어집니다.
```js
function init(num) {
    tabs[num].classList.add('on');
    contents[num].classList.add('on');
}
function reset() {
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('on');
        contents[i].classList.remove('on');
    }
}
```

### 4) 상단 배너 Swiper 슬라이더 (`js/app.js`)
수업에서 배운 Swiper 기본 옵션을 그대로 사용해 좌우 버튼, 페이지네이션, 무한 루프를 연결했습니다.
```js
const heroSwiper = new Swiper('.hero-swiper', {
    navigation: {
        nextEl: '.hero-swiper .swiper-button-next',
        prevEl: '.hero-swiper .swiper-button-prev',
    },
    pagination: {
        el: '.hero-swiper .swiper-pagination',
    },
    loop: true
});
```

### 5) 하단 정보 타일 배치 (`css/style.css`)
`display: grid`와 `grid-template-areas`를 사용해 5개의 타일을 원하는 위치에 배치했습니다.
```css
.info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
        "home point racer"
        "video news racer";
    gap: 16px;
}
```

### 6) 모바일 슬라이더 화살표 및 텍스트 여백 조절 (`meda/media.css`)
모바일(`768px` 이하)에서 배너 글씨와 화살표가 겹치지 않도록 화살표 크기를 줄여 양끝에 붙이고, `.hero-text` 너비에 좌우 여백을 확보했습니다.
```css
.hero-swiper .swiper-button-prev { left: 4px; width: 28px; height: 28px; }
.hero-swiper .swiper-button-next { right: 4px; width: 28px; height: 28px; }
.hero-text {
    width: calc(100% - 72px);
    left: 50%;
    transform: translate(-50%, -50%);
}
```
