# Fake Store

[網站 DEMO](https://fake-store-4dd9e.firebaseapp.com/)

| 測試用帳號 | 測試用密碼 |
| ---------- | ---------- |
| test       | tttttt     |

## 專案介紹

Fakestore 是一個使用 React 與串接第三方 API [Fake Store API](https://fakestoreapi.com/) 開發的購物網站

![Home Page](https://github.com/ZYL137/fake-store/blob/main/.github/img/Home.png)

## 專案展示

#### `頁面架構`

![](https://github.com/ZYL137/fake-store/blob/main/.github/img/sitemap.png)

#### `產品模組`

- 瀏覽分類產品：依照類別瀏覽產品。
- 瀏覽單一產品：瀏覽單一產品詳細資訊，並可選擇產品數量加入購物車。

![](https://github.com/ZYL137/fake-store/blob/main/.github/img/product.gif)

#### `購物模組`

- 購物車：顯示購物車內的產品及訂單摘要，並可編輯購物車內之商品數量。
- 結帳功能：導向登入頁面，登入後輸入付款資料，確認訂單資訊、總額後，即可建立訂單。

<table>
    <thead>
        <tr>
            <th colspan="2">測試用付款資料</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>信用卡號</td>
            <td>4242 4242 4242 4242</td>
        </tr> <tr>
            <td>到期日</td>
            <td>04/24</td>
        </tr> <tr>
            <td>安全碼</td>
            <td>242</td>
        </tr>
        </tr> <tr>
            <td>郵遞區號</td>
            <td>22222</td>
        </tr>
    </tbody>
</table>

![](https://github.com/ZYL137/fake-store/blob/main/.github/img/cart.gif)

#### `會員模組`

- 會員註冊：輸入符合欄位格式資料即可註冊。
- 會員登入：輸入帳號、密碼，即可登入。
- 會員專區：會員登入後可檢視或編輯個人資料、訂單紀錄。

![](https://github.com/ZYL137/fake-store/blob/main/.github/img/register.gif)
![](https://github.com/ZYL137/fake-store/blob/main/.github/img/account-1.gif)

#### `搜尋模組`

- 搜尋功能：輸入關鍵字後即可搜尋產品。
- 搜尋結果：顯示符合搜尋條件之產品。

![](https://github.com/ZYL137/fake-store/blob/main/.github/img/search.gif)

## 專案技術

#### `第三方套件`

| 前端            | 後端                       |
| --------------- | -------------------------- |
| ✔ react hooks   | ✔ Stripe-js                |
| ✔ react redux   | ✔ Express / cors           |
| ✔ react router  | ✔ Firebase Authtentication |
| ✔ redux toolkit | ✔ Firebase Cloud Function  |
| ✔ axios         | ✔ Firebase Hosting         |
| ✔ SASS          | ✔ Firebase Cloud Firestore |

#### `第三方 API`

- [Fake Store API](https://fakestoreapi.com/)

## 專案執行

1. 執行 `npm install` 安裝專案所需套件。

2. 執行 `npm start`，在 http://localhost:3000 啟動專案。

3. 執行 `npm run build`，在 build 資料夾建立專案 production 版本。

4. 執行 `firebase deploy--only hosting `，在 firebase 部屬專案網站。
