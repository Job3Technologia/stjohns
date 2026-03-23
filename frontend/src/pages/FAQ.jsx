import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What are the clinic's operating hours?",
      answer: "St Mary's Clinic is open Monday to Friday from 08:00 to 18:00. We also have a 24/7 emergency hotline for critical cases at (555) 911-0000."
    },
    {
      question: "How do I book an appointment?",
      answer: "You can book an appointment through our online portal by logging in and navigating to the 'Bookings' section. Alternatively, you can call us directly."
    },
    {
      question: "Does the clinic offer medication delivery?",
      answer: "Yes! We offer home delivery of chronic medications specifically for our elderly and disabled patients within the Marianhill and Pinetown areas."
    },
    {
      question: "How can I access my medical records?",
      answer: "Once you log in as a patient, you can view your visit history, diagnoses, and prescriptions in the 'Medical Records' section of your dashboard."
    },
    {
      question: "What medical aids do you accept?",
      answer: "We accept most major South African medical aids. You can check your coverage status in your patient profile or speak to our reception staff."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">FAQ & Feedback</h1>
        
        <div className="bg-white p-10 rounded-2xl shadow-md space-y-12 mb-12">
          {/* FAQ Section */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-8 border-b pb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button 
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-6 font-bold text-slate-900 bg-slate-50 flex justify-between items-center group"
                  >
                    <span className="group-hover:text-primary transition-colors">{faq.question}</span>
                    <span className="text-2xl text-slate-400 group-hover:text-primary transition-all">
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="p-6 text-slate-600 bg-white leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Feedback Form */}
          <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Patient Satisfaction Survey</h2>
            <p className="text-blue-700 text-sm mb-8 leading-relaxed">
              Your feedback is crucial to improving our services at St Mary's Clinic. Please let us know how we can serve you better.
            </p>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">How would you rate your experience? (1-5)</label>
                <div className="flex gap-4 text-3xl">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button type="button" key={star} className="hover:scale-125 transition-transform">⭐</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">Your Comments</label>
                <textarea className="w-full p-4 border rounded-xl h-32 focus:ring-primary focus:border-primary" placeholder="Tell us about your visit..."></textarea>
              </div>
              <button type="submit" className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all">
                Submit Feedback
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
