import Parse from '../Parser'
import QNode from '../QNode';

test('Parsing various strings with no tags', () => {
  ['', '  ', 'test'].forEach(str => {
    const q = Parse(str)
    expect(q.name).toBe('html')
    expect(q.text).toBe(str)
    expect(q.firstChild).toBeDefined();
    let child = q.firstChild as QNode;
    expect(child.name).toBe('body');
    expect(child.text).toBe(str);
    if(str) {
      expect(child.firstChild).toBeDefined();
      child = child.firstChild as QNode;
      expect(child.name).toBe('text');
      expect(child.type).toBe('text');
      expect(child.text).toBe(str);
      expect(child.firstChild).toBeUndefined();
    }
  })
})
