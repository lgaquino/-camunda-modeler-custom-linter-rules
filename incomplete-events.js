const {
  is
} = require('bpmnlint-utils');


/**
 * Rule that reports incomplete events
 */
module.exports = function() {

  function check(node, reporter) {
    if ((is(node, 'bpmn:IntermediateThrowEvent') || is(node, 'bpmn:IntermediateCatchEvent')) && !checkEvent(node)){
		reporter.report(node.id, 'Event properties not specified');
		
    }
  }

  return {
    check: check
  };
};




// helpers /////////////////////////////
function checkEvent(callActivity){
	return !!getConnectorInElement(callActivity);
}



function getConnectorInElement(callActivity){
	const eventDefinitions = callActivity.eventDefinitions || [];
	
	var eventDefinition = getInnerElementsByType(eventDefinitions, "bpmn:MessageEventDefinition");
	if(!!eventDefinition && !Object.getOwnPropertyNames(eventDefinition).includes('messageRef')){
		return false;;
	}
	
	eventDefinition = getInnerElementsByType(eventDefinitions, "bpmn:EscalationEventDefinition");
	if(!!eventDefinition && !Object.getOwnPropertyNames(eventDefinition).includes('escalationRef')){
		return false;;
	}
	else{
		return true;
	}
}



function getInnerElementsByType(eventDefinitions, innerElementType) {
  if(eventDefinitions.length > 0){
	  const filter = (element) => element.$type === innerElementType;
	  return eventDefinitions.find(filter);
	}
}
