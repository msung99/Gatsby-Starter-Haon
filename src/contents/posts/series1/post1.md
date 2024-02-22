---
title: 레거시 DAO 를 리팩토링하며 JDBC 라이브러리 구현하기
description: JDBC 라이브러리 구현하기 를 진행해보면서, 학습한 내용을 정리했다.과거 HTTP 웹 서버가 가지고 있었던 문제는 사용자가 입력한 데이터가 서버를 재시작하면 사라진다는 점이다. 따라서 DB 서버를 도입해야 하는것은 당연시 되었다. 자바 진영에서 JDBC 표준 인터페이...
date: "2024-01-01"
tags:
  - Dao
  - Legacy
  - JDBC
  - Tag Example
  - hi
  - connection
  - 블로그 분석
  - 컴퓨터 공학
series: My Series1
---

> [JDBC 라이브러리 구현하기]() 를 진행해보면서, 학습한 내용을 정리했다.

---

## JDBC

과거 HTTP 웹 서버가 가지고 있었던 문제는 사용자가 입력한 데이터가 서버를 재시작하면 사라진다는 점이다. 따라서 DB 서버를 도입해야 하는것은 당연시 되었다. 자바 진영에서 JDBC 표준 인터페이스를 정의하고 있으며, 우리는 이를 활용하여 데이터베이스와의 통신을 할 수 있게된다.

그런데 이떄, JDBC 는 `인터페이스 정의` 만을 제공하고 있다. 즉, JDBC 는 데이터베이스 통신을 위한 규악만 정하고, 이에대한 구현체는 데이터베이스를 만들어 서비스하는 회사가 직접 구현하고 제공하도록 하고있다. 서블릿도 마찬가지다. 서블릿 또한 인터페이스만 정의하고 서블릿 컨테이너를 만들어 제공하는 회사 또는 단체가 이 인터페이스에 대한 구현체를 제공하도록 하고 있다.

정리하면, 이처럼 표준만 정의함으로써 DB 에 대한 연결설정만 변경해 다른 DB 를 지원함으로써 소스코드의 변경을 최소화하고 있다.

### JDBC API

JDBC API 를 통해 데이터베이스에 접근할 때, API 내부 코드에선 정말 많은 중복 코드가 발생한다. 그래서 이 중복 코드를 제거한 라이브러리가 바로 JdbcTemplate 이다. 즉 JdbcTemplate 이란 JDBC API 의 중복 코드를 제거한 SQLMapper 라고 볼 수 있다.

이 라이브러리가 어떻게 등장했는지를 다루어보겠다. 우선 중복 코드가 많은 순수 JDBC API 레거시 코드를 점진적으로 중복 코드를 제거하면서, JdbcTemplate 를 모방한 코드를 직접 구현해보겠다.

---

## 레거시 UserDao

UserDao 의 초기 레거시코드다. DAO 오브젝트를 통해 데이터베이스에 대한 접근 로직 처리를 담당하도록 되어있다.

현재 초기 Dao 는 JDBC API 를 직접 사용하여 DataSource 생성하고, 커넥션을 획득 및 해제하며, 예외처리 작업을 모두 담당하고 있다. 그래서 가독성 및 생산성이 저하된다. 무엇보다 아까 언급했던 중복 코드가 여러 메소드에서 발생하고 있다. 따라서 이를 제거해야 함을 신경쓰면서 라이브러리를 구현해야했다. 구현한 세부 단계들을 천천히 살펴보자.

```java
public class UserDao {
    public void insert(User user) throws SQLException {
        Connection con = null;
        PreparedStatement pstmt = null;
        try {
            con = ConnectionManager.getConnection();
            String sql = "INSERT INTO USERS VALUES (?, ?, ?, ?)";
            pstmt = con.prepareStatement(sql);
            pstmt.setString(1, user.getUserId());
            pstmt.setString(2, user.getPassword());
            pstmt.setString(3, user.getName());
            pstmt.setString(4, user.getEmail());

            pstmt.executeUpdate();
        } finally {
            if (pstmt != null) {
                pstmt.close();
            }

            if (con != null) {
                con.close();
            }
        }
    }

    public void update(User user) throws SQLException {
        Connection con = null;
        PreparedStatement pstmt = null;
        try {
            con = ConnectionManager.getConnection();
            String sql = "UPDATE USERS SET password = ?, name = ?, email = ?, WHERE userId = ?";
            pstmt = con.prepareStatement(sql);
            pstmt.setString(1, user.getUserId());
            pstmt.setString(2, user.getPassword());
            pstmt.setString(3, user.getName());
            pstmt.setString(4, user.getEmail());

            pstmt.executeUpdate();
        } finally {
            if (pstmt != null) {
                pstmt.close();
            }

            if (con != null) {
                con.close();
            }
        }
    }

    public List<User> findAll() throws SQLException {
    	// ...
    }

    public User findByUserId(String userId) throws SQLException {
    	// ...
    }
    // ...
}
```

