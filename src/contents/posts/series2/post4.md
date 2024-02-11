---
title: 소트웍스 엔솔로지의 객체치향 생활체조 원칙 전반부
description: 객체지향 생활체조 원칙의 전반부를 알아보자!
date: "2024-01-04"
tags:
  - Dao
  - Legacy
  - JDBC
  - Tag Example
---

## 학습배경

마틴 파울러의 소트웍스 엔솔러지에는 객제치향을 위한 9가지 원칙을 정의해 놓았습니다. 우아한테크코스 프리코스 풀이하면서 객제치향에 대한 설계법을 혼자서 깊게 고민할 때 계속 등장했던 키워드인데, 우선 자바에 대한 깊은 이해가 부족하다고 생각이 들었기 때문에 우선순위에서 밀려났습니다.

지금부터 객제치향 원칙에 대해 공부해보고자 합니다 아직 객제치향에 대한 "깊은" 이해는 부족하기 때문에, 일단 최대한 기초를 이해하는데만 집중해보고 추후 제대로 이해한 내용을 기반으로 깊은 것들을 다루어보겠습니다. 또한 이번에는 9가지 원칙중 전반부에 대해서만 다루도록 합니다.

---

## 원칙1. 한 메소드에 오직 한 단계의 들여쓰기만 한다

> "함수는 한 가지 일을 수행해야한다. 그 한가지만을 잘 해야한다. - Clean Code

한 메소드에 들여쓰기가 여러개 존재한다면, 해당 메소드는 여러가지 일을 수행한다고 봐도 무방합니다. 메소드는 본인이 맡은 일이 적을수록(잘개 쪼갤수록) 재사용성이 높고 디버깅도 유용합니다. **즉, 코드의 들여쓰기와 중첩 구조가 깊어질수록 가독성이 떨어지므로, 들여쓰기는 최소화하는 것이 좋습니다.**

```java
public String getLines(){
  StringBuilder stringBuilder = new StringBuilder();
  for(int i=0; i<10; i++){
    for(int j=0; j<5; J++){
      stringBuilder.append("one");
    }
    stringBuilder.append("two");
  }
  return stringBuilder.toString();
}
```

### 메소드 추출기법(Extract Method)

위와 같은 함수의 구조는 아래와 같이 개선해볼 수 있습니다. 마틴 파울러의 책에서 소개한 **"메소드 추출(Extract Method)"** 기법을 활용하면 가독성이 올라갑니다. 메소드 추출은 코드으 일부분을 메소드로 분리하여, 코드의 복잡도를 낮추는 기법입니다.

```java
public String getLines(){
  StringBuilder stringBuilder = new StringBuilder();
  repeatPrint(stringBuilder);
  return stringBuilder.toString();
}

private void repeatRows(StringBuilder stringBuilder){
  for(int i=0; i<10; i++){
    repeatRow(stringBuilder);
    stringBuilder.append("two");
  }
}

private void repeatRow(StringBuilder stringBuilder){
  for(int i=0; i<5; i++){
    stringBuilder.append("one");
  }
}
```

---

## 원칙2. else 키워드를 쓰지 않는다.

프로그래밍을 처음 접할 때 else 문을 많이 사용해봤을 것이지만, 저희는 else 키워드를 사용하지 않고도 분기처리 코드를 원활히 작성할 수 있습니다. 이 원칙은 `원칙1. 한 메소드에 오직 한 단계의 들여쓰기만 한다` 내용과도 밀접하게 연관된 내용입니다. **else 문을 남용하면 자칫 중첩된 여러 조건문이 작성되고, 인덴트(들여쓰기)의 깊이가 늘어날 수 있기 때문입니다.**

```java
public void printPriceStatus(int price){
  if(price < 1000){
    System.out.println("저렴합니다");
  } else {
    if(price < 5000) {
      System.out.println("무난합니다");
    } else {
      if(price < 10000) {
        System.out.println("비쌉니다");
      } else {
        System.out.println("논외적으로 너무 비쌉니다");
      }.
    }
  }
}
```

위 코드는 중복되는 조건문이 많이 겹쳐있으니 읽기 힘든 코드가 되었습니다. 정확히는, if 절이 중첩되면서 동작흐름 파악이 힘든 `Arrow Anti Pattern` 이 전형적인 사례입니다.

### Early Pattern

