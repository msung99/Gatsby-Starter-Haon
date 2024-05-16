---
title: Gatsby 블로그 초기 설정 ⚙️
description: 현 템플릿을 사용하기 위해 어떻게 초기 설정을 해야할까요?
date: "2024-03-06"
tags:
  - Introduce
  - About
  - settings
series: how to use this template?
previewImage: "setting.png"
---

## 0. 깃허브 레포지토리 생성하기

테마를 설치하기에 앞서 Gatsby Theme 를 본인의 Github Repository 가 필요합니다. 레포지토리를 하나 생성해주세요.

---

## 1. 테마 설치하기 👋

아래 과정을 따라서 블로그 테마를 직접 만들어보세요!

```
npx gatsby new your-blog-name https://github.com/msung99/Gatsby-Starter-Haon.git
```

---

## 2. Gatsby 로컬 서버 구동하기

본인의 로컬에 테마를 내려받았다면, 아래의 과정에 따라 게츠비 로컬 서버를 구동해주세요.

```
cd your-blog-name
npm install  // install node.js
gatsby develop // or "npm start"
```

위 명령어가 문제 없이 실행됐다면 http://localhost:8000 에서 초기 블로그 상태를 확인할 수 있습니다!

---

## 3. 블로그 정보 입력하기

본인의 메타 정보를 직접 기입하여 커스터마이징 할 수 있습니다. `meta-config.js` 로 이동하면 아래와 같은 초기 상태를 확인할 수 있습니다.

```js
module.exports = {
  title: `haon.theme`,
  description: `Hello! This is a tech blog theme using Gatsby 🤩`,
  author: `Haon`,
  siteUrl: `https://gatsby-starter-haon.netlify.app`,
  keywords: [`server`, `backend`, `gatsby`],
  repo: "msung99/Gatsby-Starter-Haon",
  gtag: "G-CD9E7GB2ED", // with. Google Analytics
  socialLinks: {
    github: "https://github.com/msung99",
    instagram: "https://www.instagram.com/iminseong920/",
    facebook: "https://www.facebook.com/",
    linkedin: "https://www.linkedin.com/",
    velog: "https://velog.io/@msung99",
    email: "msung6924@naver.com",
  },
}
```

아래의 과정에 따라 `siteMetadata` 를 수정하세요.

### 3-1. 기본 프로필 설정

본인의 기본 프로필을 입력하세요.

```
title: ``, // haon.blog
description: ``, // Hello! This is a tech blog theme using Gatsby 🤩
author: ``, // Haon
siteUrl: ``, // https://gatsby-starter-haon.netlify.app/
keywords: [ ], // [`server`, `backend`, `gatsby`]
```

### 3-2. utterances (댓글) 설정

현 템플릿은 Issue 생성 기반 댓글 방식에 기반하고 있습니다. 원활한 댓글 기능 활성화를 위해 본인의 깃허브 레포지토리 정보를 기입하세요.

```
repo: "your-github-name/repository-name"  //  "msung99/Gatsby-Starter-Haon",
```

### 3-3. (선택) Google 애널리틱스 연동

개설한 블로그 접속자를 파악하는 방법으로 `Google 애널리틱스` 기능을 사용할 수 있습니다. `gatsby-starter-haon` 은 손쉽게 구글 애널리틱스와 본인의 블로그 사이트를 연동하여 접속자 수를 파악할 수 있도록 합니다.

[Goole Analytics 공식 문서](https://developers.google.com/analytics/learn?hl=ko) 를 참고하여 애널릭틱스 기능에 대해 살펴보고, `tracking id` 를 발급받으세요. 그리고 발급받은 tracking id 를 아래와 같이 기입하세요.

```
gtag: "G-CD9E7GB2ED" // your google analytics tracking id
```

### 3-4. 소설 계졍 연동

마지막으로 소설 계정을 연동할 수 있습니다. 소셜 이모티콘을 클릭하면 해당 URL 로 넘어가는 기능을 위해 필요합니다.
아래 소설 계정중 원하는 필드를 선택적으로 커스터마이징하여 사용하세요.

```
socialLinks: {
  github: ""  // "https://github.com/msung99",
  instagram: ""  // "https://www.instagram.com/iminseong920",
  facebook: ""  // "https://www.facebook.com/",
  linkedin: ""  // "https://www.linkedin.com/",
  velog: ""  // "https://velog.io/@msung99",'
  email: ""  // `https://msung6924@naver.com`,
},
```

---

## 4. 블로그 배포하기

`Github Page` 또는 `Netlify` 중 원하시는 배포 환경에 따라 빠르게 블로그를 만드실 수 있습니다.

`Gatsby-Haon-Blog` 테마를 사용하고 있는 본인 깃허브 레포지토리를 Netlify 를 연동하여 배포를 진행할 수 있습니다. 이 과정은 크게 어렵지 않으니 생략합니다.

---

## 5. 기타 유의사항

`gatsby-starter-haon` 은 최소한의 디폴트 포스트가 필요합니다. `default` 패키지 내에 존재하는 2개의 포스트는 삭제하지 않아야 원활히 동작합니다.

---

## Isuee, PR 등록

Gatsby-Starter-Haon 을 사용하다가 소통하고 싶은 내용이 생긴다면
[Social 페이지](https://gatsby-starter-haon.netlify.app/community/) 또는 [Issue 등록하기](https://github.com/msung99/Gatsby-Starter-Haon/issues/1) 에다 자유롭게 코멘트를 남겨주세요.

- 제안사항 (Suggestions)
- Q&A
- 버그 발견 및 코드 개선 (Bug / Code Refactoring)
- 신규기능 (New Features / Functions)

코멘트를 남겨주셔도 좋고, 별도로 Issue Template 양식에 맞추어 이슈를 마음껏 등록하셔도 좋습니다.

무엇이든 좋습니다. 양질의 소프트웨어 향상, 테마 발전을 위해서 많은 분들의 의견을 기다리고 있습니다 👍