---

## 1단계. 중복 로직을 처리할 클래스를 분리

### JdbcTemplate

중복 코드를 제거하기 위해 앞서 말한 JdbcTemplate 모방 클래스를 구현했다. 반복적으로 발생하는 중복 로직을 상위 클래스가 구현하고 변화가 발생하는 부분만 추상 메소드로 만들어 구현하도록 하는 `템플릿 메소드 패턴` 을 적용했다. `createQuery()` 는 UserDao 로 부터 동적으로 SQL 쿼리문을 전달받으며, `setValues()` 는 PreparedStatement 를 활용하여 UserDao 에서 동적으로 쿼리문에 전달된 파라미터를 전달받는다.

```java
public abstract class JdbcTemplate {
  public void update() throws Exception {
    Connection con = null;
    PreparedStatement pstmt = null;
    try {
      con = ConnectionManager.getConnection();
      String sql = createQuery();
      pstmt = con.preparedStatement(sql);
      setValues(pstmt);
      pstmt.executeUpdate();
    } finally {
      if(pstmt != null) {
        pstmt.close();
      }

      if(con != null) {
        con.close();
      }
    }
  }

  abstract String createQuery():
  abstract void setValues(PreparedStatement pstmt) throws SQLException;
}
```

### UserDao

실제로 이에 상응하는 UserDao 구현부는 아래와 같이 구현해줬다. 2개의 추상 메소드를 Dao 에서 구현하여 동적으로 쿼리문을 JdbcTemplate 오브젝트에게 전달한다.

```java
public class UserDao {
  public void insert() throws SQLException {
    JdbcTemplate jdbcTemplate = new JdbcTemplate() {
      @Override
      void setValues(PreparedStatement pstmt) throws SQLException {
        pstmt.setString(1, user.getUserId());
        pstmt.setString(2, user.getPassword());
        pstmt.setString(3, user.getName());
        pstmt.setString(4, user.getEmail());
      }

      @Override
      String createQuery() {
        return "INSERT INTO USERS VALUES (?, ?, ?, ?)";
      }
    };
    jdbcTemplate.update();
  }

  // ... (추가 메소드 구현)
}
```

---

## 2단계. SELECT 절을 고려한 리팩토링

### mapRow 구현, createQuery 제거

위 JdbcTemplate 코드만으론 SELECT 쿼리문에 대한 처리가 불가능하다. SELECT 절의 경우 INSERT, UPDATE 를 할때와 달리 **조회한 데이터를 자바 객체로 변환하는 부분이 추가적으로 필요하다.** 그래서 새롭게 추가한 메소드가 `mapRow()` 이다.

또한 기존의 `createQuery()` 는 제거했다. 쿼리문은 생각해보면 굳이 추상 메소드로 구현하지 않고도 UserDao 에서 insert(), update() 등의 메소드를 호출할 때 파라미터로 넘겨줄 수 있기 때문이다.

```java
public void abstract class JdbcTemplate {
  public void update(String sql) throws SQLException {
  	// ...
  }

  abstract Object mapRow(ResltSet rs) throws SQLException;
  abstract void setValues(PreparedStatement pstmt) throws SQLException;
}
```

### query, queryForObject 구현

UserDao 의 `findUserById()`, `findAll()` 메소드가 활용할 `query()`, `queryForObject()` 를 구현했다. 둘 다 조회를 위해 사용될 것이다.

```java
public void abstract class JdbcTemplate {
  public void update(String sql) throws SQLException {
  	// ...
  }

   // 여러건의 데이터 조회
   public List query(String sql) throws SQLException {
     Connection con = null;
     PreparedStatement pstmt = null;
     ResultSet rs = null;

     try {
       con = ConnectionManager.getConnection();
       pstmt = con.prepareStatement(sql);
       setValues(pstmt);

        rs = pstmt.executeQuery();

        List<Object> result = new ArrayList<Object>();
        while(rs.next()) {
          result.add(mapRow(rs)); // SELECT 쿼리를 실행하여 조회된 데이터를 하나씩 리스트에 Add
        }
        return result;
     } finally {
       // ...
     }
   }

   // 한건의 데이터 조회
  public Object queryForObject(String sql) throws SQLException {
    List result = query(sql);
    if(result.isEmpty()) {
      return null;
    }
    return result.get(0);
  }

  abstract Object mapRow(ResltSet rs) throws SQLException;
  abstract void setValues(PreparedStatement pstmt) throws SQLException;
}
```

