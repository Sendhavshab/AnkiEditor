import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const AppDownloadBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const bannerDismissed = localStorage.getItem("appDownloadBannerDismissed");
    // Disable banner if on preview or shared practice route
    const pathname = window.location.pathname;
    // Check for preview routes
    if (
      /^\/web\/[^/]+$/.test(pathname) || // matches /web/:codeid
      /^\/[^/]+\/[^/]+$/.test(pathname) || // matches /:username/:foldername
      // practice with share: /code/a/:practiceId/:didshare? (didshare is optional, but has value in "shared" case)
      /^\/code\/a\/[^/]+\/[^/]+$/.test(pathname)
    ) {
      return;
    }

    if (!bannerDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("appDownloadBannerDismissed", "true");
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3 flex-1 justify-center">
        <p className="text-sm md:text-base font-semibold">
          For better experience, download CodeKings app
        </p>
        <a
          href="https://play.google.com/store/apps/details?id=app.codekings.editor"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-blue-600 px-4 py-1.5 rounded-md font-bold hover:bg-gray-100 transition-colors text-sm md:text-base"
        >
          Download Now
        </a>
      </div>
      <button
        onClick={handleDismiss}
        className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors ml-2"
        aria-label="Close banner"
      >
        <IoClose className="text-2xl" />
      </button>
    </div>
  );
};

export default AppDownloadBanner;
