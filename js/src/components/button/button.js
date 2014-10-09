var buttonTemplateString = require('./template.hbs')();
var buttonProto = Object.create(HTMLElement.prototype);

var buttonTemplate = document.createElement('template');
buttonTemplate.innerHTML = buttonTemplateString;

buttonProto.createdCallback = function(){
	
    var root = this.createShadowRoot();
    root.appendChild(document.importNode(buttonTemplate.content, true));
}

var button = document.registerElement('rs-button', {
    prototype: buttonProto,
    extends: 'button'
});


