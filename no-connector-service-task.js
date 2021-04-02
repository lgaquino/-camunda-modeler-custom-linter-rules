const {
  is
} = require('bpmnlint-utils');


/**
 * Rule that reports incomplete service tasks
 */
module.exports = function() {

  function check(node, reporter) {
    if (is(node, 'bpmn:ServiceTask') && isConnectorServiceTask(node)){
		reporter.report(node.id, 'Connector service task is deprecated. Consider changing to external task.');
    }
  }

  return {
    check: check
  };
};




// helpers /////////////////////////////
function isConnectorServiceTask(serviceTask){
	const extensionElements = serviceTask.extensionElements || [];
	const connectorElement = getInnerElementsByType(extensionElements, "camunda:Connector");
	return connectorElement != null;
}

function getInnerElementsByType(extensionElements, innerElementType) {
  if(extensionElements.values.length > 0){
	  const filter = (element) => element.$type === innerElementType;
	  return extensionElements.values.find(filter);
	}
}