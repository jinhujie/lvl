const { watch } = require('fs');

watch('./packages/', onTestCaseChange);

function onTestCaseChange(eventType, fileName) {
  console.log(eventType, fileName)
}