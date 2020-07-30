import React from "react";
import styles from "./Footer.module.css";
import linkedIn from "../../assets/linked.png";
import gitHub from "../../assets/git.png";
import mail from "../../assets/mail.png";
import code from "../../assets/code.png";

const Footer = () => {
  return (
    <React.Fragment>
      <div className={styles.Main}>
        <div className={styles.Items}>
          <h5>Contact Me</h5>
          <a
            href="https://www.linkedin.com/in/ivo-krastev-555659194/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedIn} alt="Logo" />
          </a>
        </div>
        <div className={styles.Items}>
          <h5>GitHub</h5>
          <a
            href="https://github.com/BrascoBG"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={gitHub} alt="Logo" />
          </a>
        </div>
        <div className={styles.Items}>
          <h5>Check Code Here</h5>
          <a
            href="https://github.com/BrascoBG"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={code} alt="Logo" />
          </a>
        </div>
        <div className={styles.Items}>
          <h5>Email Me</h5>
          <a href="mailto: ivo.krustev@yahoo.com">
            <img src={mail} alt="Logo" />
          </a>
        </div>
      </div>
      <p className={styles.Info}>
        &copy; This project is build and designed by Ivo Krastev
      </p>
    </React.Fragment>
  );
};

export default Footer;
