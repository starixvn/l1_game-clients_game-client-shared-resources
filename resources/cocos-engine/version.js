const fs = require("fs");
const path = require("path");
const { argv } = require("process");
const folder = argv.at(2);
const version = argv.at(3) ?? "v1";

if (fs.existsSync(folder)) {
  const files = fs
    .readdirSync(folder, { recursive: true })
    .filter((file) => fs.statSync(path.join(folder, file)).isFile());
  const newFiles = files.map((file) => {
    const dirname = path.dirname(file);
    const filename = path.basename(file);
    const { name, ext } = path.parse(filename);
    const splitted = name.split("-");
    const newName =
      splitted.length <= 2 && !file.startsWith("cc-")
        ? splitted.concat([version]).join("-")
        : splitted.slice(0, -1).concat([version]).join("-");

    if (file === "import-map") {
      return file;
    }

    return path.join(dirname, `${newName}${ext}`);
  });

  for (const [index, file] of Object.entries(files)) {
    let data = fs.readFileSync(path.join(folder, file), "utf-8");

    for (const [index, file] of Object.entries(files)) {
      const from = path.parse(file);
      const replacement = path.parse(newFiles[index]);

      data = data.replaceAll(from.base, replacement.base);
    }

    if (file.startsWith("_virtual_cc")) {
      data = data.replace(
        "return e.import(t)",
        `return e.import(\`\${window.location.origin}\${window.location.pathname}\${t.replace("..", "")}\`)`,
      );
    }

    fs.unlinkSync(path.join(folder, file));
    fs.writeFileSync(path.join(folder, newFiles[index]), data);
  }

  const importMap = (data = JSON.stringify({
    imports: {
      cc: `./cc-${version}.js`,
    },
  }));

  fs.writeFileSync(path.join(folder, "import-map"), importMap);
}
