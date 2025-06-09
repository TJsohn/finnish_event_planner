import React from "react";
import styles from "./About.module.css";

function About() {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <h1>About Freydis</h1>
        <h2>
          Welcome to Freydis – Where Every Summer can create a Legendary Story!
        </h2>
        <p>
          At Freydis, you just not plan your summer event you can create some
          memorable story. Our platform, which was inspired by the renowned
          Viking woman Freydís Eiríksdóttir, is a symbol of bravery,
          self-reliance, and the unwavering quest for life-changing events. Our
          goal is to enable everyone to take center stage this summer, whether
          as makers, guests, or storytellers, much like the Norse warrior queen
          who bravely fought her way across new waters. The Spirit of Freydis
          Freydis's name comes from Old Norse and meaning "goddess" or "noble
          woman of the gods." Freydís Eiríksdóttir, the daughter of famed
          explorer Erik the Red, was well known for her great bravery and
          unyielding tenacity. We own this energy! The Freydis is a movement it
          is more than just a platform. Honoring people who have the courage to
          create, connect, and experience something greater. Like the Norse
          explorers who left their mark on history, you can leave your mark on
          summertime with a memorable event.
        </p>
        <h2>What Is Freydis?</h2>
        <p>Freydis is an open dynamic platform for managing summer events:</p>
        <h2>Host Events:</h2>
        <p>
          We make it easy to plan, personalize, and publicize any event, whether
          it's a home concert or a massive beach festival. In only a few
          minutes, set the mood, distribute the information, and begin ticket
          sales.
        </p>

        <h2>Discover and Join:</h2>
        <p>
          Searching for something novel, thrilling, or remarkable? Explore and
          sign up for regional or international summer events. Sort by date,
          location, or type, then dive right into something that makes you
          happy.
        </p>
        <h2>Buy Tickets Seamlessly:</h2>
        <p>
          Use our safe, easy-to-use system to buy and manage tickets. Get
          immediate confirmations and see your tickets from anywhere at any
          time.
        </p>
        <h2>Our Mission:</h2>
        <p>To inspire experiences of fearlessness.</p>
        <p>
          At Freydis, we think that events are the starting point for tales, not
          merely a place to have fun. Creating a platform where creators feel
          empowered, communities come to life, and memories are made in freedom
          and fire, akin to ancient legends, is our objective
        </p>
        <h2>Our team </h2>

        <div className={styles.contactCardContainer}>

        <div className={styles.contactCard}>
          <p>Riabokon Anton</p>
          <img className={styles.profilePic} src="./public/aboupic/developerpic/Anton.png" alt="Anton" />
          <p>📧:anton@gmail.com</p>
          <p>☎️:040004000</p>
        </div>

        <div className={styles.contactCard}>
          <p>Riabokon Anton</p>
          <img className={styles.profilePic} src="./public/aboupic/developerpic/Taejeong.png" alt="Anton" />
          <p>📧:taejeon@gmail.com</p>
          <p>☎️:0400041110</p>
        </div>

        <div className={styles.contactCard}>
          <p>Riabokon Anton</p>
          <img className={styles.profilePic} src="./public/aboupic/developerpic/Taejeong.png" alt="Anton" />
          <p>📧:taejeon@gmail.com</p>
          <p>☎️:0400041110</p>
        </div>

        <div className={styles.contactCard}>
          <p>Muhammd Jamil</p>
          <img className={styles.profilePic} src="./public/aboupic/developerpic/jamil.png" alt="Anton" />
          <p>📧:jamilnim@gmail.com</p>
          <p>☎️:0400041110</p>
        </div>

        </div>


      </div>
    </main>
  );
}

export default About;
