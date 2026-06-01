import { motion } from 'framer-motion';
import Spinner from '../Spinner/Spinner';
import styles from './PageLoader.module.scss';

export default function PageLoader() {
  return (
    <motion.div
      className={styles.loader}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      aria-live="polite"
      aria-label="Loading page"
    >
      <Spinner size="lg" color="primary" label="Loading page…" />
    </motion.div>
  );
}
