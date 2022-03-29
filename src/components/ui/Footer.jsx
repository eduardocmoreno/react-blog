import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.root}>
      <a href="https://github.com/eduardocmoreno" target="_blank" rel='noreferrer'><FontAwesomeIcon icon={faGithub} /> /eduardocmoreno</a>
    </footer>
  )
}