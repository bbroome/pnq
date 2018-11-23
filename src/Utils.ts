import QNode from './QNode'

export function isVoid(name: string): boolean {
  throw Error('Not implemented')
}

export function autocloseAncestors(node: QNode) {
  throw Error('Not implemented')
}

export function getAncestor(name: string): QNode | undefined {
  throw Error('Not implemented')
}

export function ensureParent(node: QNode, name: string) {
  if (node.parent && node.parent.name === name) {
    return
  }
  const granny = node.parent
  const parent = new QNode(name)
  node.parent = parent
  parent.firstChild = node
  if (granny) {
    parent.parent = granny
    if (node.prev) {
      node.prev.next = parent
      parent.prev = node.prev
    } else {
      granny.firstChild = parent
    }
  }
  delete node.prev
}

export function child(parent: QNode, kiddo: QNode) {
  kiddo.parent = parent
  let lastKid = parent.firstChild
  if (lastKid) {
    while (lastKid.next) {
      lastKid = lastKid.next
    }
    kiddo.prev = lastKid
    lastKid.next = kiddo
  } else {
    parent.firstChild = kiddo
  }
}

export function sibling(prev: QNode, newSib: QNode) {
  newSib.parent = prev.parent
  newSib.prev = prev
  prev.next = newSib
}

const headTags: { [name: string]: boolean } = {
  base: true,
  command: true,
  link: true,
  meta: true,
  noscript: true,
  script: true,
  style: true,
  template: true,
  title: true
}

export function isHeadTag(name: string) {
  return headTags[name]
}

export const tags = {
  descItems: { dd: true, dt: true },
  pClosers: {
    address: true,
    article: true,
    aside: true,
    blockquote: true,
    div: true,
    dl: true,
    fieldset: true,
    footer: true,
    form: true,
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    h5: true,
    h6: true,
    header: true,
    hgroup: true,
    hr: true,
    menu: true,
    nav: true,
    ol: true,
    p: true,
    pre: true,
    section: true,
    table: true,
    ul: true
  },
  rubyBits: { rp: true, rt: true },
  tableSections: { colgroup: true, thead: true, tfoot: true, tbody: true }
}

export function isSpaceChar(charCode: number): boolean {
  return spaceChars[charCode]
}
export function isTagChar(charCode: number): boolean {
  return tagChars[charCode]
}

const spaceChars: boolean[] = []

for (let i = 0; i < 33; i++) {
  spaceChars[i] = i === 9 || i === 10 || i === 12 || i === 13 || i === 32
}

const tagChars = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true
]
// tableRows: { ...tableSections, tr: true };
// const tableCells = { ...tableRows, th: true, td: true };

// const voidElements = {
//   area: true, base: true,	br: true,	col: true, embed: true, hr: true,
//   img: true, input: true, link: true, meta: true, param: true,
//   source: true, track: true, wbr: true
// };

// const rawTextElements = { script: true, style: true }
// const escRawTextElements = { textarea: true, title: true }
// const foreignElements = { math: true, svg: true };

// const autoClosedBy = {
//   colgroup: tableSections,
//   dd: descItems,
//   dt: descItems,
//   head: { ...pClosers,
//     body: true, a: true, audio: true, canvas: true, del: true, details: true,
//     figure: true, ins: true, map: true, noscript: true, object: true, video: true,
//     em: true, strong: true, small: true, mark: true, abbr: true, dfn: true,
//     i: true, b: true, s: true, u: true, code: true, var: true, samp: true,
//     kbd: true, sup: true, sub: true, q: true, cite: true, span: true, math: true,
//     bdo: true, bdi: true, br: true, wbr: true, img: true, embed: true, svg: true,
//     iframe: true, area: true, script: true, ruby: true, input: true, time: true,
//     textarea: true, select: true, button: true, label: true, output: true,
//     datalist: true, keygen: true, progress: true, command: true, meter: true
//   },
//   li: { li: true },
//   optgroup: { optgroup: true },
//   option: { option : true, optgroup: true },
//   p: pClosers,
//   rp: rubyBits,
//   rt: rubyBits,
//   tbody: tableSections,
//   thead: tableSections,
//   tfoot: tableSections,
//   tr: tableRows,
//   th: tableCells,
//   td: tableCells
// };
