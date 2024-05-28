import fs from "fs";
import tailwindcss from "tailwindcss";
import postcss from "postcss";
import tailwindConfig from "./tailwind.config.js";

postcss([tailwindcss(tailwindConfig)])
  .process("@tailwind utilities;", { from: undefined })
  .then((result) => {
    const classNames = result.css.match(/\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*/g);
    fs.writeFileSync(
      "tailwind-classes.json",
      JSON.stringify(classNames, null, 2)
    );
  });
