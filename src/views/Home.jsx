import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <div className={`container ${styles.root}`}>
      <h1 className='page-title'>Wello world!</h1>
      <h3>Welcome to my Full-stack MERN Application!</h3>
      <h4>Context:</h4>
      <ul className={styles.list}>
        {homeCtx.map(({ path, label }) => {
          return <li key={path}><Link to={path} className="hyperlink">{label}</Link></li>
        })}
      </ul>
      
      <h4>Techs Front-end:</h4>
      <ul className={styles.list}>
        <li>Javascript</li>
        <li>React</li>
        <li>React Router v6</li>
        <li>Redux Tool Kit</li>
        <li>SASS</li>
        <li>CSS Modules</li>
      </ul>

      <h4>Techs Back-end:</h4>
      <ul className={styles.list}>
        <li>NodeJs</li>
        <li>ExpressJs</li>
        <li>MongoDb + Mongoose</li>
        <li>JWT</li>
        <li>Bcrypt</li>
      </ul>
    </div>
  )
}

const homeCtx = [
  {
    path: '/counter',
    label: 'Simple Counter usind useState hook',
  },
  {
    path: '/todo',
    label: 'Todo List app using Redux Tool-Kit'
  },
  {
    path: '/blog',
    label: 'Consuming a given Rest API with dynamic routing'
  }
]