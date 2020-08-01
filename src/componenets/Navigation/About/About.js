import React from "react";
import styles from "./About.module.css";
import Footer from "../../Footer/Footer";
import react from "../../../assets/tech/react.png";
import html from "../../../assets/tech/html.png";
import css from "../../../assets/tech/css.png";
import fire from "../../../assets/tech/fire.png";
import boot from "../../../assets/tech/boot.png";
import git from "../../../assets/tech/git.png";
import github from "../../../assets/tech/github.png";
import api from "../../../assets/tech/api.png";

const About = () => {
  return (
    <React.Fragment>
      {/* <button onClick={test}>Click</button> */}
      <div className={styles.Main}>
        <h1>Wall Street Bull</h1>
        <div className={styles.About}>
          <h3>Buy shares today and sell them later when the price goes up.</h3>
          <h4>
            Wall Street Bull is a Stock Trading Platform where you can trade
            shares from the world's most famous companies. You can start trading
            now with your virtual $5000.
          </h4>

          <hr />
          <h4>
            This is a Single Page Application built with ReactJS, Functional
            Components, React Hooks, React Router, REST API, Firebase,
            Bootstrap, Git, GitHub, HTML5, CSS3, Flexbox, etc...
          </h4>
          <div className={styles.Tech}>
            <div>
              <img src={react} alt="react" />
            </div>
            <div>
              <img src={html} alt="html" />
            </div>
            <div>
              <img src={boot} alt="boot" />
            </div>
            <div>
              <img src={fire} alt="fire" />
            </div>
            <div>
              <img src={css} alt="css" />
            </div>
            <div>
              <img src={git} alt="git" />
            </div>
            <div>
              <img src={github} alt="github" />
            </div>
            <div>
              <img src={api} alt="api" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default About;