이렇듯 else 키워드를 사용하면 자칫 else 문 안에서 또 else 문을 작성하게 될 가능성이 있으니, 사용을 지양합시다. 위 코드는 아래처럼 `Early Pattern` 을 적용하여 개선할 수 있습니다.`Early Pattern` 이란, 조건문내의 조건이 일치하면 그 즉시 반환하는 디자인 패턴이니다.

```java
public void printPriceStatus(int price){
  if(price < 1000){
    System.out.println("저렴합니다");
  }
  if(price < 5000){
    System.out.println("무난합니다");
  }
  if(price < 10000){
    System.out.println("비쌉니다");
  }
  System.out.println("논외적으로 너무 비쌉니다"); // 보호절(Guard Clause)
}
```

위 코드에서 유의할 부분은 `보호 구문(Guard Clause)` 로 일반 케이스를 벗어난 부분에 대한 예외처리를 감싸주고 있습니다. 보호 구문이란, 실제 처리할 일반적으로 처리되는 if 분기문에 케이스가 잡히지않고 유효하지 않은 상황으로 분기되는 기타 특이사항에 대하여 처리하는 것을 뜻합니다. 위 경우는 "논외적으로 너무 비쌉니다" 부분이 보호절입니다.

### 다형성(polymorphism) 기반의 디자인패턴

위처럼 간단한 경우는 `보호 구문` 을 사용하면 충분하나, 객체지향의 특성상 주요 특징인 다형성을 활용하는 방법도 있습니다. 다형성의 대표 사례로 `전략 패턴(Strategy Pattern)` 이나 `널 객체 패턴(Null Object Pattern)` 을 사용할 수도 있습니다.

