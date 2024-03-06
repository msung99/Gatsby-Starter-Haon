---
title: 전략 패턴, 그거 어떻게 쓰는건데 🤷‍♂️
date: "2024-03-09"
tags:
  - OOP
  - 객체지향
  - Clean Code
  - 디자인패턴
  - 전략 패턴
  - 캡슐화
series: Design Pattern Series
previewImage: strategy-pattern.png
---

> **현 포스트**는 예시용으로, 이전에 타 블로그 플랫폼에서 작성한 글을 가져왔습니다.

## 전략패턴

**전략 패턴**이란, 유사한 행위를 수행하는 여러 전략들에 대해 공통의 인터페이스로 정의해두고, 각 구체적인 전략에 대한 클래스를 각각 클래스로 캡슐화하고, 언제든 동적으로 전략 구현체를 바꿀 수 있도록하는 전략입니다. 전략패턴으로 구현된 코드는 직접 행위에 대한 코드를 수정할 필요없이, 전략만 변경하여 유연하게 확장할 수 있습니다.

## 전략패턴 미적용

난수를 생성하는 다양한 전략이 존재한다고 해봅시다. 클라이언트로 부터 어떤 전략으로 난수를 생성할지 전달받고, 그에 알맞는 범위의 난수값을 생성하는 난수 생성기입니다. 이 안의 `generateRandomNumber()` 는 적절한 전략에 따라 `if-else` 분기 처리에 의해 난수를 처리하게 됩니다.

```java
public class NumberGenerator {
    private String strategy;

    NumberGenerator(String strategy) {
        this.strategy = strategy;
    }
    public void generateRandomNumber() {
        if (strategy.equals("big")) {
            System.out.println((int)(Math.random()*100)); // 0~100 사이의 난수
        } else if (strategy.equals("small")) {
            System.out.println((int) ((Math.random() * 10000) % 10));  // 0~10 사이의 난수
        }  else if (strategy.equals("medium")) {
            System.out.println((int) (Math.random()*50)); // 0 ~ 50 사이의 난수
        }
    }
}
```

클라이언트는 여러 전략을 상황에 알맞게 사용하고 싶다면, 아래처럼 생성자에 매번 다른 인자값을 전달하여 인스턴스를 생성하고 난수생성 메소드를 호출해야 합니다.

```java
public class Client {
    public static void main(String[] args){
        NumberGenerator numberGenerator1 = new NumberGenerator("big");
        numberGenerator1.generateRandomNumber();

        NumberGenerator numberGenerator2 = new NumberGenerator("medium");
        numberGenerator2.generateRandomNumber();

        NumberGenerator numberGenerator3 = new NumberGenerator("small");
        numberGenerator3.getClass();
    }
}
```

하지만 이러한 구조는 `OCP(개방 폐쇄 원칙)` 을 위반하게 됩니다. 예를들어 기존 3가지 난수생성 전략 이외에 새로운 전략으로 "micro" 라는 전략을 추가하고, 기존 전략인 "big" 의 전략을 0~100 사이의 값이 아닌 0~1000 의 숫자를 생성하게 만들었다고 해봅시다.

```java
// 기존 코드에 변동이 일어났다!
public void generateRandomNumber() {
        if (strategy.equals("big")) {
            System.out.println((int)(Math.random()*1000)); // 0~1000 사이의 난수
        } else if (strategy.equals("small")) {
            System.out.println((int) ((Math.random() * 10000) % 10));  // 0~10 사이의 난수
        }  else if (strategy.equals("medium")) {
            System.out.println((int) (Math.random())); // 0 ~ 50 사이의 난수
        } else if(strategy.equals("micro")){
           System.out.println((int) (Math.random()*2));
        }
    }
}
```

결국 기존 코드에 영향을 주게되고, 이는 심각한 경우 자칫 서비스 전체에 악영향을 끼칠 수 있습니다. 지금의 예제의 경우는 매우 간단하기 때문에 별 영향이 없을것처럼 보일 수 있어도, 코드가 조금만 복잡해져도 하나가 문제가 터지면 겉잡을 수 없이 그 영향력은 클 수 있습니다.

