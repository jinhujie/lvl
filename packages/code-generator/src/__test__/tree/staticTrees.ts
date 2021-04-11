export const basicTree =  [{
  name: 'div',
  children: null,
}] ;

const node = [
  { 
    type: 'div',
    name: 'div',
    style: {color: 'red'},
    children: [
      { name: 'img' },
      { name: 'ul' , children: null},
      { name: 'div', children: [
        { name: 'div', children: null },
        { name: 'div', children: [ 
          {name: 'p', children: null }
        ]}
      ]},
      { name: 'span' },
      { name: 'p' },
    ],
  }
]