// import generateSFC from '../vue-code-generator';
// import * as staticTrees from './tree/staticTrees';
const generateSFC = require('../vue-code-generator');
const cases = require('./tree/staticTrees.js');
console.log(cases)

// cases.forEach((case, treeIndex) => {
//   test(`staticTrees: ${case.desc || 'case' + treeIndex} `, () => {
//     expect(generateSFC(case.node))
//       .toBe(['<div>','</div>'])
//   })
// })