### UserDao

`mapRow()` 를 구현한 Dao 코드의 findAll() 구현부는 아래와 같다. 데이터베이스로부터 조회한 데이터는 ResultSet 파라미터에 담기고, 이를 자바 Object 타입으로 (정확히는 User 타입으로) 변환한다.

```java
public List<User> findAll() throws SQLExcpetion {
  @SuperWarnings("unchecked")
  JdbcTemplate jdbcTemplate = new JdbcTemplate() {
    @Override
    void setValues(PreparedStatement pstmt) throws SQLException {
    }

    @Override
    Object mapRow(ResultSet rs) throws SQLException {
      return new User(
        rs.getString("userId"),
        rs.getString("password"),
        rs.getString("name"),
        rs.getString("email"));
      )
    }
  };

  String sql = "SELECT userId, password, name, email FROM USERS";
  return (List<User>)jdbcTemplate.query(sql);
}
```

---

## 3단계. RowMapper, PreparedStatementSetter 인터페이스를 활용

### 문제점 : 불필요한 mapRow( ) 구현

하지만 여기서 또 문제가 생긴다. UserDao 는 SELECT 절 외에 INSET, DELETE, UPDATE 문을 실행할 땐 굳이 mapRow() 메소드를 구현할 필요가 없음에도, SELECT 절을 위해서 mapRow() 를 구현하는 불편함을 가지고 있다. 실제로 UserDaot 의 insert() 메소드를 살펴보자면 아래와 같다.

```java
public void insert(User user) throws SQLException {
 JdbcTemplate jdbcTemplate = new JdbcTemplate() {
    @Override
    void setValues(PreparedStatement pstmt) throws SQLException {
      pstmt.setString(1, user.getUserId());
      pstmt.setString(2, user.getPassword());
      pstmt.setString(3, user.getName());
      pstmt.setString(4, user.getEmail());
    }

    @Override
    Object mapRow(Resultset rs) throws SQLExcpetion {
      return null;
    }
  };
  String sql = "INSERT INTO USERS VALUES (?, ?, ?, ?)";
  jdbcTemplate.update(sql);
}
```

이를 해결할 필요가 있다. 이 해결안은 바로 인터페이스에 있다.

### 인터페이스 추가를 통해 해결하기

mapRow() 를 쓸모없이 구현할 수 밖에 없었던 이유는 JdbcTemplate 와 UserDao 간의 의존관계가 생겨버렸기 때문이다. `setValues()` 메소드와 `mapRow()` 메소드를 별도로 분리해 서로 간의 의존관계를 끊어버릴 수만 있다면 더 유연한 개발이 가능해진다. 즉, Dao 의 각 메소드에선 본인에게 필요한 기능만 구현할 수 있게 만들면 된다.

정리하자면, 위 2개의 추상 메소드를 같은 클래스가 가지도록 하지말고, 각 추상 메소드를 인터페이스로 따로 분리시키는 것이다. 아래와 같이 인터페이스를 구현한다.

```java
public interface PreparedStatementSetter {
  void setValues(PreparedStatement pstmt) throws SQLException;
}

public interface RowMapper {
  Object mapRow(ResultSet rs) throws SQLException;
}
```

또 이를 활용한 리팩토링 코드는 아래와 같다. update, query 메소드만을 가져왔는데, 보듯이 인터페이스 오브젝트를 외부로 부터 필요한 것들만을 선택적으로 주입받고 활용한다.

```java
public class JdbcTemplate {

  // PreparedStatementSetter 를 주입
  public void update(String sql, PreparedStatementSetter pss) throws SQLException {
    Connection con = null;
    PreparedStatement pstmt = null;
    try {
      con = ConnectionManager.getConnection();
      pstmt = con.preparedStatement(sql);
      pss.setValues(pstmt);
      pstmt.executeUpdate();
    } finally {
      if(pstmt != null) {
        pstmt.close();
      }
      if(con != null) {
        con.close();
      }
    }
  }

  // PreparedStatementSetter, RowMapper 를 주입
  public List query(String sql, PreparedStatementSetter pss, RowMapper rowMapper) throws SQLException {
    Connection con = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    try {
      con = ConnectionManager.getConnection();
      pstmt = con.prepareStatement(null);
      pss.setValues(pstmt);
      rs = pstmt.executeQuery();

      // ...
    }
  }
}
```

---

## 4단계. 최종 리팩토링

최종적으로 리팩토링한 전체 코드는 아래와 같다. 특별한것은 없고, 컴파일타임 Exception 인 SQLException 대신 RunTimException 을 상속한 커스터마이징 DataAccessException 을 활용헀다. 제네릭 문법을 활용해 User 타입 외에도 모든 타입에 범용성을 맞추도록 개선했으며, 가변인자를 활용하여 쿼리에 파라미터를 전달하도록 했다.

