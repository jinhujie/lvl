const path = require('path');
const profileWoker = require('../index');

// profileWoker.createVueProject(path.resolve('./vue-profile'));

let tree1 = [
  { 
    name: 'div',
    style: {color: 'red', 'background-image': 'url(0.jpg)'},
    // backgroundImage: '0.jpg',
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

// tree1 = [];
profileWoker.updateStaticFile(path.resolve(__dirname, './assets'));
profileWoker.updateVueProjectContent(tree1);
// profileWoker.runDevServer();