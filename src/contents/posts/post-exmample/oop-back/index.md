---
title: 소트웍스 엔솔로지의 객체치향 생활체조 원칙 후반부
date: "2024-03-03"
tags:
  - OOP
  - 객체지향
  - Clean Code
series: Object Oriented Programming
previewImage: oop.png
---

> 현 포스트는 예시용으로, 이전에 타 블로그 플랫폼에서 작성한 글을 가져왔습니다.

## 원칙6. 모든 엔티티를 작게 유지한다.

**50줄 이상 되는 클래스 또는 10개 파일 이상의 패지키는 없어야한다는 것입니다.** 50줄 이상인 경우 보통 클래스가 1가지 일만 하지 않기때문에, 코드의 가독성이 떨어지게 됩니다. 이는 곧 SRP 원칙을 위반하는 행위기기도 합니다.

---

## 원칙7. 2개를 초과하는 인스턴스 변수를 가진 클래스를 쓰지 않는다.

![](https://velog.velcdn.com/images/msung99/post/81f692aa-5287-42d1-b646-a868a7d6a87f/image.png)

**인스턴수 변수가 많아질수록 클래스의 응집도는 낮아지는 것을 의미합니다.** 여기서 말하는 인스턴스 변수란 기본 원시타입 또는 컬렉션등을 말하는 것으로 보입니다. 즉, 일급 컬렉션이나 Wrappper 객체는 해당되지 않는 것 같습니다.

쉽게말해, 한 클래스엔 최대 2개 이하의 인스턴스 변수만 배치하자는 것으로, 이를 지켰다면 최대한 클래스를 강제로 많이 분리함으로써 높은 응집도를 유지할 수 있게됩니다. 예를들어 Name 의 경우는 FirstName, LastName 으로 가능하다면 최대한 분리하자는 것이죠.

덩치가 큰 객체를 작은 크기의 여러 객체로 분리하면, 자연스래 인스턴스 변수들을 적절한 곳에 배치할 수 있게됩니다.

---

## 원칙8. 일급 컬렉션을 쓴다.

이는 `원칙3. 모든 원시값과 문자열을 감싼다(Wrap)` 와도 매우 유사한 원칙입니다. 컬렉션도 클래스로 레핑(Wrapping) 하지 않으면, 의미없는 객체가 될 수 있습니다.

또한 일급 컬렉션을 사용하면 여기저기 흩여진 비즈니스 로직이 하나의 일급컬렉션 내부에 응집되고, 중복 코드가 줄어들게 됩니다.

---

## 원칙9. Getter, Setter, Property 를 사용하지 않는다.

객체를 더 객체지향으로, 객체답게 활용하려면 **객체가 충분히 혼자서 할 수 있는 작업은 최대한 객체에게 믿고 맡겨야한다는 것입니다.**

예를들어 아래처럼 Person 이 있고, 그 안에 원시타입의 money 가 있다고해봅시다. (더 좋은 설계를 위해선 money 를 원시타입이 아닌 Money 라는 클래스로 감싸줘야겠지만, 편의상 원시타입으로 정의했다.)

```java
public class Person {
  private final int money;
  // ...

  public int getMoney(){
    return money;
  }
}
```

비즈니스 로직상 이 세상엔 0원 이하의 금액을 보유한 사람은 없다고 해봅시다. 그러면 money 값을 추출해내서 체킹하기 위해선 아래처럼 getter 를 사용하여 값을 가져올것입니다.

```java
int money = person.getMoney();
if(money < 0){
  // ...
}
```

하지만 이렇게 작성하면 비즈니스 로직이 코드 전반으로 흩어지게 되고, 중복 코드가 발생할 수 있게됩니다. 위 코드는 아래처럼 충분히 Person 도메인 객체 내부에서 역할을 수행할 수 있습니다.

```java
public class Person {
  // ...
  public boolean isInvaliBalance(){
    return money < 0;
  }
}
////////////////////////////////////////
if(person.isInvalidBalance()){
  // ...
}
```

---

## 마치며

객체지향이란 지금껏 중요하다는 키워드를 인터넷에서 공부할때 많이 보게 되었고, 지금도 항상 어렵다고 느낍니다. 이러한 9가지 원칙을 원활히 지키는데까지 아직 실력향상이 많이 필요한 것 같네요. 이들을 모두 준수하면서 코드를 짜는것이 꽤 어렵겠지만, 지금부터 스스로 실력 향상을 위해 오랜시간이 걸려도 연습을 해보고자 합니다 😎

---

## 더 학습해볼 키워드

- 널 객체 패턴(Null Object Pattern)

---

## 참고

- 클린코드, 로버트 C. 마틴
- https://hudi.blog/thoughtworks-anthology-object-calisthenics/
- https://jamie95.tistory.com/99
