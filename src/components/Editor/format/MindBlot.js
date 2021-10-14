import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

class MindBlot extends BlockEmbed {
  static blotName = 'mind';
  static tagName = 'div';
  static className = 'jsmind-container';

  static create(value) {
    const node = super.create(value);
    var div = document.createElement('div');
    div.innerHTML = value.code;
    div.className="mermaid"
    node.appendChild(div);
    console.log('node:', value);
    return node;
  }
}

export default MindBlot;
