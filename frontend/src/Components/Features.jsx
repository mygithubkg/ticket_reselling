import React, { useEffect, useRef } from 'react';
import "../styles/features.css";
import { easeInOut, motion, useScroll, useTransform } from 'framer-motion';
import Lenis from '@studio-freight/lenis'




const features_buyer = [
  {
    img: "/Untitleddesign.png"
    , heading: "Verified Sellers", info: "Rest assured with our secondary ticket reselling platform, where every seller is carefully verified to ensure authenticity and reliability. You can buy tickets with confidence, knowing they come from trusted sources."
  },
  {
    img: "/fee.png",
    heading: "No Hidden Fees",
    info: "List and sell your tickets with complete transparency and no unexpected charges."
  },
  {
    img: "/find.png",
    heading: "Find Tickets for Sold-Out Events",
    info: "Can’t find tickets for your favorite event? Let us know, and we’ll work to connect you with sellers who have what you’re looking for."
  },

];



const features_seller = [
  {
    img: "/auidence.png"
    , heading: "Reach a Wide Audience:",
    info: "Gain access to a large, active community of buyers, ensuring your tickets are seen by the right people and sold faster."
  },
  {
    img: "/easy.png",
    heading: "Easy Listing",
    info: "Listing tickets has never been simpler! Our user-friendly platform allows sellers to post tickets quickly and effortlessly, reaching a wide audience in just a few clicks."
  },
  {
    img: "/chat.png",
    heading: "Chat Directly With Buyers",
    info: "Have questions? Need quick clarifications? Our direct chat feature lets you connect with sellers instantly, ensuring smooth communication and a hassle-free ticket-buying experience."
  },

];

export default function Features() {

  useEffect(() => {
    const lenis = new Lenis()



    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])


  const container = useRef();
  const insidecontainer = useRef();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"]
  });



  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  return (
    <> <div>
      <motion.div
        initial={{ y: 200, scale: 1 }}
        whileInView={{ y: 0, scale: [0.8, 1.1, 1] }}
        transition={{
          y: { duration: 0.1 }, // Y animation finishes first
          scale: { delay: 0.5, duration: 2, ease: "easeInOut" }, // Scale starts after Y finishes
        }}
        viewport={{ once: true, amount: 0.5 }}
        className="statement1"
      >
        Find Tickets You Will&nbsp;<span>Love</span>
      </motion.div>


      <motion.div ref={container} className="box-container">
        {features_buyer.map((feature, index) => (

          <motion.div style={{ scale, top: `calc(10% + ${index * 25}px)` }} className='box1'>
            <div className="feature_image" ><img src={feature.img} alt="Placeholder" /></div>
            <div className='written_part'>
              <h1>{feature.heading}</h1>
              <p>{feature.info}</p
              ></div>

          </motion.div>

        ))}



      </motion.div></div>

      <div>

        <motion.div initial={{ y: 200, scale: 1 }}
        whileInView={{ y: 0, scale: [0.8, 1.1, 1] }}
        transition={{
          y: { duration: 0.1 }, // Y animation finishes first
          scale: { delay: 0.5, duration: 2, ease: "easeInOut" }, // Scale starts after Y finishes
        }}
        viewport={{ once: true, amount: 0.3 }}
        className="statement2">
          Turn Extra Tickets into&nbsp;<span>Cash</span>
        </motion.div>

        <motion.div
          style={{ opacity: scrollYProgress }}
          className="box-container"
        >
          {features_seller.map((feature, index) => (

            <motion.div style={{ scale, top: `calc(10% + ${index * 25}px)` }} className='box2'>
              <div className="feature_image" ><img src={feature.img} alt="Placeholder" /></div>
              <div className='written_part'>
                <h1>{feature.heading}</h1>
                <p>{feature.info}</p
                ></div>
            </motion.div>

          ))}


        </motion.div></div>
    </>
  );
}
