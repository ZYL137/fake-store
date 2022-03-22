import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import styles from "../../sass/layout/Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.footer__content}>
        <div className={styles.footer__column}>
          <h3>Delivery & Return</h3>
          <ul className={styles.footer__links}>
            <li>Check Order</li>
            <li>International Delivery</li>
            <li>Returns & Refunds</li>
          </ul>
        </div>

        <div className={styles.footer__column}>
          <h3>Customer Services</h3>
          <ul className={styles.footer__links}>
            <li>Terms & Policies</li>
            <li>Contact Us</li>
            <li>Stores & Opening Hours</li>
            <li>Size Guides</li>
          </ul>
        </div>

        <div className={styles.footer__column}>
          <h3>About</h3>
          <ul className={styles.footer__links}>
            <li>Our Brand</li>
            <li>Charity</li>
            <li>Corporate Responsibility</li>
            <li>Careers</li>
          </ul>
        </div>

        <div className={styles.footer__icons}>
          <TwitterIcon />
          <FacebookIcon />
          <InstagramIcon />
        </div>
      </section>
    </footer>
  );
}

export default Footer;
