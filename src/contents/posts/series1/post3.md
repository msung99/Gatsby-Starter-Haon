---
title: OAuth 2.0 프로토콜 기반 소셜 로그인에 대해 알아보자!
description: JDBC 라이브러리 구현하기 를 진행해보면서, 학습한 내용을 정리했다.과거 HTTP 웹 서버가 가지고 있었던 문제는 사용자가 입력한 데이터가 서버를 재시작하면 사라진다는 점이다. 따라서 DB 서버를 도입해야 하는것은 당연시 되었다. 자바 진영에서 JDBC 표준 인터페이...
date: "2024-01-03"
tags:
  - Dao
  - Legacy
  - JDBC
  - Tag Example
  - connection
  - interface
series: My-Series3
---

> 이것은 인용문이다.

# Big Title

## 시작에 앞서 : 왜 OAuth를 학습하게 되었는가?

지난 포스팅 [[Spring Security] Refresh token, Access token란? 기존 JWT 보다 탈취 위험성을 낮춰보자!](https://velog.io/@msung99/Spring-Security-Refresh-token-Access-token-%EB%9E%80-%EA%B5%AC%ED%98%84%EB%B0%A9%EB%B2%95%EC%9D%80) 에서는 JWT 기반의 인증, 인가를 서비스에서 어떻게 구축하는가에 대해 알아봤습니다. 이를 활용해 현재 진행중인 사이드 프로젝트에서도 인증,인가 시스템을 구축했으나 소셜 로그인 기능이 빠지게되어 다소 밋밋한 경험이 될 것 같다는 생각이 들었습니다. 정말 아쉬울 것 같더라구요.
따라서 0Auth 2.0 에 대해 학습을 진행하게 되었고, 공부했던 내용을 쉽게 풀어쓰면서 많은 사람들과 함께 공유하고자 이렇게 적게 되었습니다.

---

## 잘못된 접근방식 : 서비스에게 우리 소셜 계정정보를 맡겨볼까?

![](https://velog.velcdn.com/images/msung99/post/58ebc0b2-53c7-422a-95f9-70df654e012b/image.png)

보통 서비스에서 회원가입, 로그인, 로그아웃등을 JWT 를 사용해서 구현합니다. 그런데 저희가 편리하게 사용중인 소셜로그인(카카오, 페이스북, 구글) 은 어떻게 구현할 수 있을까요?

이 기능은 내가 사용하고싶은 서비스의 로그인을 중개해주는 카카오, 구글과 같은 소셜이 관여합니다. 그런데 우리의 서비스가 사용자를 대신해 페이스북에 댓글을 달거나, 유저 목록을 가져오는등의 기능을 만들 수 있지 않을까요?

즉, 페이스북, 구글등의 소셜 계정정보를 사용자로부터 직접 제공받고 저희의 서비스에서 대신 댓글을 달아주거나, 소셜 팔로잉 정보를 조회해주는등의 기능을 개발할 수 있을것입니다.

그러나 내 소셜 아이디 계정을 여러 서비스에서 돌려쓴다고요? 만약 해당 서비스가 해킹당해서 내 소셜 계정정보가 모두 유출되면 어떻게할까요? 이는 서비스 개발자, 사용자 모두에게 큰 부담인 방식일겁니다. **즉, 서비스에서 유저의 소셜 계정 정보를 저장하고 있는 방식은 개발자와 유저 양측에게 큰 부담입니다.**

만일 해킹 당한다면 해커는 해당 소셜 계정으로 페이스북, 구글등 모든 소셜에 접근하여 가능한 모든 악의적인 행위를 할수 있습니다. 또한 페이스북, 구글 입장에서도 본인들의 계정 정보가 모두 털리는 방식이라면 큰 불안감만 남을것입니다.

이를 해결하기 위해 등장한 것이 바로 OAuth 입니다. 이를 이용하면 서비스와 로그인을 중개해주는 페이스북, 구글등의 소셜간의 서비스를 안전하게 상호작용하며 사용 가능합니다.

---

## OAuth가 그래서 뭘까?

> 현재 사용중인 서비스가, 서비스를 이용하는 사용자의 타 소셜 정보에 접근하기위해 권한을 타 소셜로 부터 위임받는 것입니다.

구글, 페이스북, 카카오와 같은 다양한 소셜 플랫폼에 접근하도록 제 3자 클라이언트(우리의 서비스) 가 접근 권한을 위임받을 수 있는 표준 프로토콜입니다.

### 타 플랫폼은 어떤 방식으로 사용자 소셜정보를 제공해주는가?

이때 페이스북, 구글등의 소셜이 서비스에게 "내 아이디와 비밀번호 계정정보를 그대로 제공하는 것이 아니라, accessToken 의 형태로 발급해줍니다. 그대로 발급하면 당연히 보안상의 큰 문제가 발생하겠죠?

본격적인 내용을 살펴보기전에, 핵심적인 내용을 먼저 요약해보자면 다음과 같습니다.

> - 타 소셜 플랫폼(ex.구글)은 제 3자 클라이언트(서비스)에게 쌩판 동일한 아이디, 비밀번호를 제공해주지 않습니다.

- 대신 서비스는 AccessToken을 발급받고 타 소셜 플랫폼의 일부 기능을 사용 가능해집니다.
- 타 소셜은 플랫폼은 모든 기능을 제공해주지는 않습니다. 그 중 서비스에서 사용하고자 하는 필요한 일부기능만을 부분적으로 접근 허용할 수 있게 해줍니다.

다 이해되지 않으셔도 괜찮습니다. 지금부터 상세하게 설명드릴 예정이니까요!

---

## OAuth 와 관련한 역할 및 용어

본격적으로 소셜 로그인의 메커니즘을 살퍄보기전에, 우선 아래 용어들을 이해하셔야 설명이 가능해집니다.

### Resource Owner

**내 서비스를 사용할 서비스의 사용자**입니다. 이 서비스 사용자들은 카카오, 구글등의 소셜 플랫폼에서의 리소스를 소유하고 있는 사용자입니다.

### Resource Server

**리소스 제공자(페이스북, 구글 등)** 으로, 데이터를 보유하고 있는 서버를 의미합니다.

### Authorization Server

Resource Owner를 인증하고, **내 서비스(클라이언트)에게 토큰을 발급해주는 서버**입니다.

### Client(= 내 서비스)

내 서비스, 즉 내가 구현할 애플리케이션을 의미합니다.
Resource Server 의 리소스를 이용하고자 하는 서비스가 되겠죠? 저희가 개발하고자 하는 서비스를 클라이언트라고 말하는 것입니다.

---

## OAuth 프로토콜의 다양한 권한부여 방식

OAuth 프로토콜은 다양한 종류로 다양한 클라이언트 환경에 적합한 권한 부여 방식을 제공하고 있습니다. 그 중 보편적이고 널리 쓰이는 한가지 방식에 대해서만 자세하게 다룰 예정이지만, 그래도 나머지 방식들도 간단히나마 알아보고 넘어가 보겠습니다.

### 1. Authorization Code Grant

> Authorization Code 를 발급받고 안전하게 AccessToken 을 발급받는 방식

- 권한부여 승인코드를 발급받고, 이를 활용해서 AccessToken을 발급받는 방식입니다. 가장 널리 쓰이는 방법으로, 아래에서 따로 자세히 설명드리겠습니다.

- **클라이언트(서비스)가 사용자를 대신해 특정 리소스에 접근을 요청할 때** 사용되는 방식입니다.
- 보통 타사의 클라이언트에게 보호된 자원을 제공하기 위한 인증에 사용됩니다. Refresh Token의 사용이 가능한 방식입니다.

### 2. Implicit Grant

![](https://velog.velcdn.com/images/msung99/post/4fe41375-667d-4a53-a272-da063ee3940f/image.png)

> AccessToken 을 URL에 담아서 바로 발급받는 방식. 탍취 위험성이 큽니다!

- **자격증명을 안전하게 저장하기 힘든 클라이언트**(ex: JavaScript등의 스크립트 언어를 사용한 브라우저)에게 최적화된 방식입니다.

- **권한 부여 승인 코드 없이 바로 Access Token이 발급 됩니다.** Access Token이 바로 전달되므로 만료기간을 짧게 설정함으로써 그토큰 탈취의 위험성을 줄여야합니다.

- Refresh Token 사용이 불가능한 방식이며, Access Token을 획득하기 위한 절차가 간소화되기에 효율성은 높아지지만 **Access Token이 URL에 담겨서 전달된다는 취약점이 있습니다.**

### 3. Resource Owner Password Credentials Grant

![](https://velog.velcdn.com/images/msung99/post/1e117431-5015-4c0f-a659-a1afcfc09e71/image.png)

- **간단하게 username, password로 Access Token을 받는 방식**입니다.

- 자신의 서비스에서 제공하는 어플리케이션일 경우에만 사용되는 인증 방식입니다. Refresh Token의 사용도 가능합니다.

---

## OAuth 흐름을 이해하기전에 이건 알고가자!

또 아셔야할 용어를 정리해보면 다음와 같습니다. 모든 용어를 한번에 기억하실 필요는 없습니다. 메커니즘을 이해하시다보면 자연스럽게 각 용어가 무엇을 뜻하는것인지 이해가 되실겁니다.

- **Authorization Code** : AccessToken 을 발급하기 위한 임시 인증코드. 생명주기가 매우 짧다(10분이내)

- **Client ID** : 클라이언트(애플리케이션)의 고유한 ID
  ex) goodapp-541106

- **Client Secret** : 클라이언트(애플리케이션)를 위한 비밀키이며, 서비스 제공자에게 요청을 보낼 때 애플리케이션의 신원을 알려주는 값 입니다.
- **Authorized Redirect URL(리다이렉션 엔드포인트)** : 서비스를 생성할 떄 등록한 Redirect URL.
  즉, Authorization Server가 권한을 부여하는 과정에서 Authorized Code를 전달해줄 경로 (Authorized redirect URl로 Authorized Code 를 전달해줘!)

- **scope** : 내 서비스(클라이언트)가 부여받은 리소스 접근 권한

- **인가 엔드포인트** : 클라이언트 애플리케이션이 인가 플로우를 시작할 때 사용하는 엔드포인트입니다. ex) 페이스북 로그인 페이지 URL

- **토큰 엔드포인트** : 클라이언트 애플리케이션이 토큰 플로우를 시작할 때 사용하는 엔드포인트입니다.

---

## OAuth 메커니즘 : Authorization Code Grant

이제 가장 보편적으로 사용되는 Authorization Code Grant 방식을 알아보겠습니다. 절차는 아래와 같습니다.
![](https://velog.velcdn.com/images/msung99/post/ec070ca4-2685-4d8a-83d0-5babc89ebb09/image.png)

### 1~2. 로그인 요청 및 Authorizaion Code 요청

서비스 사용자가 "페이스북 로그인 하기" 버튼을 눌러서 로그인을 요청하는 경우입니다. Client(서비스)는 Authorization Code 를 요청할 수 있도록 사용자의 브라우저를 Authorization Server로 보내야합니다. ( Authorization URL을 통해 이동시키기!)

#### Authorization URL 요청에 포함되는 파라미터

위 그림에도 적어놓았듯이, 클라이언트는 Authorization Server 가 제공하는 Authorization URL 에 다음 파라미터들을 쿼리스트링으로 포함해서 보내야합니다.

- redirect_uri, client_id, response_type, scope

예시

```java
https://google.com/authoirzation?rediect_uri=https://maestro.com/main
&client_id=1298381293123873
&response_type=code
&scope=create+read
```

- **이러한 인증 URL은 백엔드에서 생성하고, 프론트엔드는 백엔드로부터 URL 을 가져오는 것이 통상적입니다.**

---

### 3~4. 로그인 시도

![](https://velog.velcdn.com/images/msung99/post/806d6552-1e7b-4f03-aa60-c0030996ba6a/image.png)

사용자의 브라우저가 소셜 로그인 페이지(ex. 페이스북 로그인 브라우저 화면) 로 이동되었다면, 소셜 로그인을 시도하면 됩니다.

---

### 5~6. Authorization Code 발급 + Redirect URl 로 리다이렉트

사용자가 앞서 올바른 소셜 계정을 입력하고 인증을 마쳤다면, Authorization Server 는 Authorization Code 를 발급해주고 지정한 Redirect URI 로 사용자를 리다이렉션 시켜줍니다.

**이때 Redirect URI 는 백엔드가 아닌, 프론트엔드의 URI 로 리다이렉션 시켜줘야합니다.**

#### Authorization Code 는 어떻게 발급해줄까?

=> **Redirect URI에 Authorization Code 를 포함하여 사용자를 리다이렉션 시켜주는 방식입니다.** 구글의 경우 Authorization Code 를 QueryString에 포함하는 방식입니다.

---

### 7~8. Authorization Code 로 AccessToken 발급후 저장하기

발급받은 Authorization Code 는 Access Token 을 발급받기위한 임시 코드입니다.

- 클라이언트(Client) 는 Authorization Server 에 Authorization Code 를 전송하고, Access Token 을 발급받으면 됩니다.

- 클라이언트는 발급받은 Resource Owner(사용자)의 Access Token 을 DB 에도 저장해두고, 로컬 스토리지에도 저장해두는 처리가 필요합니다.

- 이후 Resource Server(ex.구글, 페이스북) 에서 Resource Owner(사용자)의 리소스에 접근하기 위해서 Access Token 을 사용합니다.

#### Authorization Code 와 Access Token 의 교환은 어디서 이루어질까? : OAuth 엔드포인트

이들의 교환은 OAuth 토큰 엔드포인트에서 이루어집니다.
더 자세한 내용은 [Google Cloud Docs : OAuth 엔드포인트 이해](https://cloud.google.com/apigee/docs/api-platform/security/oauth/configuring-oauth-endpoints-and-policies?hl=ko) 를 참고하시면 좋을듯합니다.

아래 예시는 토큰 엔드포인트에서 Access Token 을 발급받기 위한 HTTP 요청의 예시입니다.

- **지정된 프론트앤드 URI 로 리다이렉트가 되었다면, 함께 전달된 Authorization Code 를 백엔드 API를 통해 백엔드로 전달해야합니다. Authrorization Code 를 전달받은 백엔드는 Authorization Code, Client ID, CLient Secret 등으로 Authorization Code 로 부터 Access Token 을 발급받으면 됩니다.**

- 이때 grant_type은 항상 authorization_code 로 설정되어 있어야합니다. 또 code 에는 발급받은 Authorization Code 를 할당하시면 됩니다.

```
POST /auth/getSocialToken HTTP/1.1
Host:https://google.com

grant_type=authorization_code
&redirect_uri=https://maestro:com/main
&code=12123125123
&client_id=221399881
&client_secret=2131231235
```

---

### 9~11. 인증이 필요한 API 요청시, Access Token 을 활용해 요청하기

AccessToken 을 발급받은 Resource Owner 는 이제 로그인에 성공한 것입니다.

앞으로 클라이언트는 저장해둔 Resource Owner 의 Access Token 을 활용해 Resource Server 에 필요한 자원을 요청하면 됩니다. 그리고 Resource Owner 에게 서버스를 제공해주면 되겠죠?

---

## Authorization Code 을 왜 써야할까? 필요성에 대해..

> 한줄요약 : URL에 직접 Access Token 을 전송받는 방식은 위험하니, 대신에 임시코드(Authorization Code) 를 발급받고 추후에 안전하게 발급받자!

앞선 Authorization Code Grant 방식을 보며 느낀점은, 왜 Authorization Code 를 굳이 써야할까라는 의문이 들었습니다. 그냥 바로Access Token 을 발급해줘도 되지 않을까요?

앞선 과정(5~6번)을 잘 떠올려봅시다. Redirect URI 를 통해서만 Authorization Code 를 발급받을 수 있다고했죠? 그런데 Access Token 을 발급받을때도 마찬가지로, **Redriect URI 를 통해서만 URL 안에 데이터를 실어서 전달받는 방법밖에 존재하지 않습니다**

이렇게 민감한 정보는 URL에 실려서 오면 정말 위험하겠죠? 따라서 Authorization Code 를 통해 우선 덜 민감한 정보를 URL로 발급받고, 추후 안전한 방법으로 Access Token 을 발급받는 것입니다.

---

## 마치며

지금까지 0AUth2.0 이란 무엇인지 이론적인 부분을 중점으로 설명드려봤습니다. 이것저것 여러 타 블로깅을 많이 참고헀었는데, 명확하게 설명해주는 블로깅은 거의 없어서 많이 애먹었던 것 같네요.

그래서 어떻게 0Auth 의 메커니즘 유기적으로 설명하는데 집중한 포스팅이였던 것 같습니다! 😁 제 포스팅을 보시는 분들이 저처럼 해매지 않았으면 하는 바람이기 때문입니다 ㅎㅎ

이번 포스팅이 0Auth 를 처음 학습하시는 분들에게 도움이 되었으면 하네요. 다음 포스팅으로는 구글 소셜 로그인을 어떻게 SpringBoot 에서 구현 가능한지를 다루어볼까 예정중입니다.

---

## 참고

[auth0 docuement](https://auth0.com/docs/)
[위키피디아 OAuth](https://ko.wikipedia.org/wiki/OAuth)
[[OAuth2.0] 애플리케이션 등록하기 by 페이스북
](https://minholee93.tistory.com/entry/OAuth20-%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EB%93%B1%EB%A1%9D%ED%95%98%EA%B8%B0)https://blog.naver.com/mds_datasecurity/222182943542
https://benohead.com/
[0Auth - 구글 소셜로그인 기능 구현
](https://velog.io/@usreon/google-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%82%BD%EC%A7%88-%EA%B3%BC%EC%A0%95)[Grace's Tech Blog : Authentication - OAuth2.0](https://libertegrace.tistory.com/entry/40-Authentication-OAuth-20?category=869766)

```

```