> 전략패턴에 대한 자세한 이론은 [전략 패턴이란 무엇일까?](https://velog.io/@msung99/전략-패턴이란-무엇일까) 를 참고하자.

널 객체 패턴에 대한 이론은 추후 자세히 학습하도록 하겠습니다.

---

## 원칙3. 모든 원시값과 문자열을 포장(Wrap) 한다.

원시타입 데이터는 그 자체만으로 아무런 의미를 가지고 있지 않습니다. 원시값에 대한 의미를 변수명으로 추론하는 것도 한계가 있으므로, 실수를 범할 가능성이 커집니다.

예를들어 아래와 같은 주문 도메인 클래스가 있다고 해봅시다. money 는 주문 가격정보를 뜻하며, distance 는 주문 배달거리를 뜻합니다.

```java
public class Order {
  private int money;
  private int distance;

  public Order(int money, int distance){
    this.money = money;
    this.distance = distance;
  }
  // ...
}
```

그리고 아래와 같이 주문정보 객체가 생성된다고 해봅시다. 주문가격은 30만원이며, 배달거리는 1km 를 뜻합니다.

```java
Order order = new Order(300000, 1);
```

하지만 개발자가 실수로 로직을 잘못 설계하여 파라미터의 순서를 잘못 고려하여 값을 주입헀다고 해봅시다. 아래 객체가 뜻하는것은 가격이 1원이며, 배달거리는무려 300,000km 를 뜻하게됩니다.

```java
Order order = new Order(1, 300000);
```

### 원시타입에 대한 집착

위와 같은 실수를 범하게되는 주 원인은 무엇일까요? 우선 money 와 distance 는 int 라는 동일한 원시타입으로 표현됩니다. 따라서 이 필드들을 구분할 수 있는것은 오로지 변수명에만 의존하게 됩니다. 비슷한 이유로, 생성자의 파라미터 순서에만 의존하여 필드주입을 시도합니다. 이렇게 **도메인을 표현시 원시타입만을 사용하여 표현하는 것을 "원시 타입에 대한 집착(Primitive Obession) 안티패턴"** 이라고 합니다.

### 원사타입을 레핑하기

![](https://velog.velcdn.com/images/msung99/post/03fc0315-df39-4f4e-9661-a2dfde148b2f/image.png)

위 코드를 개선하면 아래와 같습니다. 원시값을 도메인 클래스로 감싸서 `VO(Value Object)` 로써 표현했고, 이로써 원시값에 정확한 의미가 부여되었습니다. 기존의 Money, Distance 와 관련된 비즈니스 검증 및 간단한 로직을 모두 Order 에서 도맡에 수행했겠지만, 이 무거운 역할과 책임을 Money, Distance 에게 적절히 분배했습니다.

```java
public class Order {
  private final Money money;
  private final Distance distance;

  public Order(final Money money, final Distance distance){
    this.money = money;
    this.distance = distance;
  }
  // ...
}

public class Money {
  private int money;

  public Money(int money){
    validator(money);
    this.money = money;
  }
  // ...
}

public class Distance {
  private int distance;

  public Distance(int distance){
    validator(distance);
    this.distance = distance;
  }
  // ...
}
```

이 원칙3 은 추후 설명할 `원칙8. 일급 컬렉션을 사용하기` 와도 매우 유사한 원리와 규칙입니다.

---

## 원칙4. 한 줄에 점을 하나만 찍는다.

저도 자주 실수를 범했던 문제로, `getter` 메소드에 점을 2개이상 사용하여 객체 멤버에 접근했었습니다. 앞선 Order 클래스에 대한 금액 Money 를 조회하고 싶을때, 아래와 같이 조회할 수 있을겁니다.

```java
if(order.getMoney().getValue() > 1000000){
  throw new IllegalArgumentException("백만원 이상의 주문가격은 허용되지 않습니다.");
}
```

위 코드의 문제점은 무엇일까요? 바로 **한줄에 점이 2개이상 찍이면서 결함도가 높아졌다는 것입니다.** 위 Order 클래스에 대한 로직은 Order 뿐 아니라 Money 에 대한 의존성도 동시에 갖게 되었습니다.

### 디미터 법칙(Demeter Law)

> 디미터 법칙(Demeter Law) : "낯선 이와 대화하지 말고, 친구하고만 대화하라"

이 원칙4 는 디미터 법칙은 쉽게 풀어썼다고 보면 됩니다. **즉, 자신 소유의 객체, 자신이 생성한 객체, 그리고 누군가 준(파라미터로) 객체에만 메시지를 보내야함을 의미합니다.** 그렇지 않을경우, 다른 객체에 너무 깊숙하게 관여하게 되는것이며(과한 의존성) 이는 캡슐화를 어기는것이기도 합니다.

쉽게 말하자면 **객체간의 의존성이 그래프 형태를 띄고있을때, 한 객체에서 객체 그래프를 따라가서 멀리 떨어진 객체에게 메세지를 보내는 설계를 피하라는 것입니다.** 이는 객체간의 결함도를 높이는 행위이기 때문이죠.

위 코드는 아래와 같이 개선할 수 있습니다.

```java
if(order.isOverFlowMoney()){
  throw new IllegalArgumentException("백만원 이상의 주문가격은 허용되지 않습니다.");
}

class Order {
  private Money money;
  // ...
  public boolean isOverFlowMoney(){
     return money.getValue() > 1000000;
  }
}
```

점을 하나만 사용하여 코드를 개선했습니다. Order 의 Money 의 메소드를 호출하는 것이 아니라, Order 에게 직접 질문을 던지는 방식으로 개선되었습니다. 이로써 Order 는 자신이 가지고 있는 객체를 적절히 활용하여 더 능동적으로 행위를 수행하게 되었습니다.

### 디미터 법칙을 적용하지 않는 경우

여기서 `스트림(stream)` 처럼 메소드 체이닝(chaining) 하는 경우는 점을 여러번 사용해도 이미 디미터 법칙을 위반하지 않습니다. 또 `DTO` 의 경우 내부 구조를 외부에 유출하는 것을 목적으로 설계되기 떄문에 디미터 법칙을 특별히 적용하지 않습니다.

---

## 원칙5. 줄여쓰지 않는다.

메소드, 클래스등에 대한 이름을 과도하게 줄인다면 되려 코드의 가독성을 저해합니다. 무조건 짧다고 좋은것이 아니죠.

축약하고 싶은 욕구가 생기는 이유는 이름이 길기 때문입니다. 이름이 긴 이유는 해당 클래스, 메소드가 혼자 너무 많은 일을 수행하기 때문입니다. 만약 그게 클래스라면 `SRP(단일 책임 원칙)` 을 위반하고 있을 가능성이 큽니다.

1~2단어 정도로 구성된 경우엔 축약하는 것이 권장되며, 문맥이 중복되는 경우 과감히 이름을 축약합시다. 예를들어 Order 클래스의 orderInfo 라는 메소드가 있다면, info 로 이름을 개선할 수 있을겁니다.

---

## 마치며

지금껏 9가지의 원칙중에 5가지에 대해 살펴봤습니다. 다음번엔 나머지 4가지 원칙에 대하여 학습해보고자 합니다.

---

## 더 학습해볼 키워드

- 널 객체 패턴(Null Object Pattern)

---

## 참고

- https://hudi.blog/thoughtworks-anthology-object-calisthenics/
- https://jamie95.tistory.com/99
- https://blogshine.tistory.com/241
