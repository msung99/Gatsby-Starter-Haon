## 1. 테마 설치하기 👋

여럿 유명한 블로그 플랫폼들을 사용하면서 제가 만들어보고 싶었던, 불편했던 점들을 보완하고자 직접 블로그를 제작했습니다.
이 테마가 저처럼 블로그를 직접 커스터마이징하여 운영하고자 하시는 분들에게 도움이 되었으면 합니다.

> 현 블로그 테마는 **[Hudi](https://github.com/devHudi/gatsby-starter-hoodie.git)** 님의 Gatsby Blog 테마를 기반으로 제작했습니다 🙂

아래 과정을 따라서 블로그 테마를 직접 만들어보세요!

```
npx gatsby your-blog-name https://github.com/msung99/Gatsby-Starter-Haon.git
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

본인의 메타 정보를 직접 기입하여 커스터마이징 할 수 있습니다. `gatsby-config.js` 로 이동하면 아래와 같은 초기 상태를 확인할 수 있습니다.

```js
module.exports = {
  siteMetadata: {
    title: `haon.blog`,
    description: `Hello! This is a tech blog theme using Gatsby 🤩`,
    author: `Haon`,
    siteUrl: `https://main--sage-malasada-49a59a.netlify.app`,
    keywords: [`server`, `backend`, `gatsby`],
    repo: "msung99/Gatsby-Starter-Haon",
    socialLinks: {
      github: "https://github.com/",
      instagram: "https://www.instagram.com/",
      facebook: "https://www.facebook.com/",
      linkedin: "https://www.linkedin.com/",
      velog: "https://velog.io/",
      email: `https://naver.com`,
    },
  },
  plugins: [
    // ... (생략)
  ],
}
```

아래의 과정에 따라 `siteMetadata` 를 수정하세요.

### 3-1. 기본 프로필 설정

본인의 기본 프로필을 입력하세요.

```
title: ``, // haon.blog
description: ``, // Hello! This is a tech blog theme using Gatsby 🤩
author: ``, // Haon
siteUrl: ``, // https://main--sage-malasada-49a59a.netlify.app
keywords: [ ], // [`server`, `backend`, `gatsby`]
```

### 3-2. utterances (댓글) 설정

현 템플릿은 Issue 생성 기반 댓글 방식에 기반하고 있습니다. 원활한 댓글 기능 활성화를 위해 본인의 깃허브 레포지토리 정보를 기입하세요.

```
repo: "your-github-name/repository-name"  //  "msung99/Gatsby-Starter-Haon",
```

### 3-3. 소설 계졍 연동

마지막으로 소설 계정을 연동할 수 있습니다. 소셜 이모티콘을 클릭하면 해당 URL 로 넘어가는 기능을 위해 필요합니다.
아래 소설 계정중 원하는 필드를 선택적으로 커스터마이징하여 사용하세요.

```
socialLinks: {
  github: ""  // "https://github.com/",
  instagram: ""  // "https://www.instagram.com/",
  facebook: ""  // "https://www.facebook.com/",
  linkedin: ""  // "https://www.linkedin.com/",
  velog: ""  // "https://velog.io/",'
  email: ""  // `https://haon@naver.com`,
},
```

---

## 4. 블로그 배포하기

`Github Page` 또는 `Netlify` 중 원하시는 배포 환경에 따라 빠르게 블로그를 만드실 수 있습니다. 여기선 Netify 에 대해 간단히만 언급하겠습니다.

아래 버튼을 활용하면 `Gatsby-Haon-Blog` 테마를 사용하고 있는 본인 깃허브 레포지토리를 Netlify 를 연동하여 배포를 진행할 수 있습니다.

[<img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" />](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)
