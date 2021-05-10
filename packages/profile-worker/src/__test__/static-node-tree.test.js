const generateSFC = require('../sfc-generator');

const tree0 = [];
test('sfc empty tree collection', () => {
  expect(generateSFC.extractTemplates(tree0))
  .toBe('');
});

const tree1 = [
  { 
    name: 'div',
    style: {color: 'red'},
    nodeType: 0,
    children: [
      { name: 'img', nodeType: 0 },
      { name: 'ul' , children: null, nodeType: 0},
      { name: 'div', nodeType: 0 ,
        children: [
        { name: 'div', children: null, nodeType: 0 },
        { 
          name: 'div', 
          nodeType: 0,
          children: [ 
            {name: 'p', children: [{ text: 'hi', nodeType: 1 }], nodeType: 0 }
          ]}
      ]},
    ],
  }
];
const expectTree1 = '<div><img><ul></ul><div><div></div><div><p>hi</p></div></div></div>'
test('sfc tree1', () => {
  expect(generateSFC.extractTemplates(tree1)).toBe(expectTree1)
})