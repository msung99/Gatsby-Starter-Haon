---
title: DTO 개념
description: DTO(Data Transfer Object) 는 계층 간 데이터를 전송을 위해 도메인 모델 대신에 사용하는 객체입니다. Tecoble 기술블로그 에 따르면, DTO 는 순수하게 데이터를 저장하고, 데이터에 대한 getter 와 setter 만을 가져야한다고 합니다. 그 어떠한 비즈니스 로직을 가져서도 안되면, 오로지 저장, 검색등의 로직만...
date: "2024-01-05"
tags:
  - Dao
  - Legacy
  - JDBC
  - Tag Example
---

## DTO

![](https://velog.velcdn.com/images/msung99/post/91e3f0c6-60e1-4e9a-b9bd-c2574176c0fc/image.png)

`DTO(Data Transfer Object)` 는 **계층 간 데이터를 전송을 위해 도메인 모델 대신에 사용하는 객체**입니다. [Tecoble 기술블로그](https://tecoble.techcourse.co.kr/post/2020-08-31-dto-vs-entity/) 에 따르면, DTO 는 순수하게 데이터를 저장하고, 데이터에 대한 getter 와 setter 만을 가져야한다고 합니다. 그 어떠한 비즈니스 로직을 가져서도 안되면, 오로지 저장, 검색등의 로직만을 보유할 수 있다고합니다.

```java
public class MoveDto {
    private final List<String> upResult;
    private final List<String> downResult;

    private MovedResultDto(List<String> upResult, List<String> downResult) {
        this.upResult = upResult;
        this.downResult = downResult;
    }

    public static MoveDto from(Map<Path, List<MoveResult>> results){
        return new MoveDto(
                mapToSignal(results.get(Path.UP)), mapToSignal(results.get(Path.DOWN))
        );
    }

    public static List<String> mapToSignal(List<MoveResult> moveResults){
        return moveResults.stream()
                .map(moveResult -> moveResult.getSignal())
                .collect(Collectors.toList());
    }

    public List<String> getUpResult() {
        return upResult;
    }

    public List<String> getDownResult() {
        return downResult;
    }
}
```

위처럼 보듯이 DTO 는 아무런 로직을 포함하고 있지 않으며, `final` 로 불변의 특성을 지니고 있고, `getter` 만을 포함하고 있습니다. 지금보니 `setter` 는 별도로 보유하고 있지않은데, 필요에 따라선 setter 를 추가하는것은 자유롭게 해도 됩니다. 다만 위 경우는 setter 를 활용해야하는 상황과 이유가 발생하지 않았기 떄문에 별도의 코드가 존재하지 않는것입니다.

---

## 왜 DTO 를 사용하는가?

### 1. 도메인 모델을 캡슐화하여 보호할 수 있다.

DTO 는 어쩌면 도메인 모델을 보호하는 것이 주 목적이라고 볼 수 있겠습니다. **활용용도는 순수히 계층간에 값을 전송하는데에만 초점이 맞춰져있습니다.** DTO 가 아닌 도메인 모델을 계층간의 데이터 송수신에 직접 활용한다면, 도메인과 뷰 계층간의 강한 결합 및 의존성이 발생하게 됩니다. 추후 요구사항으로 인한 뷰 계층에 전송해야하는 세부 데이터가 변경된다면, 매번 도메인 코드를 변경해야하는 상황이 발생할 수 있습니다 **즉, DTO 를 활용하면 도메인 모델을 계층간의 전송에 직접 활용하지 않으므로 보호할 수 있게됩니다.**

### 2. 도메인 설계를 외부에 직접 유출시키지 않는다.

또, **도메인 모델 대신 DTO 를 활용함으로써 보안 문제를 한층 해결할 수 있게됩니다.** 만약 DTO 이 아니라 도메인 모델을 계층간 전달에 사용하면, UI 계층에서 도메인 모델의 메소드를 호출하거나 상태를 변경시킬 수 있습니다. 불필요하게 도메인 속성을 모두 외부에 유출시키면 보안 문제가 발생할 수 있게됩니다. 곧 도메인 모델을 캡슐화하여 보호할 수 있게 됩니다.

### 3. 검증(Validation) 코드를 도메인 코드와 분리 가능하다.

도메인 코드는 비즈니스 로직과 정책, 그리고 각 테이블간의 매핑관계와 같은 유즈케이스 핵심 코드가 흐르고 있는 코드입니다. 만약 도메인 모델에서 Empty 인지, Null 한지등의 모든 검증코드를 포함한다면 불필요하게 가독성이 떨어지고 클래스가 더욱이 복잡해집니다.

따라서 각 요청에대한 Validation 을 DTO 에서 정의한다면, 도메인 및 엔티티 클래스를 핵심 비즈니스 로직 및 정책에만 집중할 수 있게됩니다.

---

## DTO 를 어떤 계층에서 변환하는 것이 좋은가?

> A Service Layer defines an application’s boundary [Cockburn PloP] and its set of available operations from the perspective of interfacing client layers. It encapsulates the application’s business logic, controlling transactions and coor-dinating responses in the implementation of its operations.

- 마틴 파울러 - [Service Layer](https://martinfowler.com/eaaCatalog/serviceLayer.html)

많은 의견들을 찾아보니, DTO 가 영속성 계층까지 도달하는 것은 지양하는 것으로 보입니다. 마틴파울러는 Service 계층이란 도메인을 보호하는 계층이라고 말합니다. 따라서 이 사항을 준수하려면 프레젠테이션(Presentation) 계층까지 도메인 유출되선 안되며, **도메인 서비스 계층에서 도메인 모델이 DTO 로 변환되어 컨트롤러로 전달되는것이 맞는 것 같습니다.** 반대로 컨트롤러에서 서비스 계층으로 전달될때도 요청 모델이 DTO 로 변환되는 것이 좋다고봅니다.

### 계층간 DTO 전송의 일반적인 구조

![](https://velog.velcdn.com/images/msung99/post/b31845e6-1f3c-4b6c-855e-bd5de310b94b/image.png)

일반적인 상황에선, 대부분 위처럼 컨트롤러는 DTO 형태의 데이터로 요청을 서비스 계층에 넘기고, 서비스는 DTO 를 엔티티(도메인 모델) 로 변환하는 구조를 지닙니다. 만약 View 계층으로 부터 전달받은 데이터가 DTO 타입이 아니라면, DTO 로 변환후 서비스 계층에 전달해야합니다.

![](https://velog.velcdn.com/images/msung99/post/7983661b-a6f9-46d3-8c9f-acc28b3006b7/image.png)

반면 서비스 요청/응답시 서비스 계층의 메소드가 사용하는 서비스 DTO 를 별도로 만들고, DTO 와 서비스 DTO 를 매핑하는 `Mapper(매퍼)` 를 중간에 끼워넣는 방식도 있다고합니다. Mapper 를 사용하면 컨트롤러와 서비스 계층이 완전히 분리됨으로써 결함도가 낮아지는 효과를 볼 수 있다고 합니다. 아직은 실제로 경험해보지 않았기떄문에 공감대가 없어서, 추후 매퍼를 직접 배치해보는 학습이 필요한 것 같습니다.

---

## 검증(Validation) 은 도대체 누가 수행하는거야!?

DTO 를 공부하면서 가장 혼동스러웠던 점은, 검증(Validation) 을 정확히 어디서 수행하는 것이 좋은지에 대한 것이였습니다. 많은 분들의 견해를 찾아보니 검증은 DTO 또는 컨트롤러에서 검증코드를 따로 구성하는 것에 대한 의견이 분분했습니다. 사실 앞서 제가 언급했기를 검증을 항상 DTO 에서 구성해야한다는 식으로 말했지만, 이에 대한 정답은 없는 것 같습니다.

다만 제 견해를 정리해보자면, **검증(Validation) 처리는 DTO 가 아닌 컨트롤러단에서 별도의 Validation 메소드를 추출하고 검증처리를 수행**하는 것이 더 좋을것이라는 판단이 듭니다. DTO 의 정의에 대해 다시 돌아가보면, DTO 는 마치 택배 상자와 같습니다. 값을 순수히 전달하는 목적이기 때문이죠. 그런데 이런 택배상자가 본인이 스스로 "내가 불량 상품을 포함하고 있는데?" 라는 검증을 수행하는것은 역할에 부적합하지 않나라는 생각이 듭니다.

따라서 컨트롤러 내에서도 충분히 검증이 처리 가능한경우 검증 처리 메소드를 따로 추출하여 검증 후 DTO 를 생성하는 것이 올바르지 않나라는 생각입니다. 다만 컨트롤러 내에서 처리하는게 부적합한 특별한 상황인 경우에만 DTO 내에서 처리하는게 좋다라는 견해입니다.

무엇보다 가장 중요한 것은, 검증 처리가 도메인 계층에서 수행되는 상황을 방지하는것입니다. 이를 준수한다면 도메인이 추후 요구사항이 있더라도 큰 변화가 없는 좋은 클린코드라고 생각합니다.

---

## 더 학습해볼 키워드

- VO 와 DTO

---

## 참고

- https://tecoble.techcourse.co.kr/post/2020-08-31-dto-vs-entity/
- https://tecoble.techcourse.co.kr/post/2021-04-25-dto-layer-scope/
- https://www.baeldung.com/java-dto-pattern
- https://creampuffy.tistory.com/188
- https://sedangdang.tistory.com/296
