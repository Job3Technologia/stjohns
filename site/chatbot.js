// St Mary's Clinic - Chatbot Logic
(function() {
    const chatbotHTML = `
    <div id="clinic-chatbot" class="fixed bottom-6 right-6 z-[1000] font-sans">
        <button id="chatbot-toggle" class="bg-primary text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition-transform duration-300">💬</button>
        <div id="chatbot-window" class="hidden absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div class="bg-primary p-6 text-white flex items-center gap-4">
                <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🏥</div>
                <div>
                    <p class="font-black uppercase tracking-widest text-xs">Clinic Assistant</p>
                    <p class="text-[10px] font-bold opacity-80 uppercase tracking-tighter">Online & Ready to Help</p>
                </div>
                <button id="chatbot-close" class="ml-auto hover:rotate-90 transition-transform">✕</button>
            </div>
            <div id="chatbot-messages" class="flex-1 h-80 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                <div class="flex justify-start">
                    <div class="max-w-[80%] p-4 bg-white text-slate-700 rounded-2xl rounded-tl-none text-xs font-bold shadow-sm border border-slate-100 leading-relaxed italic">
                        Hello! I'm the St Mary's Assistant. You can ask about our hours, location, or how to book an appointment.
                    </div>
                </div>
            </div>
            <form id="chatbot-form" class="p-4 bg-white border-t flex gap-2">
                <input type="text" id="chatbot-input" class="flex-1 p-3 bg-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all italic" placeholder="Type your question...">
                <button type="submit" class="bg-primary text-white p-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary-dark transition-all">Send</button>
            </form>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    const toggle = document.getElementById('chatbot-toggle');
    const window = document.getElementById('chatbot-window');
    const close = document.getElementById('chatbot-close');
    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');

    const faq = [
        { keywords: ['hours', 'time', 'open', 'close'], response: "St Mary's Clinic is open Monday to Friday, 08:00 to 18:00. Emergency services are available 24/7." },
        { keywords: ['book', 'appointment', 'schedule'], response: "To book an appointment, please sign in to your patient dashboard and select 'Book Appointment'." },
        { keywords: ['location', 'address', 'where'], response: "We are located at 1 Hospital Road, Marianhill, Pinetown 3605, South Africa." },
        { keywords: ['delivery', 'medication', 'meds'], response: "We offer home delivery for chronic medications. You can request this through the 'Medication Delivery' page in your dashboard." }
    ];

    toggle.onclick = () => window.classList.toggle('hidden');
    close.onclick = () => window.classList.add('hidden');

    form.onsubmit = (e) => {
        e.preventDefault();
        const text = input.value.trim().toLowerCase();
        if (!text) return;

        // User message
        messages.innerHTML += `
            <div class="flex justify-end">
                <div class="max-w-[80%] p-4 bg-primary text-white rounded-2xl rounded-tr-none text-xs font-bold shadow-md leading-relaxed">
                    ${input.value}
                </div>
            </div>
        `;
        input.value = '';
        messages.scrollTop = messages.scrollHeight;

        // Bot response
        setTimeout(() => {
            let reply = "I'm sorry, I don't understand that. Could you ask about our hours, location, or bookings?";
            for (let item of faq) {
                if (item.keywords.some(k => text.includes(k))) {
                    reply = item.response;
                    break;
                }
            }
            messages.innerHTML += `
                <div class="flex justify-start">
                    <div class="max-w-[80%] p-4 bg-white text-slate-700 rounded-2xl rounded-tl-none text-xs font-bold shadow-sm border border-slate-100 leading-relaxed italic animate-in fade-in slide-in-from-left-2">
                        ${reply}
                    </div>
                </div>
            `;
            messages.scrollTop = messages.scrollHeight;
        }, 600);
    };
})();