### JdbcTemplate

```java
public class JdbcTemplate {
    public void update(String sql, Object... parameters) throws DataAccessException {
        try (Connection con = ConnectionManager.getConnection();
             PreparedStatement pstmt = con.prepareStatement(sql)) {
                for(int i=0; i< parameters.length; i++) {
                    pstmt.setObject(i+1, parameters[i]);
                }
            /* pss.setValues(pstmt);
            pstmt.executeUpdate(); */
        } catch (SQLException e) {
            throw new DataAccessException(e);
        }
    }

    @SuppressWarnings("rawtypes")
    public <T> List<T> query(String sql, PreparedStatementSetter pss, RowMapper<T> rowMapper) throws DataAccessException {
        ResultSet rs = null;
        try (Connection con = ConnectionManager.getConnection();
             PreparedStatement pstmt = con.prepareStatement(sql)) {

            pss.setValues(pstmt);
            rs = pstmt.executeQuery();

            List<T> result = new ArrayList<T>();
            while(rs.next()) {
                result.add(rowMapper.mapRow(rs, 1)); // SELECT 문으로 조회한 데이터를 자바 객체로 변환
            }
            return result;
        } catch (SQLException e) {
            throw new DataAccessException(e);
        } finally {
            // ...
        }
    }

    @SuppressWarnings("rawtypes")
    public <T> T queryForObject(String sql, PreparedStatementSetter pss, RowMapper<T> rowMapper) throws DataAccessException {
        List<T> result = query(sql, pss, rowMapper);
        if(result.isEmpty()) {
            return null;
        }
        return result.get(0);
    }
}
```

### UserDao

```java
public class UserDao {
    public void insert(User user) throws SQLException {

        JdbcTemplate jdbcTemplate = new JdbcTemplate();

        PreparedStatementSetter pss = new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement pstmt) throws SQLException {
                pstmt.setString(1, user.getUserId());
                pstmt.setString(2, user.getPassword());
                pstmt.setString(3, user.getName());
                pstmt.setString(4, user.getEmail());
            }
        };
        String sql = "INSERT INTO USERS VALUES (?, ?, ?, ?)";
        // jdbcTemplate.update(sql, pss);
        jdbcTemplate.update(sql, user.getPassword(), user.getName(), user.getEmail(), user.getUserId());
    }

    public void update(User user) throws SQLException {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();

        PreparedStatementSetter pss = new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement pstmt) throws SQLException {
                pstmt.setString(1, user.getUserId());
                pstmt.setString(2, user.getPassword());
                pstmt.setString(3, user.getName());
                pstmt.setString(4, user.getEmail());
            }
        };
        String sql = "UPDATE USERS SET password = ?, name = ?, email = ?, WHERE userId = ?";
       //  jdbcTemplate.update(sql, pss);
        jdbcTemplate.update(sql, user.getPassword(), user.getName(), user.getEmail(), user.getUserId());
    }

    public List<User> findAll() throws SQLException {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        PreparedStatementSetter pss = new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement pstmt) throws SQLException {
            }
        };

        RowMapper rowMapper = new RowMapper() {
            @Override
            public Object mapRow(ResultSet rs, int count) throws SQLException {
                return new User(
                        rs.getString("userId"),
                        rs.getString("password"),
                        rs.getString("name"),
                        rs.getString("email"));
            }
        };
        String sql = "SELECT userId, password, name, email FROM USERS";
        return (List<User>) jdbcTemplate.query(sql, pss, rowMapper);
    }

    public User findByUserId(String userId) throws SQLException {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        String sql = "SELECT userId, password, name, email FROM USERS WHERE userId = ?";
        return jdbcTemplate.queryForObject(sql, (ResultSet rs) -> {
            return new User(
                    rs.getString("userId"),
                    rs.getString("password"),
                    rs.getString("name"),
                    rs.getString("email"));
        }, userId);
    }
}
```

---

## 마치며

JDBC 가 아직 다소 낮선 것 같다. ORM 에 최대한 의존하지 않겠다고 했지만, 역시 근본부터 시작해야 이 기술이 왜 등장했고, 왜 써야하는지를 알 수 있는것 같다. 이번 미션에서도 단순 JDBC API 를 넘어 JdbcTemplate 를 모방하여 구현해보며, SQLMapper 가 얼마나 중복 코드, 레거시 코드를 지양하기 위해 노력했는지 알 수 있었다 🙂

---

## 더 학습해볼 키워드

- HikariCP
