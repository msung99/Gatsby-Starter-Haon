---
title: Redis Pub/Sub 으로 메시지브로커를 구축해보았다.
description: TomcatServletWebServerFactory, DispatherServlet 에 기반하여 애플리케이션 서버를 직접 구동해본다.
date: "2024-01-02"
tags:
  - Dao
  - Legacy
  - JDBC
  - connection
series: Computer Science 분석 과정 시리즈 리뉴얼판임
previewImage: new-redis.png
---

```python
import pandas as pd

print("hello!")

this is just contents!
```

```
this is just contents!
```

![내부 이미지](./profile.png)

지난 프론트 컨트롤러 구현에 이어서, 스프링부트 애플리케이션을 실행하기 까지의 전 과정에 대해 다루어보고자 한다. 또한 한 단계씩 거쳐가며 애플리케이션 로직을 리팩토링 해보겠다.

> 프론트 컨트롤러에 대한 설명은 [서블릿 컨테이너로 프론트 컨트롤러(Front Controller) 를 구현하여 공통 요청을 처리해보자!](https://velog.io/@msung99/프론트-컨트롤러를-구현하여-공통-웹-요청을-처리해보자) 을 참고하자.

---

## Assembler

스프링 컨테이너는 DI 컨테이너로써 `Assembler` 역할을 수행한다. `Assembler` 란 원래는 직접 의존관계가 없는 클래스들의 오브젝트를 가져다가 가져다가 서로 관계를 연결시켜주고 사용 가능하도록 만들어주는 **"제 3자"** 역할이다.

스프링 컨테이너는 우리가 제공한 메타 정보를 기반으로 클래스의 싱글톤 Bean 오브젝트를 생성하고, **각 오브젝트간의 의존 관계를 주입(연결) 해주는 작업을 수행한다.** 이때 관례적으로 Bean 오브젝트 간의 의존관계를 생성하는 것이 "생성자 주입" 일텐데, 생성자의 파라미터는 인터페이스로 추상화를 시켜놓는다.

인터페이스로 파라미터 객체를 받는 이유는 유연한 확장을 위함일 것이다. 개발자의 구현 코드 레벨에선 인터페이스로 추상화를 시켜놓고 확장을 위해 여러 구체 클래스를 만들었을텐데, 이 구체 클래스로 어떤 것을 "주입" 시켜줄지를 스프링 컨테이너에 등록해주는 것이다. 특정 Bean 클래스가 사용하고 싶은 Bean 구체 클래스를 바로 생성자 주입 통해 주입한다는 것이다.

### AppplicationContext

기존 프론트 컨트롤러에 스프링 컨테이너를 도입했다. 컨테이너에 등록할 Bean 객체는 `AppplicationContext` 로 등록한다. 이 인터페이스를 구현한 `GenericApplicationContext` 의 `registerBean()` 메소드를 통해 등록해줄 수 있다.

```java
public class HellobootApplication {
	public static void main(String[] args) {
		GenericApplicationContext applicationContext = new GenericApplicationContext();

		applicationContext.registerBean(HelloController.class);
		applicationContext.registerBean(SimpleHelloService.class); 로 넣겨준다.
		applicationContext.refresh();

		TomcatServletWebServerFactory serverFactory = new TomcatServletWebServerFactory();
		HelloController helloController = new HelloController();

		WebServer webServer = serverFactory.getWebServer(servletContext -> {
			servletContext.addServlet("hello", new HttpServlet() {
				@Override
				protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
					// 인증, 보안, 다국어등의 공통 처리 코드 부분 (생략함)
					if(req.getRequestURI().equals("/hello")) {
						String name = req.getParameter("name");

						HelloController helloController = applicationContext.getBean(HelloController.class);
						String ret = helloController.hello(name);

						resp.setContentType(MediaType.TEXT_PLAIN_VALUE);
						resp.getWriter().println(ret);
					}
					else if(req.getRequestURI().equals("/user")) {
						resp.setStatus(HttpStatus.OK.value());
					}
					else {
						resp.setStatus(HttpStatus.NOT_FOUND.value());
					}
				}
			}).addMapping("/*");
		});

		webServer.start();

	}
}
```

---

## DispatcherServlet

한편 이전까지 개발했던 서블릿 컨테이너는 Containerless 하지 못하다. 개발자 입장에선 프론트 컨트롤러를 매번 직접 구현하는 과정이 꽤나 번거롭다. `매핑 코드` (ex. URL 경로, HTTP 메소드), `파라미터` (ex. DTO) 등 애플리케이션 로직과 긴밀하게 연결된 코드들이 서블릿 컨테이너 내부 구현 코드로 등장한다는 것이다.

### Servlet Containerless

이 떄문에 `Servlet Containerless` 를 만드는 것의 필요성이 느껴찐다. 그래서 등장한 것이 바로 `DispatcherServlet` 이다. 기존의 서블릿 컨테이너에서 직접 하드코딩했던 수고가 줄어들게 되었다.

### 어노테이션으로 메타 정보를 전달하는 방법

기존에 하드 코딩했던 서블릿은 URL 매핑 정보, 파라미터, 스프링 컨테이너와의 매핑 정보등의 "메타 정보" 를 직접 구현했었다. 하지만 반면 DispatcherServlet 은 이런 직접 일일이 구현해야했던 수고를 없애도록 `어노테이션` 을 활용한 방법이 등장했다.

```java
@RequestMapping
public class HelloController {
    private final HelloService helloService;

    public HelloController(HelloService helloService) {
        this.helloService = helloService;
    }

    @GetMapping("/hello")
    @ResponseBody
    public String hello(String name) {
        return helloService.sayHello(Objects.requireNonNull(name));
    }
}
```

매핑 정보를 서블릿 코드에 직접 넣는 대신에, 그 요청을 처리할 Controller 클래스 내부에다 매핑 정보를 대신 집어넣는 방법이다. 클래스 레벨에선 `@RequestMapping` 을, 메소드 레벨에선 `@GetMapping` 등의 어노테이션을 간단히 붙임으로써 DispatcherServlet 은 메타 정보를 인식할 수 있게된다.

위와 같이 개선하면 DispatcherServlet 은 먼저 클래스 레벨에서 매핑 정보를 찾고, 그 클래스 내부의 메소드 레벨에서 추가 정보를 찾는다.

참고로 hello() 메소드에서 그냥 String 데이터를 리턴해버리면 View 를 랜더링하게 된다. 즉 Stirng 리턴 값을 View 이름 값으로 인식하는 것이다. hello.html 을 찾고 랜더링 하고자 하므로 404 에러가 발생하는데, 이는 `@ResponseBody` 를 붙여줌으로써 해결된다. 사실 `@RestController` 를 클래스에 붙인다면 기본적으로 해당 클래스 내부의 모든 메소드에 `@ResponseBody` 가 붙어있지만, 여기선 `@RestController` 를 활용하지 않았기 떄문에 이 어노테이션을 붙여준 것이다.

---

## 스프링 컨테이너, 서블릿 컨테이너 초기화 코드 최소화하기

앞서 설명한 내용을 기반으로 코드를 구성한다면 크게 2개의 파트로 구분된다. 우선 `(1) 스프링 컨테이너 초기화 작업` 일 것이다. 스프링 컨테이너를 생성하고 Bean 을 등록하여 `초기화` 작업을 해주는 부분이다. 또한 `(2) 서블릿 컨테이너 초기화 작업` 도 발생한다. 그렇게 만들어진 스프링 컨테이너를 활용하면서 서블릿 컨테이너를 코드에서 생성하고, 그 내부에 프론트 컨트롤러 역할을 하는 `DispatcherServlet` 을 등록하는 부분이다.

이렇게 과정 `(1)`, `(2)` 로 구분된 "초기화" 작업 코드를 최소화해보고 싶다. `(1)` 에서 발생하는 서블릿 컨테이너를 생성하고 초기화하는 하드 코딩 을 `(2)` 를 실행하는 중간에 발생하도록 개선해보겠다. **즉, 스프링 컨테이너를 초기화하는 중간에 서블릿 컨테이너 생성 및 초기화도 발생하도록 한다는 것이다.**

### GenericWebApplicationContext 를 활용한 초기화

스프링 컨테이너의 초기화 작업은 `GenericWebApplicationContext` 의 `refresh()` 메소드를 호출하여 발생한다. 이때 refesh() 를 호출하여 초기화 작업이 일어나는 중간에 부가적인 추가 작업을 수행하기 위해선 `GenericWebApplicationContext` 클래스를 상속한 새로운 클래스를 하나 만들고, `onRefesh()` 라는 메소드를 재정의 해줘야한다.

우리는 이 새로운 클래스를 익명 클래스로 상속하겠다.

```java
public class HellobootApplication {
	public static void main(String[] args) {
		GenericWebApplicationContext applicationContext = new GenericWebApplicationContext() {
			@Override
			protected void onRefresh() {
				super.onRefresh(); // 익명클래스가 onRefresh() 를 오버라이딩 한다.

				// 서블릿 컨테이너 초기화 코드는 아래와 같이 삽입해줬다.
				TomcatServletWebServerFactory serverFactory = new TomcatServletWebServerFactory();

				WebServer webServer = serverFactory.getWebServer(servletContext -> {
					servletContext.addServlet( "dispatcherServlet",
							new DispatcherServlet(this)
					).addMapping("/*");
				});

				webServer.start();
			}
		};

		applicationContext.registerBean(HelloController.class);
		applicationContext.registerBean(SimpleHelloService.class);

		applicationContext.refresh();
	}
}
```

서블릿 컨테이너를 초기화하는 코드를 `onRefresh()` 재정의시에 넣어주면 된다. 이렇게 되면 스프링 컨테이너의 초기화 작업이 발생할 때 동시에 서블릿 컨테이너의 생성 및 초기화 작업도 일어날 수 있게된다.

---

## 자바 팩토리 메소드로 Bean 오브젝트 구성하기

앞서 살펴봤던 `ApplicationContext` 의 `registerBean()` 를 통해 Bean 오브젝트를 등록했지만, `@Bean` 어노테이션이 붙은 자바 팩토리 메소드를 통해서도 스프링 컨테이너에 빈 등록이 가능하다.

이후 한 가지 작업을 더 해줘야한다. `@Configuration` 을 클래스 레벨에 붙이는 것이다. 그러면 스프링 컨테이너가 해당 클래스 내부 내용을 통해 Bean 오브젝트를 가진, 즉 자바 팩토리 메소드 구성정보를 가짐을 알 수 있게된다.

요약하자면, **스프링 컨테이너는** `@Configuration` **이 붙은 클래스를 인식하여 @Bean 어노테이션이 붙은 팩토리 메소드를 기반으로 빈을 구성한다.**

### AnnotationConfigWebApplicationContext

또한 기존 `GenericWebApplicationContext` 는 자바 코드로 만든 구성 정보를 인식하지 못한다. 이는 `AnnotationConfigWebApplicationContext` 로 대체하면 된다. 이 클래스 객체는 어노테이션이 붙은, 즉 `@Bean` 이 붙은 자바 코드를 기반으로 구성 정보를 읽어오고 빈을 구성한다.

`AnnotationConfigWebApplicationContext` 은 기존의 `registerBean()` 메소드를 지원하지 않는다. 이를 자바 코드로 구성 정보를 가지고 있는 클래스 (즉 `@Configuation` 이 붙은 클래스) 를 등록해줘야한다. 이를 `register()` 메소드로 아래와 같이 구성해준다.

```java
@Configuration
public class HellobootApplication {
	@Bean
	public HelloController helloController(HelloService helloService) {
		return new HelloController(helloService);
	}

	@Bean
	public HelloService helloService() {
		return new SimpleHelloService();
	}

	public static void main(String[] args) {
		AnnotationConfigWebApplicationContext applicationContext = new AnnotationConfigWebApplicationContext() {
			@Override
			protected void onRefresh() {
				super.onRefresh();

				TomcatServletWebServerFactory serverFactory = new TomcatServletWebServerFactory();

				WebServer webServer = serverFactory.getWebServer(servletContext -> {
					servletContext.addServlet( "dispatcherServlet",
							new DispatcherServlet(this)
					).addMapping("/*");
				});

				webServer.start();
			}
		};
		applicationContext.register(HellobootApplication.class);

		applicationContext.refresh();
	}
}

```

---

## 컴포넌트 스캔으로 리팩토링

`@Component` 를 활용하면 `@Configuration`, `@Bean` 등으로 직접 등록하던 팩토리 메소드를 제거한다. 즉 설정 정보 클래스를 제거하고 간단히 클래스에다 `@Component` 를 붙일 수 있다. 또한 `@Component` 가 붙은 클래스를 찾아서 빈으로 등록해 달라는 것을 `@ComponentScan` 을 붙임으로써 컨테이너에게 전달할 수 있다.

```java
@Configuration
@ComponentScan
public class HellobootApplication {

	public static void main(String[] args) {
		AnnotationConfigWebApplicationContext applicationContext = new AnnotationConfigWebApplicationContext() {
			@Override
			protected void onRefresh() {
				super.onRefresh();

				TomcatServletWebServerFactory serverFactory = new TomcatServletWebServerFactory();

				WebServer webServer = serverFactory.getWebServer(servletContext -> {
					servletContext.addServlet( "dispatcherServlet",
							new DispatcherServlet(this)
					).addMapping("/*");
				});

				webServer.start();
			}
		};
		applicationContext.register(HellobootApplication.class);

		applicationContext.refresh();
	}
}

```

위처럼 applicationContext 가 등록된 HellobootApplication 클래스 위에 `@ComponentScan` 이 붙어있으면, 이 클래스가 붙어있는 패키지부터 시작해서 그 하위 패키지를 뒤져서 `@Component` 라는 어노테이션이 붙은 모든 클래스를 Bean 으로 등록한다. Bean 으로 등록할 때 필요하다면 의존 오브젝트를 찾아나고 이를 생성자를 호출할 때 파라미터로 넘겨주기도 한다.

---

## TomcatServletWebServerFactory, DispatcherServlet 를 Bean 으로 등록

당연히도 `TomcatServletWebServerFactory`, `DispatcherServlet` 이 없다면 애플리케이션 서버를 시작할 수 없다. 이 2개의 으브젝트도 Bean 으로 등록해줘야 한다.

앞서 말했길, `DispatcherServlet` 은 자신이 이용할 컨트롤러를 찾아야하기 때문에 `ApplicationContext` 을 파라미터로 넘겨줘야 한다고 했었다. 이에 따라, DispatcherServlet 이 아래와 같이 `setAppplicationContext()` 라는 setter 를 호출하도록 한다. 파라미터로 `this` 키워드를 넣었다. 즉 ApplicationContext 를 파라미터로 넘겨준 것이라 볼 수 있다.

```java
@Configuration
@ComponentScan
public class HellobootApplication {
	@Bean
	public ServletWebServerFactory servletWebServerFactory() {
		return new TomcatServletWebServerFactory();
	}

	@Bean
	public DispatcherServlet dispatcherServlet() {
		return new DispatcherServlet();
	}

	public static void main(String[] args) {
		AnnotationConfigWebApplicationContext applicationContext = new AnnotationConfigWebApplicationContext() {
			@Override
			protected void onRefresh() {
				super.onRefresh();

				ServletWebServerFactory serverFactory = this.getBean(ServletWebServerFactory.class);
				DispatcherServlet dispatcherServlet = this.getBean(DispatcherServlet.class);

				dispatcherServlet.setApplicationContext(this);//setter 호출

				WebServer webServer = serverFactory.getWebServer(servletContext -> {
					servletContext.addServlet( "dispatcherServlet",
							new DispatcherServlet(this)
					).addMapping("/*");
				});

				webServer.start();
			}
		};
		applicationContext.register(HellobootApplication.class);

		applicationContext.refresh();
	}
}
```

### ApplicationContextAware

하지만 이렇게 setter 를 호출할 필요가 없다. 이 이유를 알기 위해선 먼저 `ApplicationContextAware` 라는 인터페이스에 대해 알아야한다.

`ApplicationContextAware` 는 인터페이스 타입으로, 대표적인 구현 클래스로 `DispatcherServlet` 가 해당된다. ApplicationContextAware 의 정의문에 따르면, 이 인터페이스를 구현한 구현 클래스가 스프링의 빈으로 등록이 되면 자동으로 setApplication 메소드를 자동 호출하여 주입해준다.

**즉, 우리 대신에 스프릴 컨테이너가 DispatcherServlet 은 ApplicationContext 가 필요하다고 생각하고 자동으로 주입한다.** 따라서 굳이 setter 를 직접 호출하지 않아도 자동으로 setter 가 호출된다. 위 코드에서 setter 호출문은 제거해주자.

---

## 최종 SpringBootApplication 구현

마지막으로 기존 코드, 즉 서블릿 컨테이너와 서블릿 컨테이너를 초기화 후 애플리케이션을 구동하는 코드를 `run()` 이라는 메소드로 따로 분리시켜보자.

### run() 생성

현재 클래스 HellobootApplication 뿐만 아니라, 다른 메인이 되는 여러 클래스에서도 서블릿 컨테이너를 코드에서 자동으로 띄워주면서 스프링 컨테이너에서 필요한 정보를 받아와서 기본적인 기능을 수행할 수 있도록 만드는 메소드라고 볼 수 있다. **즉, 스프링 컨테이너 초기 준비작업을 해주는데 이 메소드를 재사용할 수 있다.**

```java
@Configuration
@ComponentScan
public class HellobootApplication {
	@Bean
	public ServletWebServerFactory servletWebServerFactory() {
		return new TomcatServletWebServerFactory();
	}

	@Bean
	public DispatcherServlet dispatcherServlet() {
		return new DispatcherServlet();
	}

	public static void main(String[] args) {
		run(HellobootApplication.class, args);
	}

	public static void run(Class<?> applicationClass, String[] args) {
		AnnotationConfigWebApplicationContext applicationContext = new AnnotationConfigWebApplicationContext() {
			@Override
			protected void onRefresh() {
				super.onRefresh();

				ServletWebServerFactory serverFactory = this.getBean(ServletWebServerFactory.class);
				DispatcherServlet dispatcherServlet = this.getBean(DispatcherServlet.class);

				WebServer webServer = serverFactory.getWebServer(servletContext -> {
					servletContext.addServlet( "dispatcherServlet",
							new DispatcherServlet(this)
					).addMapping("/*");
				});

				webServer.start();
			}
		};
		applicationContext.register(HellobootApplication.class);

		applicationContext.refresh();
	}
}
```

### 최종 run() 분리, SpringBootApplication 생성

최종적으로 MySpringBootApplication 이라는 클래스로 run() 를 분리했다. 이 결과는 우리가 평소에 자주봤던 SpringBootApplication 시작을 위한 `run()` 메소드와 매우 유사하다. 이러한 내부 동작원리로 스프링부트 애플리케이션을 가동할 수 있었던 것이다 🙂

```java
@ComponentScan
public class HellobootApplication {
	@Bean
	public ServletWebServerFactory servletWebServerFactory() {
		return new TomcatServletWebServerFactory();
	}

	@Bean
	public DispatcherServlet dispatcherServlet() {
		return new DispatcherServlet();
	}

	public static void main(String[] args) {
		MySpringBootApplication.run(HellobootApplication.class, args);
	}
}



public class MySpringBootApplication {
    public static void run(Class<?> applicationClass, String[] args) {
        AnnotationConfigWebApplicationContext applicationContext = new AnnotationConfigWebApplicationContext() {
            @Override
            protected void onRefresh() {
                super.onRefresh();

                ServletWebServerFactory serverFactory = this.getBean(ServletWebServerFactory.class);
                DispatcherServlet dispatcherServlet = this.getBean(DispatcherServlet.class);

                WebServer webServer = serverFactory.getWebServer(servletContext -> {
                    servletContext.addServlet( "dispatcherServlet",
                            new DispatcherServlet(this)
                    ).addMapping("/*");
                });

                webServer.start();
            }
        };
        applicationContext.register(HellobootApplication.class);

        applicationContext.refresh();
    }
}
```

---

## 마치며

이렇게까지 SpringBootApplication 의 `run()` 을 어떻게 구동시킬 수 있는지를 직접 코드를 구현하여 내부 원리를 이해할 수 있었다. 이번 학습은 정말정말 대만족스럽다 😆 항상 서블릿과 JSP 를 등한시 해왔던 내가 드디어 "왜" 중요하다는지 에 대한 명확한 설명을 할 수 있게 되었다.

하지만 아직 학습해야 할 내용이 많이 남았다. 특히 구현한 코드는 실제 `run()` 메소드와 다르게 `DispatcherServlet`, `TomcatServletWebServerFactory` 에 대한 Bean 오브젝트를 스프링 컨테이너에 등록해줘야 한다. 이에 대한 해결방안은 천천히 찾아보고자 한다 🙂

---

## 더 학습해볼 키워드

- ServletWebServerFactory, DispatcherServlet 에 대한 Bean 오브젝트 없이 어떻게 run() 메소드를 동일하게 구현할 수 있는가?
- Jetty
- ApplicationContext (아직 더 깊은 이해도가 필요한건 사실이다 🥹)
