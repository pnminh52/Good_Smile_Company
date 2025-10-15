import React, { useState, useEffect } from "react";

const CookiePopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookieAccepted");
    if (accepted) return;

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieAccepted", "true");
    setVisible(false);
    window.removeEventListener("scroll", handleScrollRef.current);
    window.location.reload()
  };

  const handleDecline = () => {
    localStorage.setItem("cookieAccepted", "declined");
    setVisible(false);
    window.removeEventListener("scroll", handleScrollRef.current);
    window.location.reload()
  };

  // Dùng ref để giữ reference của handleScroll
  const handleScrollRef = React.useRef(null);
  useEffect(() => {
    handleScrollRef.current = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
  }, []);

  return (
    <div>
      <div
        className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 z-[9999] transition-transform duration-500 ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="px-4 lg:px-0 max-w-screen-xl w-full flex justify-center mx-auto">
          <div className="text-center py-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <div className="flex-1 text-left">
              <h3 className="text-xl font-semibold">We value your privacy</h3>
              <p className="text-sm text-gray-600">
                We use cookies to enhance your browsing experience, serve personalized ads or
                content, and analyze our traffic. By clicking "Accept All", you consent to our use
                of cookies.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={handleAccept}
                className="w-full sm:w-auto bg-[#FF6900] text-white rounded-full py-2 px-6 hover:bg-[#e45f00] transition"
              >
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="w-full sm:w-auto border border-[#FF6900] text-[#FF6900] rounded-full py-2 px-6 hover:bg-[#fff3eb] transition"
              >
                Reject All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePopup;
