const list = [
    'https://grammarpartyblog.com/wp-content/uploads/2013/01/ok_hand.jpg',
    'https://grammarpartyblog.com/wp-content/uploads/2013/01/ok_hand.jpg',
    'https://grammarpartyblog.com/wp-content/uploads/2013/01/ok_hand.jpg',
    'https://grammarpartyblog.com/wp-content/uploads/2013/01/ok_hand.jpg',
];
  
const faqDat = [
    {
        id: 1,
        question: "How do I add an event to sell tickets?",
        answer: "Simply log in, go to Add Event, fill in the details, and publish your event.",
    },
    {
        id: 2,
        question: "What details are required to add an event?",
        answer: "You'll need the event name, date, time, location, and ticket price.",
    },
    {
        id: 3,
        question: "Is there a fee to list my event?",
        answer: "No, listing an event is free; fees are only charged when tickets are sold.",
    },
    {
        id: 4,
        question: "How long does it take for my event to go live?",
        answer: "Events are live instantly after submission, pending quick verification.",
    },
    {
        id: 5,
        question: "Can I edit my event after publishing it?",
        answer: "Yes, you can edit event details anytime before tickets are sold.",
    },
    {
        id: 6,
        question: "How do I manage ticket inventory for my event?",
        answer: "You can set and adjust the ticket quantity in the Manage Event section.",
    }
    // {
    //     id: 7,
    //     question: "What types of tickets can I sell?",
    //     answer: "You can sell general, VIP, or custom-category tickets for any event.",
    // },
    // {
    //     id: 8,
    //     question: "Can I upload event posters or images?",
    //     answer: "Yes, you can add images to make your event more attractive to buyers.",
    // },
    // {
    //     id: 9,
    //     question: "How do I cancel an event I've listed?",
    //     answer: "Go to Manage Event and select the cancel option to inform ticket buyers.",
    // },
    // {
    //     id: 10,
    //     question: "Will I receive a confirmation after adding an event?",
    //     answer: "Yes, you'll receive a confirmation email once the event is successfully listed.",
    // },
    // {
    //     id: 11,
    //     question: "How can I check the status of my listed event?",
    //     answer: "Use the Dashboard to monitor the status and ticket sales of your event.",
    // },
    // {
    //     id: 12,
    //     question: "Can I share my event on social media?",
    //     answer: "Yes, after adding your event, you'll get a shareable link for social media promotion.",
    // },
    // {
    //     id: 13,
    //     question: "Are there any restrictions on the type of events I can list?",
    //     answer: "Events must comply with our community guidelines and local laws.",
    // },
    // {
    //     id: 14,
    //     question: "How do I set ticket prices for my event?",
    //     answer: "You can set custom ticket prices while adding the event details.",
    // },
    // {
    //     id: 15,
    //     question: "Can I add multiple ticket categories to an event?",
    //     answer: "Yes, you can add different ticket tiers like General, VIP, or Early Bird.",
    // }
];

export default list;

export {faqDat};

const tickets = [
    {
      id: 1,
      photo: "https://m.economictimes.com/thumb/msid-113568262,width-1200,height-900,resizemode-4,imgsize-1839857/coldplay-india-tour-2025.jpg",
      eventType: "Concert",
      eventDateTime: "24th Dec, 2024, 7:00 PM",
      eventLocation: "Mumbai, India",
      ticketType: "VIP",
      eventName: "Sunburn Music Festival",
      eventDescription: "Experience the biggest music festival of the year with international artists and electrifying performances.",
      quantity: 2,
      seatingInfo: "Row A, Seats 12-13",
      transferability: true,
      ticketFormat: "E-Ticket",
      faceValue: 5000,
      sellingPrice: 4500, 
    },
    {
      id: 2,
      photo: "https://www.shutterstock.com/image-photo/blue-hole-white-paper-coming-600nw-660624601.jpg",
      eventType: "Sports",
      eventDateTime: "30th Jan, 2025, 5:30 PM",
      eventLocation: "Chinnaswamy Stadium, Bengaluru, India",
      ticketType: "Premium",
      eventName: "IPL Final Match",
      eventDescription: "Witness the ultimate cricket battle as the top teams clash for the IPL title.",
      quantity: 4,
      seatingInfo: "Stand B, Seats 20-23",
      transferability: false,
      ticketFormat: "Physical Ticket",
      faceValue: 2500,
      sellingPrice: 3000,
    },
    {
      id: 3,
      photo: "https://www.shutterstock.com/image-photo/blue-hole-white-paper-coming-600nw-660624601.jpg",
      eventType: "Theatre",
      eventDateTime: "15th Feb, 2025, 6:00 PM",
      eventLocation: "Prithvi Theatre, Mumbai, India",
      ticketType: "Regular",
      eventName: "Hamlet - A Shakespeare Play",
      eventDescription: "A gripping performance of Shakespeare's classic tragedy brought to life by renowned actors.",
      quantity: 2,
      seatingInfo: "Balcony, Seats 5-6",
      transferability: true,
      ticketFormat: "E-Ticket",
      faceValue: 800,
      sellingPrice: 700,
    },
    {
      id: 4,
      photo: "https://www.shutterstock.com/image-photo/blue-hole-white-paper-coming-600nw-660624601.jpg",
      eventType: "Stand-Up Comedy",
      eventDateTime: "10th March, 2025, 8:00 PM",
      eventLocation: "Auditorium, Delhi University, India",
      ticketType: "VIP",
      eventName: "Comedy Night with Zakir Khan",
      eventDescription: "An evening filled with laughter and relatable humor by India's top comedian Zakir Khan.",
      quantity: 1,
      seatingInfo: "Front Row, Seat 1",
      transferability: true,
      ticketFormat: "E-Ticket",
      faceValue: 2000,
      sellingPrice: 1800,
    },
    {
      id: 5,
      photo: "https://www.shutterstock.com/image-photo/blue-hole-white-paper-coming-600nw-660624601.jpg",
      eventType: "Exhibition",
      eventDateTime: "20th March, 2025, 10:00 AM - 6:00 PM",
      eventLocation: "India Habitat Centre, New Delhi, India",
      ticketType: "Regular",
      eventName: "Art and Culture Fest 2025",
      eventDescription: "Explore an extraordinary display of art, culture, and heritage from across the globe.",
      quantity: 3,
      seatingInfo: "General Admission",
      transferability: false,
      ticketFormat: "QR Code",
      faceValue: 500,
      sellingPrice: 450,
    },
  ];
  
  export  {tickets};
  