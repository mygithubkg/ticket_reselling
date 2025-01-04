import React from 'react'
import "../styles/Features_seller.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion';

const features = [
  {
    imgSrc: "https://media-hosting.imagekit.io//ec426a4f769a4734/icons8-verified-account-64.png?Expires=1735463540&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=NH5UQGOfexFR-dSG3hR5VFPdQn5oKAL~QgU5X8JJR7Q8B34svjDNZ36lGp5brvDbnoMmIRAnk8S~giE~RL7iRkoxvJ5jNMCnpzsArv2JAxmJY~9h9a9jWzlh-fPmzX5WQaFuVkpSy-m4DYhXRpIJzWuh7n71XxUIQ0H6HFwMiDu~SLVsN69DmpasXvjVwFilgCM4KUmO1PB7W7ZWff6eNpunUv6arns~PErmlFs6UHYvH56qas5BXdaG-Mt4SRiRxTtvZtkI5xVVHRWF51vG3Za7MyJTkYMJ5RMsTKv7fg9DvtF4scrWSJvXkCitu~aJCmtJDjRgxmog6vYgo7RQ4Q__",
    title: "Verified Sellers",
  },
  {
    imgSrc: "https://media-hosting.imagekit.io//39871dd71e9f4674/icons8-easy-64.png?Expires=1735464489&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=V58x4YHHghqV5JINPdJAAey4rNUaZU3ySt1gdJSww1NyuSBN34MhOaYIBHOUKTKSqZ-YnpQyJTEEmrV69rJNRYmY5EeWwHnQ9k7qLS-RXssu13Hkgyq00flZ6AOZ~kdbwSZMuDLR6OmwlR4WnSAZLrrhmJ4bf~aCOWt-rysxos-ZCqCRIGbsF6esXlFs9fKZYzw1sOGoQZtQHzXBS3M0OCVsNWTqU4du58SkB7ZLThBDwiDNFzFCrNAWI7zzhDKeV19ujbeQ21hPZGghPKEM3TxhwiygXdc8mfFdwHCofiNJS3errE7wmAX4paP03Y2aZScVpNfzE3jeGzE17nDPEQ__",
    title: "Easy Listing",
  },
  {
    imgSrc: "https://media-hosting.imagekit.io//05ae0025a5544d2c/icons8-chat-64.png?Expires=1735464595&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=HWG7GhpXWeOYEFjVKBcIT5Qff6wQZBJNGXlBdQ5kOXYLRmAwRDOblShw0aIGMPRh7ZkqNNbVTFxYcZ-R015CpC1nHnet440MeM~EOVXaW4llR4HhbfiMyHpagiUZtRR6dC-vAEDSRi3LvoS0k4KBuIirT4CtAcrU5bfw4FNvG8h1TjKKZ8sMky3M35BgGsSjNXrsBEwMTF7vFXTUVZa5twS7zc7G9uhW0kfO3iBYdXQh5rh2Zh2ol9a6NvRPMi6~kRs5gq1OUR4i6vhwQzwxKnuEgpQGmYgxqAgt~XAr4F0SeTW~FJjtn7axe3Dr904BhvYVTiQyq2os~r5LNYViSg__",
    title: "Chat Directly With Buyers",
  },
  {
    imgSrc: "https://media-hosting.imagekit.io//893303f33cd24e35/icons8-no-hidden-fees-64.png?Expires=1735464826&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=EBEVR9ckYvNeK-zY7-R2lMKcr-y84EbtmFed10ByXlkG02GjKVoKK6XGKx23NTpzDS0gNnosednIah1Brjj3a4FS2TtP7J5XZP8~7Oz~DrIhTPVAoQPeres9trr0Du7CBvY7148DZ39k2z3yKROQSA~r~otYryyMtmwjBn-wj66inii-Vc6eGYvWKxYKoeY~Xbpvf20KuFD5elxhywwv1Sj~NtzwaVpopfncAq7S5sO~pFt~6VcuwcL1HyAkIp3tAt~Tu35jbOu1BREQ32vd7VlxFLjPnMKRkrAI8BTKQBFig8tTSs2gDgNWXGCQ0oCc3rOd5TZY1WyJ~oYMIB0A2g__",
    title: "Zero Hidden Fees",
  },
];

export default function Featuresseller() {
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      transition={{duration:3}}
      whileInView={{ opacity: 1 }}
      viewport={{  }}
    >
      {features.map((feature, index) => (
        <div className="box" key={index}>
          <img src={feature.imgSrc} alt={feature.title} width="70" height="70" />
          <p>{feature.title}</p>
        </div>
      ))}
    </motion.div>
  );
}
