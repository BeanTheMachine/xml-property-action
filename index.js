const fs = require('fs');
const xmldom = require('xmldom');
const xpath = require('xpath');
const core = require('@actions/core');
const github = require('@actions/github');

const filePath = core.getInput('file');
const xpathQuery  = core.getInput('xpath');
console.log(`Got inputs:\nfile - '${filePath}\nxpath - '${xpath}'`);

const fileContents = fs.readFileSync(filePath, 'utf8');
console.log(`Got file contents:\n${fileContents}`);

const doc = new xmldom.DOMParser().parseFromString(fileContents);
const nodes = xpath.select(xpathQuery, doc);
if (nodes.length > 0) {
    let outputProperty = nodes[0].textContent;
    console.log(`Got property: ${outputProperty}`);
    core.setOutput('property', outputProperty);
} else {
    core.setFailed(`Failed to find property`);
}