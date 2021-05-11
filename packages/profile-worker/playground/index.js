const path = require('path');
const profileWoker = require('../index');

// profileWoker.createVueProject(path.resolve('./vue-profile'));

let tree1 = [
  { 
    name: 'div',
    style: {color: 'red', 'background-image': 'url(0.jpg)'},
    nodeType: 0,
    trigger: [
      {
        id: 'TRIGGER_VUE_CREATED',
        props: {
          actions: [{
            id:'T_ACTION_JSONP', 
            props: { 
              url: 'https://yapi-test.tuwan.com/match/stageinfo?id=100' ,
              triggers: [
                { 
                  id: 'TRIGGER_PROMISE_FULFILLED', 
                  props: {
                    actions: [{
                      id: 'T_ACTION_EVALSTRING',
                      props: {
                        evalString: 'console.log(res)'
                      }
                    }]
                  }
                }
              ]
            },
          }]
        }, 
      }
    ],
    children: [
      { name: 'img', nodeType: 0 },
      { name: 'ul' , children: null, nodeType: 0},
      { 
        name: 'div', nodeType: 0 ,
        // trigger: [
        //   { id: 'TRIGGER_VUE_CREATED', props: { actions: [{ id: 'log' }]}}
        // ],
        children: [
          { name: 'div', children: null, nodeType: 0 },
          { 
            name: 'div', 
            nodeType: 0,
            children: [ 
              {name: 'p', children: [{ text: 'hi', nodeType: 1 }], nodeType: 0 }
            ]
          }
        ]
      },
    ],
  }
];

// tree1 = [];
profileWoker.updateStaticFile(path.resolve(__dirname, './assets'));
profileWoker.updateVueProjectContent(tree1);
// profileWoker.runDevServer();