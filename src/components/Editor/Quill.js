import Quill from 'quill';
const icons = Quill.import('ui/icons');

import MindBlot from './format/MindBlot';

Quill.register(
  {
    'formats/mind': MindBlot,
  });
  icons.mind='<svg t="1634197383244" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2796" width="20" height="20"><path d="M139.5 347.6c22.9 0 41.5 18.6 41.5 41.5v41.5c0 22.9-18.6 41.5-41.5 41.5S98 453.5 98 430.6v-41.5c0-22.9 18.6-41.5 41.5-41.5z" fill="" p-id="2797"></path><path d="M928 140.1c0-22.9-18.6-41.5-41.5-41.5h-747c-22.9 0-41.5 18.6-41.5 41.5v83c0 22.9 18.6 41.5 41.5 41.5S181 246 181 223.1v-41.5h664v350.5L711.7 398.8c-16.8-16.1-43.3-16-60 0.2L502.3 548.4l-85-84.5c-16.8-16.1-43.3-15.9-59.8 0.4L181 641.7v-45c0-22.9-18.6-41.5-41.5-41.5S98 573.8 98 596.7v290.5c0 22.9 18.6 41.5 41.5 41.5h747c22.9 0 41.5-18.6 41.5-41.5V140.1z m-83 705.5H322.4l359.4-359.4L845 649.5v196.1zM387.7 551.5l55.9 55.6L205 845.6h-24v-86.2l206.7-207.9z" fill="" p-id="2798"></path></svg>'
  export default Quill;