---

## 전략패턴을 적용해보자!

앞서 말했듯이, 전략패턴은 유사 행위(전략)을 수행하는 단위별로 클래스로 나누어 캡슐화하고, 공통적인 특징은 인터페이스로 그룹화합니다. 앞선 코드의 경우 "난수를 생성하는 행위" 가 공통 관심사가 될 것이며, 어떻게 난수를 생성할지의 세부 행위가 "전략" 이 될 것입니다.

인터페이스는 아래와 같이 정의할 수 있습니다.

```java
public interface NumberGenerateStrategy {
    int generate();
}
```

그리고 각 전략별로 클래스를 세분화하여 구현해볼 수 있을겁니다.

```java
public class BigRangeStrategy implements NumberGenerateStrategy{
    public int generate(){
        return (int)(Math.random()*100); // 0~100 사이의 난수 1개
    }
}

public class SmallRangeStrategy implements NumberGenerateStrategy{
    public int generate(){
        return (int)((Math.random()*10000)%10); // 0~10 사이의 난수 1개
    }
}

public class MediumRangeStrategy implements NumberGenerateStrategy{
    public int generate(){
        return nt) (Math.random()*50)); // 0~50 사이의 난수 1개
    }
}
```

또 기존 난수생성기는 생성자 주입으로 인터페이스 타입의 전략을 수용하게 됩니다. 이 인터페이스를 구현한 3가지 전략 구현 클래스중에 어떤것이 주입되던간에 유연하게 대응할 수 있습니다.

```java
public class NumberGenerator {
    private NumberGenerateStrategy strategy;

    NumberGenerator(NumberGenerateStrategy strategy) {
        this.strategy = strategy;
    }

    public void generateRandomNumber() {
        System.out.println(strategy.generate());
    }
}
```

만약에 위 전략에서, 아까처럼 "Micro" 라는 신규 전략이 추가된다면 기존 코드에 파급력, 즉 악영향이 있을까요? 아닙니다. 신규 전략에 알맞게 캡슐화된 클래스를 새롭게 정의해주고, 난수 생성기 `NumberGenerator` 는 적절히 생성자 주입을 받아 난수를 생성하는 역할을 수행하면 끝입니다. 즉, 기존 코드 NumberGenerator 에는 아무런 변화도 발생하지 않습니다.

```java
public class MicroRangeStrategy implements NumberGenerateStrategy{
    public int generate(){
        return nt) (Math.random()*50)); // 0~50 사이의 난수 1개
    }
}
```

추가적으로 클라이언트는 아래처럼 난수 생성기를 적절히 생성자 주입을 통해 전략 클래스 인스턴스를 주입해주면 될겁니다.

```java
public class Client {
    public static void main(String[] args){
        List<String> strategys = List.of("big", "medium", "small");

        for(String strategy : strategys){
            if(strategy.equals("big")){
                NumberGenerator numberGenerator = new NumberGenerator(new BigRangeStrategy());
                numberGenerator.generateRandomNumber();
            } else if(strategy.equals("medium")) {
                NumberGenerator numberGenerator = new NumberGenerator(new SmallRangeStrategy());
                numberGenerator.generateRandomNumber();
            } else if(strategy.equals("small")){
                NumberGenerator numberGenerator = new NumberGenerator(new SmallRangeStrategy());
                numberGenerator.generateRandomNumber();
            }
        }
    }
}
```

---

## 정리

간혹 코드를 짜다보면 매우 비슷한 형태 또는 플로우를 지닌 여러 기능들이 존재할겁니다. 즉, **매우 비슷한 로직 또는 형태를 지닌 여러 기능 및 케이스가 존재할때 사용하면** 매우 유용한 전략이 될겁니다. 또는 기능이 완전히 동일한데 요구사항 및 세부정책에 따라 자그마한 분기처리만 처리해도 좋을 경우에도 활용하면 좋은 패턴이 될겁니다.

---

## 더 학습해볼 키워드

- 커멘드 패턴
