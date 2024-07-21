# <div align="center">Gatsby Starter Haon (Tech Blog Theme - Open Source) 🚀</div>

> - 💡 All the code in this repository and the blog theme are **open source.** Therefore, feel free to clone and use it as you wish! 🙂
> - 💡 현 블로그 테마는 오픈소스입니다. 자유롭게 clone 받아 커스터마이징하여 블로그를 꾸며보세요 🙂


- Blog Theme Live Demo: https://gatsby-starter-haon.netlify.app/
- 국문(한국어 원서) 은 [Gatsby 블로그 초기 설정 ⚙️ 가이드라인](https://gatsby-starter-haon.netlify.app/how-to-use/initial-settings-kr/) 에서 부터 확인 가능합니다.

## <div align="center">Gatsby Starter Haon</div>

![image](https://github.com/msung99/Gatsby-Starter-Haon/assets/88240193/d97f702e-fe5c-4d46-8f12-6b148504caa8)

I hope this theme will be helpful for those who want to customize and operate your blogs. Feel free to customize and use the Gatsby Haon Theme! 👋 I drew great inspiration for creating this theme from [Hudi's blog](https://github.com/devHudi/gatsby-starter-hoodie).

---

## Features 🚀

- Markdown
- SEO
- Responsive Web
- Dark/Light Mode
- Tag
- Series
- Search
- Private Mode
- Utterance (Comment widget)
- GA (Google Analytics)

---


## 0. Create a GitHub Repository & Install Node.js, Gatsby-cli

> 💡 node.js and gatsby-cli must be installed on your computer.

Before installing the theme, you need a GitHub Repository for the Gatsby Theme. Please create a repository.

---

## 1. Install the Theme 👋

Follow the steps below to create your blog with the theme!

```
npx gatsby new your-blog-name https://github.com/msung99/Gatsby-Starter-Haon.git
```

---

## 2. Run Gatsby Local Server

After downloading the theme to your local machine, follow the steps below to run the Gatsby local server.

```
cd your-blog-name
npm install  // install node.js
gatsby develop // or "npm start"
```

If the above command does not work properly due to dependency conflicts, please execute the following command and try again

```
npm i --legacy-peer-deps
```



If the command runs without issues, you can check the initial blog state at http://localhost:8000!

---

## 3. Enter Blog Information

You can customize your blog by entering your meta information. Move to `meta-config.js` to see the initial state as follows.

```js
module.exports = {
  title: `haon.theme`,
  description: `Hello! This is a tech blog theme using Gatsby 🤩`,
  author: `Haon`,
  siteUrl: `https://gatsby-starter-haon.netlify.app`,
  keywords: [`server`, `backend`, `gatsby`],
  repo: "msung99/Gatsby-Starter-Haon",
  gtag: "G-CD9E7GB2ED", // with Google Analytics
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

Follow the steps below to modify `siteMetadata`.

### 3-1. Basic Profile Settings

Enter your basic profile information.

```
title: ``, // haon.blog
description: ``, // Hello! This is a tech blog theme using Gatsby 🤩
author: ``, // Haon
siteUrl: ``, // https://gatsby-starter-haon.netlify.app/
keywords: [ ], // [`server`, `backend`, `gatsby`]
```

### 3-2. Set Up utterances (Comments)

This template uses issue-based comments. Enter your GitHub repository information for the comment function to work smoothly.

```
repo: "your-github-name/repository-name"  //  "msung99/Gatsby-Starter-Haon",
```

### 3-3. (Optional) Integrate Google Analytics

You can use the `Google Analytics` feature to track visitors to your blog. `gatsby-starter-haon` makes it easy to integrate Google Analytics with your blog site to track visitors.

Refer to the [Google Analytics official documentation](https://developers.google.com/analytics/learn?hl=en) to learn about the Analytics feature and get a tracking id. Then enter the tracking id as follows.

```
gtag: "G-CD9E7GB2ED" // your google analytics tracking id
```

### 3-4. Link Social Accounts

Finally, you can link your social accounts. This is necessary for the social icons to redirect to the corresponding URLs. Customize the desired fields from the social accounts below.

```
socialLinks: {
  github: ""  // "https://github.com/msung99",
  instagram: ""  // "https://www.instagram.com/iminseong920",
  facebook: ""  // "https://www.facebook.com/",
  linkedin: ""  // "https://www.linkedin.com/",
  velog: ""  // "https://velog.io/@msung99",
  email: ""  // `https://msung6924@naver.com`,
},
```

---

## 4. Deploy the Blog

You can quickly create a blog with either `Github Pages` or `Netlify`, depending on your preferred deployment environment.

You can link the GitHub repository using the `Gatsby-Haon-Blog` theme with Netlify for deployment. This process is not very difficult and is thus omitted.

---

## 5. Other Precautions

`gatsby-starter-haon` requires a minimum of default posts. Do not delete the two posts existing in the `default` package to ensure smooth operation.

---

## Issue, PR Registration

If you have any topics you want to communicate while using Gatsby-Starter-Haon,
feel free to leave a comment on the [Social page](https://gatsby-starter-haon.netlify.app/community/) or [Register an Issue](https://github.com/msung99/Gatsby-Starter-Haon/issues/1).

- Suggestions
- Q&A
- Bug discovery and code improvement
- New Features / Functions

You can leave comments or register issues freely using the Issue Template form.

Anything is welcome. We look forward to the opinions of many people for the enhancement of high-quality software and theme development 👍
