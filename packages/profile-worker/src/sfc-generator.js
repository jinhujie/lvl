const defaultScript = `<script>export default {}</script>`;

function generateSFC (roots) {
  const invalidParam = !Array.isArray(roots);
  if (invalidParam) {
    throw TypeError(`generateSFC expect 'Array' as param, but got ${typeof roots}`)
  }
  let sfc = '';

  multiMarkClassName(roots);
  sfc += `<template>${extractTemplates(roots)}</template>`;
  sfc += defaultScript;
  sfc += `<style>${extractRootsStyle(roots)}</style>`;

  return sfc;
}

let indexedClass = -1;

const multiMarkClassName = (roots) => {
  if (roots) {
    roots.forEach(root => markClassName(root));
  }
}

function markClassName (root) {
  if (root) {
    const newIndexedClass = generateIndexedClass();
    root.indexedClass = newIndexedClass;
    if (root.children) {
      root.children.forEach(child => markClassName(child));
    }
  }
}
function generateIndexedClass () {
  return `gcsfc_${++indexedClass}`
}

const NODE_TYPE_ELEMENT = 0;
const NODE_TYPE_TEXT = 1;
const NODE_TYPE_COMPONENT = 2;

const extractTemplates = (roots) => {
  if (roots) {
    return roots.map(root => extractTemplate(root)).join('');
  } else {
    return '';
  }
}

function extractTemplate(root) {
  if (root) {
    switch (root.nodeType) {
      case (NODE_TYPE_ELEMENT):
      case (NODE_TYPE_COMPONENT):
        return extractTemplateElement(root);
      case (NODE_TYPE_TEXT):
        return extractTemplateText(root);
      default:
        throw TypeError('unknow node type');
    }
  }
  return '';
}

function extractTemplateElement(root) {
  const { children, name } = root;
  let [ startTag, endTag ] = generateHtmlTag(name);

  if (root.name === 'img') {
    return startTag;
  }
  startTag = startTag.replace('>', ` class='${root.indexedClass}'>`)
  return `${startTag}${extractTemplates(children)}${endTag}`;
}

function extractTemplateText(root) {
  return root.text;
}

function generateHtmlTag (tag) {
  return [`<${tag}>`, `</${tag}>`]
}

const extractRootsStyle = (roots) => {
  if (roots) {
    return roots.map(root =>  extractStyle(root)).filter(css => !!css).join('');
  } else {
    return '';
  }
}

function extractStyle (root) {
  if (root) {
    return stringifyStyle(root) + extractRootsStyle(root.children);
  }
  return '';
}
function stringifyStyle (node) {
  const invalidStyle = 
    typeof node.style !== 'object' 
    && node.style !== undefined;
  if (invalidStyle) {
    throw TypeError(`
      stringifyStyle except 'object | null | undefined',
      but got ${typeof node.style}
    `);
  }
  const emptyStyle = !node.style;
  if (emptyStyle) {
    return '';
  }

  const className = node.indexedClass;
  const styles = Object.keys(node.style).map((styleKey) => {
    const cssName = styleKey;
    let cssValue = node.style[cssName];
    if (cssName === 'background-image') {
      const absoluteImage = /http(s?):\/\//.test(cssValue);
      if (absoluteImage) {
        // do nothing if absoluteImage
      } else {
        const imgageNameMatch = cssValue.match(/\(([^\)]*)\)/);
        if (imgageNameMatch) {
          cssValue = `url('./assets/${imgageNameMatch[1]}')`;
        }
      }
    }
    return [cssName, cssValue];
  });
  const stringifiedStyles = styles.map(
    ([styleKey, styleValue]) => `${styleKey}: ${styleValue};`
  ).join("");
  return `.${className}{
    ${stringifiedStyles}
  }`
}

module.exports = {
  generateSFC,
  extractTemplates,
};