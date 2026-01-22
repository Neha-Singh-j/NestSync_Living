import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pt-10">
        <div className="relative h-[300px] rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36"
            alt="Luxury Interior"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 h-full flex flex-col justify-center px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white max-w-xl">
              Get in Touch with Our Concierge Team
            </h1>
            <p className="text-white/90 mt-4 max-w-xl">
              Experience white-glove service from the first hello. Our experts are
              ready to assist you with your luxury living needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <ContactCard
          icon={<Phone className="text-blue-600" />}
          title="Phone"
          line1="+1 (800) NESTSYNC"
          line2="Mon–Fri: 9am – 6pm EST"
        />
        <ContactCard
          icon={<Mail className="text-blue-600" />}
          title="Email"
          line1="concierge@nestsyncliving.com"
          line2="24/7 Response Support"
        />
        <ContactCard
          icon={<MapPin className="text-blue-600" />}
          title="HQ Office"
          line1="123 Luxury Lane, Suite 500"
          line2="New York, NY 10001"
        />
      </section>

      {/* Form + Map */}
      <section className="max-w-7xl mx-auto px-4 mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-semibold">Send us a Message</h2>
          <p className="text-gray-500 mt-1">
            Expert guidance is just a message away.
          </p>

          <form className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="input"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="input"
              />
            </div>

            <select className="input">
              <option>Buy a Property</option>
              <option>Sell a Property</option>
              <option>Rent a Property</option>
              <option>General Inquiry</option>
            </select>

            <textarea
              rows="4"
              placeholder="Tell us how we can help..."
              className="input"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Send Message →
            </button>
          </form>
        </div>

        {/* Map */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full min-h-[420px] border-0"
          />
        </div>
      </section>

     
    </div>
  );
}

function ContactCard({ icon, title, line1, line2 }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-gray-600 mt-4">{line1}</p>
      <p className="text-gray-400 text-sm">{line2}</p>
    </div>
  );
}

/* Tailwind helper (add globally)
.input {
  @apply w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500;
}
*/
