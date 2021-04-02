const {
  is
} = require('bpmnlint-utils');


/**
 * Rule that reports incomplete call activities
 */
module.exports = function() {

  function check(node, reporter) {
    if (is(node, 'bpmn:CallActivity') && !checkCallActivity(node)){
		reporter.report(node.id, 'Input parameters not specified');
		
    }
  }

  return {
    check: check
  };
};




// helpers /////////////////////////////
function checkCallActivity(callActivity){
	return !!getConnectorInElement(callActivity);
}



function getConnectorInElement(callActivity){
	const extensionElements = callActivity.extensionElements || [];
	return getInnerElementsByType(extensionElements, "camunda:In");
}



function getInnerElementsByType(extensionElements, innerElementType) {
  if(extensionElements.values.length > 0){
	  const filter = (element) => element.$type === innerElementType;
	  return extensionElements.values.find(filter);
	}
}