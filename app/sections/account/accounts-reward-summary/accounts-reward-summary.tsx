import { Link } from '@remix-run/react'
//TODO: Uncomment after ProgressBar is merged
//import ProgressBar from '../accounts-progress-bar/accounts-progress-bar'
import styles from './styles.module.css'

const AccountsRewardSummary = () => (
  <div className={styles.wrapper}>
    <div className={styles.textContent}>
      <p className={styles.title}>Chubbies Rewards</p>
      <p className={styles.textBoldLg}>
        You have
        <span className={styles.points}> 100 </span>
        points
      </p>
      <p className={styles.textSemiSm}>100 POINTS until your next Reward.</p>
      {/* TODO: Uncomment after ProgressBar is merged
    <ProgressBar /> */}
    </div>

    <Link to={''} className={styles.link}>
      Ways To Earn Points
    </Link>
  </div>
)

export default AccountsRewardSummary
