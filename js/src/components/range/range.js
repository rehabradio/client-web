var rangeTemplateString = require('./template.hbs')();
var rangeProto = Object.create(HTMLElement.prototype);

var rangeTemplate = document.createElement('template');
rangeTemplate.innerHTML = rangeTemplateString;

rangeProto.createdCallback = function(){
    var self = this,
        isReadOnly = false;

    if(self.getAttribute('readonly') != null){
        if(self.getAttribute('readonly') === 'true' || self.getAttribute('readonly') === ''){
            isReadOnly = true;
        }
    }

    var root = self.createShadowRoot();
    root.appendChild(document.importNode(rangeTemplate.content, true));

    var rangeTotal = root.querySelector('.range-total');
    var rangeCurrent = root.querySelector('.range-current');
    var rangeControl = root.querySelector('.range-control');


    var offset = 0;

    rangeTotal.addEventListener('seek', function(e){

        offset = Math.min(1, Math.max(0, (e.offset.x - this.getBoundingClientRect().left) / this.offsetWidth));

        rangeCurrent.style.width = (offset * 100).toString() + '%';
        rangeControl.style.left = (offset * 100).toString() + '%';

        rangeProto.publicEvents.onseek.value = offset;
        
        // Setting the ranges value here crashes chrome.
        // self.value = offset.toString();
        self.dispatchEvent(rangeProto.publicEvents.onseek);
    }, false);

        rangeTotal.addEventListener('seekend', function(e){

        rangeProto.publicEvents.onseekend.value = offset;
        self.dispatchEvent(rangeProto.publicEvents.onseekend);
    }, false);

    self.addEventListener('setvalue', function(e){
        var value = Math.min(1, Math.max(0, e.value));
        rangeCurrent.style.width = (value * 100).toString() + '%';
        rangeControl.style.left = (value * 100).toString() + '%';
    });

    if(!isReadOnly){

        rangeTotal.addEventListener('mousedown', self.onMousedown, false);

        window.addEventListener('mouseup', self.onMouseup, false);
    }
    
}

rangeProto.privateEvents = {
    seek: new CustomEvent('seek'),
    seekend: new CustomEvent('seekend'),
    setvalue: new CustomEvent('setvalue')
}

rangeProto.publicEvents = {
    onseek: new CustomEvent('onseek'),
    onseekend: new CustomEvent('onseekend')
}

rangeProto.onseek = new CustomEvent('onseek');

rangeProto.onMouseUp = function(){

    this.dispatchEvent(rangeProto.privateEvents.seekend);
    window.removeEventListener('mouseup', window._onMouseUp, false);
}

rangeProto.onMousedown = function(e){
// cache the function to the global scope and bind the element so that its available later

    window._onMouseUp = rangeProto.onMouseUp.bind(this);
    window.addEventListener('mouseup', window._onMouseUp, false);

    window._onMouseMove = rangeProto.onMouseMove.bind(this);
    window.addEventListener('mousemove', window._onMouseMove, false);

}

window.addEventListener('mouseup', function(){

    window.removeEventListener('mousemove', window._onMouseMove);
}, false);

rangeProto.onMouseMove = function(e){

    rangeProto.privateEvents.seek.offset = {x: e.x, y: e.y};
    this.dispatchEvent(rangeProto.privateEvents.seek);

}

rangeProto.setValue = function(value){

    rangeProto.privateEvents.setvalue.value = value;
    this.dispatchEvent(rangeProto.privateEvents.setvalue);
}

var range = document.registerElement('rs-range', {
    prototype: rangeProto,
    extends: 'input'
});


