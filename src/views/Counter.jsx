import { useState } from "react";
import styles from './Counter.module.scss';

export default function Counter() {
  const [count, setCount] = useState(0);

  function counterHandler(amount) {
    setCount(prev => prev += amount);
  }

  return (
    <div className={styles.root}>
      <div className={styles.counter}>{count}</div>
      <div className={styles.controls}>
        <button className="btn btn-error" onClick={() => counterHandler(-5)}>-5</button>
        <button className="btn btn-error" onClick={() => counterHandler(-1)}>-1</button>
        <button className="btn btn-primary" onClick={() => counterHandler(1)}>+1</button>
        <button className="btn btn-primary" onClick={() => counterHandler(5)}>+5</button>
      </div>
    </div>
  )
}