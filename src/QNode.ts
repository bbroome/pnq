export default class QNode {
  public parent: QNode | undefined
  public prev: QNode | undefined
  public next: QNode | undefined
  public children: QNode[] | undefined
  public textPre: string | undefined
  public textPost: string | undefined

  public get text(): string {
    return this.textPre + this.innerText() + this.textPost
  }

  constructor(public readonly name: string) {}

  private innerText(): string {
    let acc = ''
    if (this.children.length) {
      this.children.forEach(child => {
        acc += child.text
      })
    }
    return acc
  }
}
