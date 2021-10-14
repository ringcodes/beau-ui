<template>
  <div>
    <div ref="quillEditor"></div>
    <a-modal
      title="插入图形"
      :visible="visible"
      @ok="handleOk"
      width="700px"
      @cancel="()=>this.visible = false"
    >
      <div class="left">
          <a-textarea v-model="graphCode" placeholder="Basic usage" :rows="10" @change="render"/>
      </div>
      <div class="right">
        <div class="mermaid">
          <div id="graphDiv" v-html="graphSvg"></div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import Quill from './Quill'
import 'quill/dist/quill.snow.css'
import { Modal,Input } from 'ant-design-vue'
import mermaid from 'mermaid'

export default {
  name: 'editor',
  components:{
    AModal: Modal,
    ATextarea: Input.TextArea
  },
  props: {
    value: Object
  },
  data() {
    return {
      quill:null,
      visible: false,
      graphCode: '',
      graphSvg: '',
      _content: '',
      options: {
        theme: 'snow',
        modules: {
            toolbar:{
              container: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['clean'],
                ['link', 'image', 'video'],
                ['mind']
              ],
              handlers: {
                mind: ()=>{
                  this.visible = true;
                }
              },
              initButton() {
                const insertInputButtons = document.querySelectorAll('.ql-mind')
                for (let btnDom of insertInputButtons) {
                  btnDom.classList.add('iconeditor')
                  btnDom.classList.add('iconfont')
                  btnDom.classList.add('owner-tool-btn')
                  btnDom.title = '插入输入框'
                  }
                },
            }
          },
          placeholder: 'Insert text here ...'
      }
    }
  },
  methods:{
    handleOk(){
      var  selection = this.quill.getSelection();
      var index =0;
      if (selection) index = selection.index;
      this.quill.insertEmbed(index, 'mind', {
        code: this.graphCode,
        svg: this.graphSvg
      });
      this.visible =  false;
    },
    render(){
      const that = this;
     const cb = function(svgGraph){
         console.log(svgGraph);
        that.graphSvg = svgGraph
     };
     mermaid.mermaidAPI.render('graphDivaa',this.graphCode,cb);
    }
  },
  mounted() {
    this.quill = new Quill(this.$refs.quillEditor, this.options);
    this.quill.setContents(this.value)
    this.quill.on('text-change', () => {
      this.$emit('input', this.quill.getContents())
    });
    mermaid.mermaidAPI.initialize({
        startOnLoad:true
    });
    // Update model if text changes
    this.quill.on('text-change', (delta, oldDelta, source) => {
      let html = this.$refs.quillEditor.children[0].innerHTML
      const quill = this.quill
      const text = this.quill.getText()
      if (html === '<p><br></p>') html = ''
      this._content = html
      this.$emit('change', html, text, quill)
    })
  }
}
</script>
<style>
.ql-toolbar{
  text-align: left;
}
</style>
<style lang="less" scoped>
.left{
  width: 45%;
  display: inline-block;
}
.right{
  width: 42%;
  display: inline-block;
  vertical-align: top;
  padding: 0px 30px;
}
</style>