# react-reviews

Practice React and Git/GitHub alone

create-react-app

1. 배열렌더링하기

- map, sort, filter
데이터전체 state 만들기. 데이터 전체를 저장.
정렬기준 state 만들기. 정렬기준을 저장.
데이터 전체 state를 정렬하는 함수에 정렬기준을 줘서 정렬기준이 변경될때마다 새로 정렬하게 만들기
정렬된데이터를 prop으로 넘겨주기
onDelete로 filter하는 함수를 prop 내려주기
받은 onDelete prop을 실행하는 handleClick 이벤트핸들러 만들기.
App.js에서 데이터가져오기/정렬/데이터삭제
2. 데이터 가져오기

- fetch, useEffect, useState
  async, await으로 데이터 가져와야함
  useState로 객체를 만들어서 데이터를 보관해야함
  컴포넌트 파라미터 ({ 파라미터 })
  useEffect를 통해서 처음 렌더링 후 한번 렌더링 한다음 멈춰야함(디스펜시 리스트가 같으니까)

3. 입력폼 다루기

- onSubmit, input file, useRef

4. 데이터 보내기

- PUT, DELETE, 리액트 HOOK, useCallback

5. 전역 데이터 다루기

- Context
