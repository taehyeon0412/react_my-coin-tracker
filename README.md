## **🛠사용 기술 및 라이브러리**

- react-router
- react-router-dom
- styled components
- react-query
- Apexcharts
- Recoil
- Typescript
- react-js-pagination 라이브러리

## Route

- `/` Home 화면(코인 목록)
- `/:coinId` 특정 코인 정보
- `/:coinId/chart` 특정 코인 시세 라인 차트
- `/:coinId/price` 특정 코인 가격 변화율 정보




## 🎨 UI

**1. Home** `/`

![코인메인화면1](https://github.com/taehyeon0412/react_movie-site-clone/assets/71374539/07c7abcf-8da0-439c-af5f-528add779b25)

**2. Coin** `/:coinId`

![코인 세부정보](https://github.com/taehyeon0412/react_movie-site-clone/assets/71374539/1eac57ee-f965-40ff-a365-8286385c7d79)

**3. Chart** `/:coinId/chart`

![차트1](https://github.com/taehyeon0412/react_movie-site-clone/assets/71374539/575c4cdf-220d-43e1-8dd7-d4206b0c60e4)


![차트2](https://github.com/taehyeon0412/react_movie-site-clone/assets/71374539/c5a2b5df-0879-4c15-a2e4-050a0dd88a20)

**4. Price `/:coinId/price`**

![코인 가격정보](https://github.com/taehyeon0412/react_movie-site-clone/assets/71374539/df14ef99-a9a0-45f5-bb39-f030be24b454)

**5. 다크 모드 on/off**

![다크모드](https://github.com/taehyeon0412/react_movie-site-clone/assets/71374539/75b3354e-f84c-441c-8bbf-5c1363c17917)


## **📝 기능**

> **Home** `/`
> 
- API를 fetch 하여 코인의 정보를 받은 뒤 react-js-pagination 라이브러리를 이용하여 
각 페이지마다 12개의 코인이 출력되게 하였습니다.
- `Link` 를 이용하여 coin을 클릭 시 코인 세부 정보 페이지로 이동하게 하였습니다.

> **coin** `/:coinId`
> 
- API를 fetch 하여 코인의 세부 정보와 가격 정보를 가져오고 클릭한 코인ID를 이용하여
코인의 이미지를 불러옵니다.

> **Chart** `/:coinId/chart`(**Apexchart API)사용**
> 
- Line Chart - 현재부터 지난 20일까지의 가격 정보를 불러와 각 날의 종가를 그래프화 시켰습니다. 
차트 데이터가 없으면 - “차트 데이터가 없습니다”로 출력됩니다.
- Candle Chart - 현재부터 지난 20일까지의 가격 정보를 불러와 각 날의 시가, 고가, 저가, 종가 (open, high, low, close)를 차트화 하였습니다.
차트 데이터가 없으면 - “차트 데이터가 없습니다”로 출력됩니다.

> **Price `/:coinId/price`**
> 
- 현재 시간의 가격과 지난 시간의 가격을 비교하여 변화율을 퍼센트(%)로 나타내줍니다.
(30분, 1시간, 6시간, 1일, 7일, 1년)
- 변화율이 양수면 `up icon`과 함께 빨간색
변화율이 음수면 `down icon`과 함께 초록색

> **다크 모드 on/off (Recoil 사용)**
> 
- `textColor`: 글자 색
- `bgColor`: 배경 색
- `accentColor`: Coin 화면에서 `Tab` 버튼 클릭 시 글자 색
- `divColor`: 각 컴포넌트의 배경 색
- `grayDiv` : Div의 배경색

## **📑 참고 API**

- [https://api.coinpaprika.com/v1](https://api.coinpaprika.com/v1%60) : coin 정보 API
- https://coinicons-api.vercel.app/api/icon/{coin.id} : coin icon API

<br/>
<br/>

## 💡 성장 경험

### React-Query에 대한 이해

기존에 사용하던 비동기 처리 방식에 비해 코드를 간소화 하고 처리를 간편하게 하는 장점이 있는 라이브러리인 것 같습니다. 

처음 써보는 기술이라 기술에 대한 이해도를 높이고 외부 api 비동기 처리를 어떻게 하는지에 대해서 중점적으로 학습하였습니다.

### 상태관리에 대한 이해

Recoil을 사용하여 전역 상태를 관리하고  다크모드 구현을 통해 이해도를 높이며 학습했습니다.
