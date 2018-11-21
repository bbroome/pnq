interface IQNodeOptions {
  readonly decodeEntities?: boolean
  readonly condenseWhitespace?: boolean
  readonly indexIds?: boolean
  readonly rootSelector?: string
}

const DEFAULTS: IQNodeOptions = {
  condenseWhitespace: true,
  decodeEntities: false,
  indexIds: true,
  rootSelector: 'body'
}

export class QNode {
  public readonly options: IQNodeOptions

  constructor(private readonly html: string, options?: IQNodeOptions) {
    this.options = Object.assign(DEFAULTS, options)
  }
}
