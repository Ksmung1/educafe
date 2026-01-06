import React from "react";

// 🔧 EDIT CONTACT DETAILS HERE ONLY
const CONTACTS = {
  phone1: "+919862285344",
  phone2: "+917005549898",
  whatsapp: "+919862285344",
};

const Footer = () => {
  return (
    <footer className="bg-[#16424a] text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* CONNECT WITH US (IfNFO ONLY) */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect with us</h3>

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2">
              📞 <span>{CONTACTS.phone1}</span>
            </div>

            <div className="flex items-center gap-2">
              📞 <span>{CONTACTS.phone2}</span>
            </div>
          </div>
        </div>

        {/* CTA (ACTIONS ONLY) */}
        <div>
          <div className="flex flex-col gap-3">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${CONTACTS.whatsapp.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-md transition"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-green-800 text-center text-xs text-green-200 py-4">
        Made with ❤️ by Nextjourney
      </div>
    </footer>
  );
};

export default Footer;
