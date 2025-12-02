import styles from './HomeHero.module.scss';

interface HeroStat {
  value: string;
  label: string;
}

interface HomeHeroProps {
  onPrimaryCtaClick?: () => void;
}

const heroStats: HeroStat[] = [
  { value: '450+', label: 'Verified garages' },
  { value: '4.9/5', label: 'Average customer rating' },
  { value: '~12 min', label: 'Average response time' },
];

export const HomeHero = ({ onPrimaryCtaClick }: HomeHeroProps) => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Find a trusted mechanic <span>in just minutes</span>
        </h1>
        <p className={styles.heroDescription}>
          Search, compare, and book repair services with top specialists in your
          area. Transparent pricing, live availability, and verified reviews.
        </p>
        <div className={styles.heroActions}>
          <button
            type="button"
            className={styles.primaryCta}
            onClick={() => onPrimaryCtaClick?.()}
          >
            Book a visit
          </button>
          <button type="button" className={styles.secondaryCta}>
            Browse specialists
          </button>
        </div>
        <div className={styles.heroStats}>
          {heroStats.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.heroHighlight}>
        <div className={styles.highlightBadge}>Featured today</div>
        <div className={styles.highlightContent}>
          <h3>24/7 mobile mechanic</h3>
          <p>
            Fast on-site support within a 15 km radius, computer diagnostics,
            and emergency assistance.
          </p>
          <ul>
            <li>active on-call team</li>
            <li>ETA ~18 minutes</li>
            <li>average rating 4.95</li>
          </ul>
          <div className={styles.highlightFooter}>
            <div>
              <span className={styles.highlightPrice}>from 120 PLN</span>
              <span className={styles.highlightCaption}>per service</span>
            </div>
            <button type="button">Check availability</button>
          </div>
        </div>
      </div>
    </section>
  );
};
