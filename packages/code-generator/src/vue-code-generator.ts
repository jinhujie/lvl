type t_Node = {
  name: string,
  indexedClass: string,
  children: null | t_Node[],
  style: null | t_Style,
  css: string,
}
class ASTNode {
}
type t_Style = {
  [index: string]: string,
}
type t_SFC_template = string[];
type t_SFC_css = string[];

function generateSFC (roots: t_Node[] ) {
  let template: t_SFC_template = [];
  let css: t_SFC_css = [];
  roots.forEach(root => {
    markClassName(root);
    template = template.concat(extractTemplate(root));
    css = css.concat(extractStyle(root));
  });
  console.log(template, css)
  //TODO: not done
  return template;
}

let indexedClass = -1;
function generateIndexedClass () {
  return `gcsfc_${++indexedClass}`
}
function markClassName (node: t_Node) {
  if (node) {
    const newIndexedClass = generateIndexedClass();
    node.indexedClass = newIndexedClass;
    if (node.children) {
      node.children.forEach(child => markClassName(child));
    }
  }
}

function extractTemplate(node: t_Node) {
  let template: t_SFC_template = [];
  if (node) {
    const { children, name } = node;
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

type t_StartTag = string;
type t_EndTag = string;
function generateHtmlTag (tag: string): [t_StartTag, t_EndTag] {
  return [`<${tag}>`, `</${tag}>`]
}

function extractStyle (node: t_Node): t_SFC_css {
  let css: t_SFC_css = [];
  if (node) {
    stringifyStyle(node);
    wrapWithClassName(node);
    css.push(node.css);
    if (node.children) {
      node.children.forEach(child => {
        css = css.concat(extractStyle(child)); 
      });
    }
  }
  return css;
}
function stringifyStyle(node: t_Node): void {
  const hasStyle = !!node.style;
  if (hasStyle) {
    JSON.stringify(node.style).replace(/,/g, ';');
  }
}
function wrapWithClassName (node: t_Node): void {
  node.css = `.${node.indexedClass}{\n${node.css}\n}`
}

export default generateSFC;