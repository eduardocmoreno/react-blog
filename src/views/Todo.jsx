import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove, done } from '../features/todoSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './Todo.module.scss';

export default function Todo() {
  const todoList = useSelector(state => state.todo.list);
  const dispatch = useDispatch();

  const [input, setInput] = useState('');

  function addTodo(e) {
    e.preventDefault();

    dispatch(add({
      id: new Date().getTime().toString(36),
      name: input,
      isDone: false
    }));

    setInput('');
  }

  return (
    <div className='container'>
      <h2 className='page-title'>My Daily To-do list</h2>

      <div className={styles.panel}>
        <form className='form' onSubmit={addTodo}>
          <div className={`form-field ${!!input ? 'filled' : ''}`} data-form-field>
            <label htmlFor="name">To-do name</label>
            <input className="form-input" id="name" type="text" name="name" value={input} required onChange={e => setInput(e.target.value)} />
          </div>
          <button className='btn btn-primary'>add todo</button>
        </form>

      </div>

      <div className={styles.list}>
        {!!todoList.length
          ? todoList.map(t => {
            return (
              <div key={t.id} className={styles.item}>
                <span className={`${styles.name} ${t.isDone ? styles.active : ''}`}>{t.name}</span>
                <div className={styles.controls}>
                  {!t.isDone &&
                    <button className='btn btn-secondary' onClick={() => dispatch(done({ id: t.id }))}><FontAwesomeIcon icon={faCheck} /> done</button>
                  }
                  <button className='btn btn-error' onClick={() => dispatch(remove({ id: t.id }))}><FontAwesomeIcon icon={faX} /> remove</button>
                </div>
              </div>
            )
          })
          : <div className={styles.item}><i>My list is empty. Let`s add some to-do?</i></div>
        }
      </div>
    </div>
  )
}