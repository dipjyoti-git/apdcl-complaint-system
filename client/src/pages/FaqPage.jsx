import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    q: 'How do I file a complaint?',
    a: 'Create a consumer account from the Register page, sign in, and click "Register Complaint" (or "+ File New Complaint" on the dashboard). Fill in your 12-digit consumer number, the sub-division, category, a subject and a detailed description. You can also attach up to 5 photos of the issue.'
  },
  {
    q: 'What is the 12-digit consumer number?',
    a: 'It is the unique 12-digit ID printed on your APDCL electricity bill (for example 107010048899). Every complaint must be filed against a valid 12-digit consumer number so it can be routed to the correct sub-division.'
  },
  {
    q: 'How do I track my complaint?',
    a: 'Sign in and open the dashboard — all your registered complaints are listed there with their current status, timestamps, category and the agent assigned to your ticket.'
  },
  {
    q: 'What do the statuses Pending, In Progress and Resolved mean?',
    a: 'Pending — your complaint is registered and waiting to be picked up. In Progress — an APDCL agent or admin is actively working on it. Resolved — the issue has been fixed and the ticket is closed.'
  },
  {
    q: 'I forgot my password. What should I do?',
    a: 'Click "Forgot password?" on the sign-in page, enter your registered email, and use the reset link shown to set a new password. The link expires after 15 minutes.'
  },
  {
    q: 'Who handles my complaint after I file it?',
    a: 'An admin assigns your ticket to a field agent of your sub-division. The agent updates the status as the work progresses, and every action is recorded in the activity log for accountability.'
  },
  {
    q: 'Who do I contact for urgent issues like a fallen wire or transformer failure?',
    a: 'For emergencies, call the helpline numbers below immediately instead of waiting on the portal. You can also visit your local Electrical Sub-Division (ESD) office in person.'
  }
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col font-sans">
      {/* Top Portal Header */}
      <header className="bg-[#3F51B5] text-white px-6 py-3 flex justify-between items-center shadow-md border-b-4 border-[#F36F21]">
        <div className="flex items-center gap-3">
          <div className="bg-[#F36F21] text-white text-xs font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
            CMS Portal
          </div>
          <h1 className="text-sm md:text-base font-bold tracking-wide">
            ASSAM POWER DISTRIBUTION COMPANY LIMITED
          </h1>
        </div>
        <Link to="/login" className="bg-[#F36F21] hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded transition">
          Sign In →
        </Link>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto p-6">
        <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide mb-1">
          ❓ FAQ & Helpline
        </h2>
        <p className="text-xs text-gray-500 mb-6">
          Common questions about the APDCL Complaint Management System
        </p>

        {/* Accordion */}
        <div className="space-y-2">
          {FAQS.map((item, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-50 transition"
              >
                <span className="text-sm font-semibold text-gray-800">{item.q}</span>
                <span className="text-[#F36F21] font-bold text-lg leading-none ml-3">
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Helpline Card */}
        <div className="mt-6 bg-[#2C387E] text-white rounded-lg shadow-md overflow-hidden">
          <div className="p-5">
            <h3 className="text-base font-bold uppercase tracking-wider mb-3">
              📞 Helpline
            </h3>
            <div className="flex items-center gap-4 bg-white/10 rounded p-4">
              <div className="text-4xl">☎️</div>
              <div>
                <p className="text-xs text-blue-200 uppercase font-semibold">Toll-Free (National Electricity Helpline)</p>
                <p className="text-3xl font-bold tracking-widest">1912</p>
              </div>
            </div>
            <p className="text-xs text-blue-200 mt-4 leading-relaxed">
              For emergencies such as fallen wires, sparking poles or transformer failures, call 1912 immediately.
              You can also contact your local Electrical Sub-Division (ESD) office during working hours for
              billing, metering and new-connection queries.
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/login" className="text-[#3F51B5] font-bold text-xs hover:underline">
            ← Back to Sign In
          </Link>
        </div>
      </main>

      <footer className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-center">
        <p className="text-[10px] text-gray-400">Developed for APDCL Helpdesk Systems</p>
      </footer>
    </div>
  );
}
