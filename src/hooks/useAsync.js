import { useCallback, useState } from "react";

function useAsync(asyncFunction) {
  //받은 함수의 peding, error state 생성
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = useCallback(
    async (...args) => {
      setPending(true); //요청이 시작되면 Pending true, error null
      setError(null);
      try {
        return await asyncFunction(...args); //받은 함수 실행
      } catch (error) {
        setError(error); //error나면 error state error
      } finally {
        setPending(false); //요청 끝나면 pending false
      }
    },
    [asyncFunction]
  );

  return [pending, error, wrappedFunction]; //peding 상태, error상태, 함수실행해서 상태반환하는 함수 리턴
}

export default useAsync;
