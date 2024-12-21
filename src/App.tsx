import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import "./App.css";
import ShinCodeContext from "./main";

import useLocalStorage from "./useLocalStorage";
function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount((prevState) => prevState + 1);
  const handleMinusClick = () => setCount((prevState) => prevState - 1);

  // 発火のタイミングを決める
  // 1. 初回レンダリング時
  // 2. 依存配列の値が変化した時
  // 3. コンポーネントがアンマウントされた時
  // 4. コンポーネントが再レンダリングされた時

  // 第二引数に発火したいタイミングを記述する(副作用)
  // [] で囲むと初回レンダリング時に発火
  useEffect(() => {
    console.log("Hello Hooks");
    // return () => {
    // };
  }, [count]);

  // useContext
  // グローバルにデータを管理することができる仕組み
  // propsでは子階層にしか渡せない
  const shincodeInfo = useContext(ShinCodeContext);

  // useRef refarence
  // DOM操作を行うことができる
  const ref = useRef();
  const handleRef = () => {
    console.log(ref.current.value);
  };

  // useReducer
  const reducer = (state: number, action: string) => {
    switch (action.type) {
      case "increment":
        return state + 1;
      case "decrement":
        return state - 1;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, 0);

  // useMemo
  // ブラウザのキャッシュに値を保存する
  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);

  // const square = () => {
  //   let i = 0;
  //   while (i < 1000000) {
  //     i++;
  //   }
  //   return count02 * count02;
  // };
  const square = useMemo(() => {
    let i = 0;
    while (i < 1000000) {
      i++;
    }
    return count02 * count02;
  }, [count02]);

  // useCallback
  // 関数のメモ化
  const [counter, setCounter] = useState(0);

  // const showCount = () => {
  //   alert("これは重い処理です");
  // };
  const showCount = useCallback(() => {
    alert("これは重い処理です");
  }, [counter]);

  // カスタムフック
  const [age, setAge] = useLocalStorage("age", 29);

  return (
    <>
      <h2>UseState,UseEffect</h2>
      <button onClick={handleClick}>+</button>
      <button onClick={handleMinusClick}>-</button>
      <p>{count}</p>
      <hr />
      <h2>useContext</h2>
      <p>{shincodeInfo.name}</p>
      <p>{shincodeInfo.age}</p>
      <hr />
      <h2>useRef</h2>
      <input type="text" ref={ref} />
      <button onClick={handleRef}>UseRef</button>
      <hr />
      <h2>useReducer</h2>
      <p>{state}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <hr />
      <h2>useMemo</h2>
      <p>カウント1:{count01}</p>
      <p>カウント1:{count02}</p>
      <p>結果:{square}</p>
      <button onClick={() => setCount01((preveState) => preveState + 1)}>
        +
      </button>
      <button onClick={() => setCount02((preveState) => preveState + 1)}>
        +
      </button>
      <hr />
      <h2>useCallback</h2>
      {/* <SomeChild showCount={showCount} /> */}
      <hr />
      <h2>useCallback</h2>
      <p>{age}</p>
      <button onClick={() => setAge(80)}>年齢をセット</button>
    </>
  );
}

export default App;
