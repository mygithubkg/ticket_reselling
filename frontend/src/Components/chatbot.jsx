import ChatBot from 'react-chatbotify';
import React, {use, useState, useEffect} from 'react';

function Mychatbot(props){
    const [details , setdetails] = useState({});
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
    const username = props.username;
    const id = props.id;
    
    const fetchdetails = async () => {
        try{
            const respone = await fetch(`${API_BASE_URL}/chat/userinfo` ,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username }),
                credentials: 'include',
            });
            const result = await respone.json();
            console.log(result);

            if(result.success){
                setdetails(result.userinfo);
            }
            else{
                console.log(result.message);
            }
        }
        catch(err){
            console.log(err);
        }
    };

    useEffect(() => {
        fetchdetails();
    },[]);


    const saveNegotiation = async (amount, ticket_id, ticket_owner, message) => {

      try{

        const response = await fetch(`${API_BASE_URL}/chat/savenegotiation`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({amount, ticket_id, ticket_owner, message}),
          credentials: 'include'
        })
        const result = await response.json();
        if (!result.success){
          console.log(result.message);
        }

      }catch(err){
        console.log(err);
      }
    }

    const negotiation = {amount : '', message: ''};
    

    // ChatBot flow 
    const flow = {
        start: {
          message: "Hi ! How can I help you today?",
          options: ["Get Seller information", "Proceed to Payment Gateway", "Negotiate the amount", "Specific query, write to us.."],
          chatDisabled: true,   
          path: async (params)=>{
            if (params.userInput === "Get Seller information") {
              fetchdetails();
              return "seller_information";
            } else if (params.userInput === "Proceed to Payment Gateway") {
              return "payment_gateway";
            } else if (params.userInput === "Negotiate the amount") {
              return "negotiate_amount";
            } else if (params.userInput === "Specific query, write to us..") {  
              return "specific_query";
            }
          }
        },


        // If user asked for Seller Information 
        seller_information: {
          message: `Seller Information: \nName: ${details.full_name} \nGender: ${details.gender} \nAbout: ${details.bio}`,
          options: ["Proceed to Payment Gateway", "Negotiate the amount", "Specific query, write to us.."],
          chatDisabled: true,   
          path: async (params)=>{
            if (params.userInput === "Proceed to Payment Gateway") {
              return "payment_gateway";
            } else if (params.userInput === "Negotiate the amount") {
              return "negotiate_amount";
            } else if (params.userInput === "Specific query, write to us..") {  
              return "specific_query";
            }
          }
        },

        // If user asked to proceed for Payment Gateway

        payment_gateway: {
          message: "Redirecting to payment gateway...",
        },  

        // If user wants to negotiate the amount

        negotiate_amount: {
          message: "Enter the amount you would like to pay",
          path: async (params) => {
            const amount = Number(params.userInput);
            if (isNaN(Number(params.userInput))) {
                await params.injectMessage("Negotiated amount should be a number");
                return;
            }
            negotiation.amount = amount;
            return "ask_query_related_to_amount";
            }
        }, 
        
        // Query for user related to negotiated amount

        ask_query_related_to_amount: {
            message:"Any message to the seller?",
            options: ["Yes", "No"],
            chatDisabled: true,
            path: async (params) => {
              if (params.userInput === "Yes") {
                return "query_related_to_amount";
              } else if (params.userInput === "No") {
                return "save_negotiation";
              }
            }
        },

        query_related_to_amount: {
            message: "Enter Your message to the seller",
            path: async (params) =>{
              negotiation.message = params.userInput;
              return "save_negotiation";
            }
        },


        // Finally saving the query

        save_negotiation: {
          message: async (params) => {
            const amount = negotiation.amount;
            const ticket_owner = username;
            const ticket_id = id;
            const message = negotiation.message || '';

            await saveNegotiation(amount, ticket_id,ticket_owner, message);

            return 'We have shared the amount with the user. Please wait for the response.You will be notified once the user responds. '
          },
          chatDisabled:true
        },


        // If User have some specific query 

        specific_query: {
            message: "Enter Your Query",
            path: async (params) => {
                await fetch(`${API_BASE_URL}/chat/notification`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sender_username: username,
                        message_text: params.userInput
                    }),
                    credentials: 'include',
                });

                return "end_query";
            }
        },

        end_query: {
          message: (params) => `We have received your query. Please wait for the response.You will be notified once the user responds.`,
          chatDisabled: true
          }
        }
    
      const settings = {
        general: {
          embedded: true
        },
        chatHistory: {
          storageKey: "conversations_summary"
        }
      }
    
      return (
          <ChatBot settings={settings} flow={flow} />
        
      );
}

export default Mychatbot;