import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm the St Mary's Clinic Assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const faqData = [
    { keywords: ['hours', 'open', 'time', 'close'], response: "St Mary's Clinic is open Mon-Fri, 08:00 - 18:00." },
    { keywords: ['book', 'appointment', 'schedule', 'doctor'], response: "You can book an appointment by logging into your dashboard and selecting 'Book Appointment'." },
    { keywords: ['delivery', 'medication', 'meds', 'home'], response: "We offer home delivery for chronic medications for elderly and disabled patients. Request this via your patient portal." },
    { keywords: ['location', 'address', 'where', 'pinetown'], response: "We are located at 1 Hospital Road, Marianhill, Pinetown 3605." },
    { keywords: ['emergency', 'urgent', 'help'], response: "For emergencies, please call our 24/7 hotline: (555) 911-0000 immediately." },
    { keywords: ['hi', 'hello', 'hey'], response: "Hello! How can I assist you with your healthcare needs today?" }
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.toLowerCase();
    setMessages([...messages, { text: input, isBot: false }]);
    setInput('');

    // Find matching response
    setTimeout(() => {
      let botResponse = "I'm sorry, I don't quite understand. Could you rephrase that? You can ask about our hours, bookings, delivery, or location.";
      
      for (const faq of faqData) {
        if (faq.keywords.some(k => userMessage.includes(k))) {
          botResponse = faq.response;
          break;
        }
      }

      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Chat Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition-transform"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-primary p-4 text-white flex items-center gap-3">
            <span className="text-2xl">🏥</span>
            <div>
              <p className="font-bold text-sm">Clinic Assistant</p>
              <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 h-96 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.isBot 
                    ? 'bg-white text-slate-700 shadow-sm border border-slate-100' 
                    : 'bg-primary text-white shadow-md'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t flex gap-2">
            <input 
              type="text" 
              className="flex-1 p-2 bg-slate-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Ask me something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="bg-primary text-white p-2 rounded-lg text-sm font-bold">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
