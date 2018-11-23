import QNode from './QNode'
import {
  autocloseAncestors,
  child,
  ensureParent,
  getAncestor,
  isHeadTag,
  isTagChar,
  isVoid,
  sibling
} from './Utils'

export default function parse(html: string, options?: IParseOptions) {
  const p = new Parser(html, options)
  return p.parse()
}

const DEFAULTS: IParseOptions = {
  decodeEntities: false,
  indexIds: true
}

interface IParseOptions {
  readonly decodeEntities?: boolean
  readonly indexIds?: boolean
  readonly rootSelector?: string
}

interface INugget {
  node?: QNode
  endTag?: string
  text?: string
  selfClosed?: boolean
}

interface ITag {
  name: string
  attrs?: { [name: string]: string }
  selfClosed?: boolean
}

class Parser {
  public readonly options: IParseOptions
  private pos = 0
  private inHead = false

  constructor(private html: string, parseOptions?: IParseOptions) {
    this.options = Object.assign(DEFAULTS, parseOptions)
  }

  public parse(): QNode {
    const n = this.nibble()
    if (n.node && n.node.name === 'html') {
      return this.gobble(n.node)
    }
    const doc = new QNode('html')
    const section = this.getSection(n)
    if (n.text) {
      const text = new QNode('text', n.text)
      text.next = section.firstChild
      text.parent = section
      section.firstChild = text
    }
    child(doc, section)
    return doc
  }

  private getSection(n: INugget): QNode {
    if (n.node) {
      this.inHead = n.node.name === 'head'
      if (n.node.name === 'body' || this.inHead) {
        return this.gobble(n.node)
      }
      this.inHead = isHeadTag(n.node.name)
      const section = new QNode(this.inHead ? 'head' : 'body')
      child(section, n.node)
      this.gobble(n.node, n.selfClosed)
      return section
    } else {
      const section = new QNode('body')
      if (n.endTag) {
        const node = new QNode(n.endTag)
        child(section, node)
        this.gobble(node, true)
      }
      return section
    }
  }

  private onClose(node: QNode) {
    autocloseAncestors(node)
    switch (node.name) {
      case 'col':
        ensureParent(node, 'colgroup')
        break
    }
  }

  private gobble(node: QNode, isClosed?: boolean) {
    if (isClosed || isVoid(node.name)) {
      this.onClose(node)
      this.gobbleNext(node)
    } else {
      this.gobbleChildren(node)
    }
    return node
  }

  private gobbleChildren(parent: QNode) {
    throw Error('Not implemented')
  }

  private gobbleNext(prev: QNode) {
    const next = this.nibble()
    if (next.text) {
      const text = new QNode('text', next.text)
      sibling(prev, text)
      prev = text
    }
    if (next.endTag) {
      let node = getAncestor(next.endTag)
      if (!node) {
        node = new QNode(next.endTag)
        sibling(prev, node)
      }
      this.gobble(node, true)
    } else if (next.node) {
      sibling(prev, next.node)
      this.gobble(next.node, next.selfClosed)
    }
  }

  private nibble(): INugget {
    let txt = ''
    while (this.pos < this.html.length) {
      const c = this.html[this.pos++]
      if (c === '<') {
        if (this.html[this.pos] === '/') {
          this.pos++
          const name = this.gobbleEndTag()
          if (name) {
            return { endTag: name, text: txt }
          } else {
            this.pos--
          }
        }
        const tag = this.gobbleTag()
        if (tag) {
          return {
            node: new QNode(tag.name, txt, tag.attrs),
            selfClosed: tag.selfClosed
          }
        }
      }
      txt += c
    }
    return { text: txt }
  }

  private gobbleTag(): ITag | null {
    const start = this.pos
    let tag = ''
    while (isTagChar(this.html.charCodeAt(this.pos))) {
      tag += this.html[this.pos++]
    }
    if (tag && this.gobbleWS()) {
      const attributes = this.gobbleAttrs()
      const c = this.html[this.pos++]
      if (c === '/' && this.html[this.pos++] === '>') {
        return { name: tag, attrs: attributes, selfClosed: true }
      } else if (c === '>') {
        return { name: tag, attrs: attributes }
      }
    }
    this.pos = start // not a proper tag; reset
    return null
  }

  private gobbleWS(): boolean {
    throw Error('Not implemented') // true if WS found, false otherwise
  }

  private gobbleAttrs(): { [name: string]: string } | undefined {
    throw Error('Not implemented')
  }

  private gobbleEndTag(): string {
    throw Error('Not implemented')
  }
}
