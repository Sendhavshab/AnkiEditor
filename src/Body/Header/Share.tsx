import { StringToCodeWord } from "../../StrToCode";
import { showAlertType } from "../../HOC&Context/Provider/AlertProvider";

const Share = (
  shareTo: "me" | "other",
  setShowAlert: React.Dispatch<React.SetStateAction<showAlertType>>,
  assignmentId: string
) => {
  let link = window.location.href;

  if (shareTo === "other") {
    if (link.charAt(link.length - 1) === "/") {
      link = link + generateRandomString(7);
    } else {
      link = link + "/" + generateRandomString(7);
    }

    const codeId = StringToCodeWord(assignmentId);

    link = link.replace(assignmentId, codeId);

     const handleShare = async () => {
       if (navigator.share) {
         try {
           await navigator.share({
             title: "my assigtnment",
             text: "checkout my assignment and see what is error in this",
             url: link,
           });
           console.log("Successful share");
         } catch (error) {
           console.log("Error sharing", error);
         }
       } else {
         alert("Web Share API is not supported in your browser.");
       }
     };

     handleShare();

  } else{
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

export function generateRandomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export default Share;
