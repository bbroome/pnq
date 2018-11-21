import QNode from "./QNode";

export default function parse(html: string, options?: IParserOptions) {
  const p = new Parser(html, options);
  return p.parse();
}

interface IParserOptions {
  readonly decodeEntities?: boolean
  readonly condenseWhitespace?: boolean
  readonly indexIds?: boolean
  readonly rootSelector?: string
}

const DEFAULTS: IParserOptions = {
  condenseWhitespace: true,
  decodeEntities: false,
  indexIds: true,
  rootSelector: 'body'
}

class Parser {
  public readonly options: IParserOptions

  constructor(private html: string, options?: IParserOptions) {
    this.options = Object.assign(DEFAULTS, options)
  }

  public parse(): QNode {
    throw new Error("Method not implemented.");
  }
}
