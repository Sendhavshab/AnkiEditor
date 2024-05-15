import { showAlertType } from "./HOC&Context/AlertProvider";

const Share = (
  shareTo: "me" | "other",
  setShowAlert: React.Dispatch<React.SetStateAction<showAlertType>>
) => {
  let link = window.location.href;

  if (shareTo === "other") {
    if (link.charAt(link.length - 1) === "/") {
      link = link + generateRandomString(7);
    } else {
      link = link + "/" + generateRandomString(7);
    }
  }
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
};

export function generateRandomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default Share;