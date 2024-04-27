// import React, { useEffect } from "react";
// import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

// const MyEditor: React.FC = () => {
//   useEffect(() => {
//     // Load Monaco Editor
//     async function loadMonaco() {
//       // Load the editor's script from CDN
//       await import("monaco-editor");

//       // Define custom theme
//       monaco.editor.defineTheme("custom-theme", {
//         base: "vs",
//         inherit: true,
//         rules: [
//           { token: "keyword", foreground: "blue", fontStyle: "bold" },
//           { token: "function", foreground: "green" },
//           { token: "string", foreground: "red" },
//           // Add more customization rules as needed
//         ],
//         colors: {
//           "editor.background": "#f0f0f0",
//           "editor.foreground": "#000000",
//           // Add more color customizations as needed
//         },
//       });

//       // Apply the custom theme to Monaco Editor
//       monaco.editor.setTheme("custom-theme");
//     }

//     loadMonaco();
//   }, []);

//   return <div id="editor" style={{ width: "800px", height: "600px" }} />;
// };

// export default MyEditor;
