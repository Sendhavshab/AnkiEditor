import React from "react";

const ShareButton: React.FC = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Awesome Website",
          text: "Check out this awesome website!",
          url: window.location.href,
        });
      } catch (error) {
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  return (
    <button onClick={handleShare} style={buttonStyle}>
      Share this page
    </button>
  );
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#4CAF50",
  border: "none",
  color: "white",
  padding: "10px 20px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  margin: "4px 2px",
  cursor: "pointer",
  borderRadius: "5px",
};

export default ShareButton;
