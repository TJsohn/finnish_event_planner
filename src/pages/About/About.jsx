import React from "react";
import styles from "./About.module.css";
import BackToTopBtn from "../../components/BackToTopBtn/BackToTopBtn";

function About() {
  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.contentContainer}>
          <h2 className={styles.abouth1}>About Freydis</h2>
          <h2 className={styles.abouth2}>
            Welcome to Freydis – Where Every Summer can create a Legendary
            Story!
          </h2>
          <p className={styles.content}>
            At Freydis, you just not plan your summer event you can create some
            memorable story. Our platform, which was inspired by the renowned
            Viking woman Freydís Eiríksdóttir, is a symbol of bravery,
            self-reliance, and the unwavering quest for life-changing events.
            Our goal is to enable everyone to take center stage this summer,
            whether as makers, guests, or storytellers, much like the Norse
            warrior queen who bravely fought her way across new waters. The
            Spirit of Freydis Freydis's name comes from Old Norse and meaning
            "goddess" or "noble woman of the gods." Freydís Eiríksdóttir, the
            daughter of famed explorer Erik the Red, was well known for her
            great bravery and unyielding tenacity. We own this energy! The
            Freydis is a movement it is more than just a platform. Honoring
            people who have the courage to create, connect, and experience
            something greater. Like the Norse explorers who left their mark on
            history, you can leave your mark on summertime with a memorable
            event.
          </p>
          <h2 className={styles.abouth2}>What Is Freydis?</h2>
          <p className={styles.content}>
            Freydis is an open dynamic platform for managing summer events:
          </p>
          <h2 className={styles.abouth2}>Host Events:</h2>
          <p className={styles.content}>
            We make it easy to plan, personalize, and publicize any event,
            whether it's a home concert or a massive beach festival. In only a
            few minutes, set the mood, distribute the information, and begin
            ticket sales.
          </p>

          <h2 className={styles.abouth2}>Discover and Join:</h2>
          <p className={styles.content}>
            Searching for something novel, thrilling, or remarkable? Explore and
            sign up for regional or international summer events. Sort by date,
            location, or type, then dive right into something that makes you
            happy.
          </p>

          <h2 className={styles.abouth2}>Our Mission:</h2>
          <p className={styles.content}>
            To inspire experiences of fearlessness.
          </p>
          <p className={styles.content}>
            At Freydis, we think that events are the starting point for tales,
            not merely a place to have fun. Creating a platform where creators
            feel empowered, communities come to life, and memories are made in
            freedom and fire, akin to ancient legends, is our objective
          </p>
          <h2 className={styles.abouth2}>Our team </h2>

          <div className={styles.contactCardContainer}>
            <div className={styles.contactCard}>
              <img
                className={styles.profilePic}
                src="/aboupic/developerpic/Anton.png"
                alt="Anton"
              />
              <p className={styles.content}>Riabokon Anton</p>
            </div>

            <div className={styles.contactCard}>
              <img
                className={styles.profilePic}
                src="/aboupic/developerpic/TJ.jpg"
                alt="TJ"
              />
              <p className={styles.content}>Sohn Taejeong</p>
            </div>

            <div className={styles.contactCard}>
              <img
                className={styles.profilePic}
                src="/aboupic/developerpic/mai.png"
                alt="Mai"
              />
              <p className={styles.content}>Tran Mai</p>
            </div>

            <div className={styles.contactCard}>
              <img
                className={styles.profilePic}
                src="/aboupic/developerpic/jamil.png"
                alt="Anton"
              />
              <p className={styles.content}>Muhammd Jamil</p>
            </div>
          </div>
        </div>
      </main>

      <BackToTopBtn showAfter={200} />
    </>
  );
}

export default About;
