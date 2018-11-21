import QNode from './QNode'

export default function parse(html: string, options?: IParseOptions) {
  const p = new Parser(html, options)
  return p.parse()
}

const DEFAULTS: IParseOptions = {
  condenseWhitespace: true,
  decodeEntities: false,
  indexIds: true,
  rootSelector: 'body'
}

interface IParseOptions {
  readonly decodeEntities?: boolean
  readonly condenseWhitespace?: boolean
  readonly indexIds?: boolean
  readonly rootSelector?: string
}

interface IParseNode {
  node: QNode
  isChild?: boolean
}

const enum state {
  BEFORE_HEAD,
  IN_HEAD,
  AFTER_HEAD,
  IN_BODY
}

class Parser {
  public readonly options: IParseOptions
  private pos = 0
  private state = state.IN_HEAD
  private stack: IParseNode[] = []

  constructor(private html: string, parseOptions?: IParseOptions) {
    this.options = Object.assign(DEFAULTS, parseOptions)
  }

  public parse(): QNode {
    this.state = state.IN_BODY
    const next = this.nextTag

    switch (next.name) {
      case 'html':
        this.stack.push({ node: next })
        break
      case 'head':
        this.state = state.IN_HEAD // fall through
      case 'body':
        this.stack.push({ node: new QNode('html') }, { node: next, isChild: true })
        break
      default:
        let container
        if (isValidHeadTag(next.name)) {
          this.state = state.IN_HEAD // fall through
          container = new QNode('head')
        } else {
          this.state = state.IN_BODY
          container = new QNode('body')
        }
        this.stack.push(
          { node: new QNode('html') },
          { node: container, isChild: true },
          { node: next, isChild: true }
        )
    }
  }

  private get nextTag() {
    return new QNode('html') // TODO
  }
}
