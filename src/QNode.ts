export default class QNode {
  public parent: QNode | undefined
  public prev: QNode | undefined
  public next: QNode | undefined
  public firstChild: QNode | undefined

  constructor(
    public readonly name: string,
    private textContent?: string | undefined,
    private attributes?: { [name: string]: string } | undefined
  ) {}

  public get type() {
    return this.textContent ? this.name : 'tag'
  }

  public get attrs() {
    return this.attributes || {}
  }

  public get children() {
    const kids: QNode[] = []
    let kiddo = this.firstChild
    while (kiddo) {
      kids.push(kiddo)
      kiddo = kiddo.next
    }
    return kids
  }

  public get text(): string {
    return this.textContent || this.childText()
  }

  private childText(): string {
    let acc = ''
    let child = this.firstChild
    while (child) {
      acc += child.text
      child = child.next
    }
    return acc
  }
}
