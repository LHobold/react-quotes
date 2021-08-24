import styles from './MainNavigation.module.css';
import { NavLink, Link } from 'react-router-dom';

const MainNavigation = () => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link className={styles.link} to="/">
					Great Quotes
				</Link>
			</div>
			<nav className={styles.nav}>
				<ul>
					<li>
						<NavLink activeClassName={styles.active} to="/quotes">
							All Quotes
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName={styles.active} to="/new-quote">
							New Quote
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};
export default MainNavigation;
