import { StringToCodeWord } from "../functions/StrToCode";
import { showAlertType } from "../HOC&Context/Provider/AlertProvider";
import { generateRandomString } from "../functions/RandomStr";

const Share = (
  shareTo: "me" | "other",
  setShowAlert: React.Dispatch<React.SetStateAction<showAlertType>>,
  realId: string
) => {
  let link = window.location.href;

  if (shareTo === "other") {
    if (link.charAt(link.length - 1) === "/") {
      link = link + generateRandomString(5);
    } else {
      link = link + "/" + generateRandomString(5);
    }

    const codeWordId = StringToCodeWord(realId);

    link = link.replace(realId, codeWordId);

    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: "my assigtnment",
            text: "checkout my assignment and see what is error in this",
            url: link,
          });
        } catch (error) {
          setShowAlert({
            value: 1,
            type: "error",
            message: "Failed to share link",
          });
        }
      } else {
        navigator.clipboard
          .writeText(link)
          .then(() => {
            setShowAlert({
              value: 1,
              type: "success",
              message: "Link Copied successfully to Clipboard",
            });
          })
          .catch(() => {
            setShowAlert({
              value: 1,
              type: "error",
              message: "Failed to copy link to clipboard",
            });
          });
      }
    };

    handleShare();
  } else {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setShowAlert({
          value: 1,
          type: "success",
          message: "Link Copied successfully to Clipboard",
        });
      })
      .catch(() => {
        setShowAlert({
          value: 1,
          type: "error",
          message: "Failed to copy link to clipboard",
        });
      });
  }
};

export default Share;
