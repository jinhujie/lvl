import generateSFC from '../vue-code-generator';
import { basicTree } from './tree/staticTrees';

test('base static tree', () => {
  expect(generateSFC(basicTree)).toStrictEqual(['<div>','</div>']);
})