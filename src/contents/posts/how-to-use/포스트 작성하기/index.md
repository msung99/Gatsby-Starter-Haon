---
title: 마크다운 포스트 작성법, 작성시 세부 기능들 ✍️
description: 현 템플릿을 어떻게 사용하는지 알아봅시다.
date: "2024-03-02"
tags:
  - Introduce
  - About
series: how to use this template?
previewImage: "writing.png"
---

## 1. MarkDown 기반

이 템플릿은 Markdown 작성법을 기반으로 합니다. 글 작성을 위해 `/src/contents/posts` 아래 디렉토리에 포스트를 생성하고 마크다운 형식으로 작성해야 합니다.

예를들어 `/src/contents/posts` 아래 디렉토리에 `how-to-use` 라는 디렉토리(폴더)를 생성하고 `index.md` 파일에 포스트를 작성하면 됩니다. 이 예시의 경우 포스트의 URL 이 `http(s)://your-domain/how-to-use` 로 지정됩니다.

---

## 2. 메타 정보

마크다운 파일을 생성했다면, 해당 포스트에 대한 메타정보를 필수로 기입해야 합니다. 기입 정보는 아래와 같습니다.

```
---
title: 포스트 작성법, 작성시 세부 기능들
description: 현 템플릿을 어떻게 사용하는지 알아봅시다.
date: "2024-03-02"
tags:
  - Introduce
  - About
series: how to use this template?
// isPrivate: true
---
```

각 메타 정보에 대한 설명은 다음과 같습니다.

- `title` : 포스트의 제목
- `description` : 포스트에 대한 설명 요약. 생략시
- `date` : 포스팅 날짜
- `tags` : 태그 리스트
- `series` : 시리즈 (카테고리 개념과 유사)
- `isPrivate` : 비공개 여부. (현 포스트에 대해 비공개를 원할시 "isPrivate: true" 를 지정해주세요.)

---

## 3. 포스트 내부에 이미지 추가

포스트에 이미지를 추가시, 아래와 같은 형식으로 이미지를 첨부할 수 있습니다. 이미지는 동일한 폴더 내에 (즉, 현재 markdown 파일과 동일한 폴더 안에) 위치해야 한다는 점을 유의해주세요.

```
![](이미지 이름)
```

아래는 `image1.png` 라는 이름의 이미지를 첨부한 예시입니다.

![](image1.png)

---

## 4. 포스트 미리보기 이미지 (썸네일)

포스트 미리보기 기능도 존재합니다. 썸네일이라고 봐도 좋겠습니다.

미리보기 이미지를 첨부하는 경로는 앞서 살펴본 이미지 추가 경로와 조금 다릅니다. 포스트 내부에 이미지를 추가할 땐 마크다운 파일과 동일한 폴더 내에 위치시키면 되지만, 미리보기 썸네일 이미지는 `static` 이라는 폴더내에 이미지를 추가해줘야 합니다.

`writing.png` 이라는 미리보기 이미지를 static 폴더내 위치했다면, 포스트는 다음과 같이 조회됩니다.

![](result.png)

멋진 미리보기를 마음껏 꾸며보세요!

---

## 5. Toc (목차)

![](toc.png)

포스트 우측 상단을 보면 목차 기능이 존재하는 것을 볼 수 있습니다. 목차에 생성되는 텍스트는 h1, h2, h3 에 타이틀에 기반해 있습니다.

---

## 6. 기능 요약

포스트 기능을 정리해보자면 다음과 같습니다.

- `Markdown`
- `Tags`
- `Series`
- `Share` (공유하기 기능 : 포스트 링크 복사 / Facebook 공유 / Twitter 공유)
- `private mode` (포스트 공개 / 비공개)
- `Toc`
