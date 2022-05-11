const fs = require("fs");
const { Command } = require("commander");

const program = new Command();

program
  .argument("<path>", "source json file path")
  .option(
    "--out-name <file_name>",
    "output file name. sequence will be appended (e.g. <file_name>1.json, <file_name>2.json)",
    "output"
  )
  .option(
    "--count <count>",
    "number of json documents to be stored in the same file",
    1000
  );
program.parse();

const inputPath = program.args[0];
const outputFileName = program.opts().outName;
const count = Number(program.opts().count);

const size = fs.statSync(inputPath).size;

const fd = fs.openSync(inputPath, "r");
const buffer = new Buffer.alloc(1);

let countOpen = 0;
let countClose = 0;
let json = new Buffer.alloc(0);
let fileIndex = 0;
let jsons = [];
for (let pos = 0; pos < size; pos++) {
  fs.readSync(fd, buffer, 0, buffer.length, pos);

  const char = buffer.toString();
  if (char === "{") countOpen += 1;
  else if (char === "}") countClose += 1;
  if (countOpen === 0) continue;

  json = Buffer.concat([json, buffer]);
  if (countOpen === countClose) {
    flushJson();
    if (jsons.length === count) flushJsons();
  }
}
flushJsons();

function flushJson() {
  jsons.push(JSON.parse(json));
  console.log(`${jsons.length}/${count}/${fileIndex}`);
  json = new Buffer.alloc(0);
  countOpen = 0;
  countClose = 0;
}

function flushJsons() {
  const output = outputFileName + fileIndex++ + ".json";
  fs.writeFileSync(output, JSON.stringify(jsons));
  console.log(`${output} written`);
  jsons = [];
}
