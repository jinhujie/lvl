function generateSFC (roots) {
  const invalidParam = !Array.isArray(roots);
  if (invalidParam) {
    throw TypeError(`generateSFC expect 'Array' as param, but got ${typeof roots}`)
  }
  const template = [];
  const style = [];
  roots.forEach(root => {
    markClassName(root);
    template.push(extractTemplate(root));
    style.push(extractStyle(root));
  });
  console.log(template, style)
}

let indexedClass = -1;
function generateIndexedClass () {
  return `gcsfc_${++indexedClass}`
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

function extractTemplate(root) {
  let template = [];
  if (root) {
    const { children, name } = root;
    const [ startTag, endTag ] = generateHtmlTag(name);

    template.push(startTag);
    if (children) {
      children.forEach(child => {
        template = template.concat(extractTemplate(child));
      })
    }
    template.push(endTag);
  }
  return template; 
}

function generateHtmlTag (tag) {
  return [`<${tag}>`, `</${tag}>`]
}

function extractStyle (root) {
  let style = [];
  if (root) {
    style.push(stringifyStyle(root));
    if (root.children) {
      root.children.forEach(child => {
        style = style.concat(extractStyle(child)); 
      });
    }
  }
  return style;
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
  const styles = Object.keys(node.style).map(
    styleKey => [styleKey, node.style[styleKey]]
  );
  const stringifiedStyles = styles.map(
    ([styleKey, styleValue]) => `${styleKey}: ${styleValue};`
  ).join("");
  return `.${className}{
    ${stringifiedStyles}
  }`
}

// export default generateSFC;
module.exports = generateSFC;