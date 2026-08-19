import React, { useState } from "react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventType: "Private Party",
    services: [],
    message: "",
  });

  const availableServices = [
    "Live DJ Set",
    "Sound Setup",
    "Lighting & FX",
    "Stage Production",
    "3D Projection",
    "MC / Hosting",
  ];

  const handleServiceToggle = (service) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you! Your booking request has been sent.");
  };

  return (
    <div className="bg-[#141010] text-[#FAF6F6] min-h-screen font-sans selection:bg-[#F70776] selection:text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ========================================================= */}
        {/* MAIN CONTACT FORM & INFO SECTION                          */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Intro & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2B2323] bg-[#1C1717] text-xs font-semibold uppercase tracking-wider text-[#A69B9B]">
              <span className="w-2 h-2 rounded-full bg-[#F70776] animate-pulse" />
              Contact Us
            </div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#FAF6F6] leading-none">
              Let’s Get In <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F70776] via-[#C3195D] to-[#F70776]">
                Touch.
              </span>
            </h1>

            <p className="text-[#BDB2B2] text-sm sm:text-base font-light leading-relaxed max-w-md">
              Ready to elevate your event with tour-grade audio, dynamic
              lighting, and live DJ performances? Reach out to us directly or
              fill out the booking form.
            </p>

            <div className="pt-4 border-t border-[#2B2323] space-y-4">
              <p className="text-xs uppercase tracking-wider text-[#A69B9B] font-semibold">
                Or reach out manually to
              </p>
              <a
                href="mailto:booking@djservices.com"
                className="text-lg sm:text-xl font-bold text-[#F70776] hover:text-[#C3195D] transition-colors inline-block"
              >
                booking@djservices.com
              </a>
              <div className="text-sm text-[#BDB2B2] space-y-1">
                <p>Hotline: +1 (800) 555-BEAT</p>
                <p>Hours: Mon - Sun (10 AM - 11 PM IST)</p>
              </div>
            </div>
          </div>

          {/* Right Column: Full height Form Container (Unrestricted scroll) */}
          <div className="lg:col-span-7 bg-[#1C1717] border border-[#2B2323] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-visible h-auto">
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#F70776]/10 rounded-full blur-3xl pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#A69B9B]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name..."
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full bg-[#141010] border border-[#2B2323] focus:border-[#F70776] rounded-xl px-4 py-3 text-sm text-[#FAF6F6] outline-none transition-colors placeholder-[#A69B9B]/40"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#A69B9B]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-[#141010] border border-[#2B2323] focus:border-[#F70776] rounded-xl px-4 py-3 text-sm text-[#FAF6F6] outline-none transition-colors placeholder-[#A69B9B]/40"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Event Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#A69B9B]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number..."
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-[#141010] border border-[#2B2323] focus:border-[#F70776] rounded-xl px-4 py-3 text-sm text-[#FAF6F6] outline-none transition-colors placeholder-[#A69B9B]/40"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#A69B9B]">
                    Event Type
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) =>
                      setFormData({ ...formData, eventType: e.target.value })
                    }
                    className="w-full bg-[#141010] border border-[#2B2323] focus:border-[#F70776] rounded-xl px-4 py-3 text-sm text-[#FAF6F6] outline-none transition-colors"
                  >
                    <option value="Private Party">
                      Private Party / Birthday
                    </option>
                    <option value="Club Venue">Club & Lounge Venue</option>
                    <option value="Wedding">Wedding Celebration</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Festival">Festival / Concert</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Checkbox Services Grid */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#A69B9B]">
                  Choose Required Services
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {availableServices.map((service) => {
                    const isChecked = formData.services.includes(service);
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => handleServiceToggle(service)}
                        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                          isChecked
                            ? "bg-[#C3195D]/20 border-[#F70776] text-[#FAF6F6]"
                            : "bg-[#141010] border-[#2B2323] text-[#A69B9B] hover:border-[#C3195D]/60"
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${
                            isChecked
                              ? "bg-[#F70776] border-[#F70776] text-white"
                              : "border-[#2B2323]"
                          }`}
                        >
                          {isChecked && "✓"}
                        </span>
                        <span>{service}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Message Box */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#A69B9B]">
                    Message / Event Details
                  </label>
                  <span className="text-[10px] text-[#A69B9B]">
                    {formData.message.length}/500
                  </span>
                </div>
                <textarea
                  rows={4}
                  maxLength={500}
                  placeholder="Tell us about your date, venue location, estimated guests, or special requirements..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-[#141010] border border-[#2B2323] focus:border-[#F70776] rounded-xl p-4 text-sm text-[#FAF6F6] outline-none transition-colors resize-none placeholder-[#A69B9B]/40"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#C3195D] via-[#F70776] to-[#C3195D] hover:opacity-95 text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(247,7,118,0.3)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Submit Booking Request</span>
                <span className="transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
