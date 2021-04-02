const {
  is
} = require('bpmnlint-utils');


/**
 * Rule that reports incomplete service tasks
 */
module.exports = function() {

  function check(node, reporter) {
    if (is(node, 'bpmn:ServiceTask')){
		var result = checkServiceTask(node);
		if (result != 'ok'){
			reporter.report(node.id, result);
		}
    }
  }

  return {
    check: check
  };
};




// helpers /////////////////////////////
function checkServiceTask(serviceTask){
	var serviceTaskType = '';
	var isOK = true;
	var errorMsg = 'Service task is incomplete';
	
	
	//Java delegate
	if(Object.getOwnPropertyNames(serviceTask).includes('class') ){
		serviceTaskType = 'javaClass';
		if(serviceTask.class.length == 0){
			isOK = false;
			errorMsg = 'Class property not specified';
		}
	}
	
	//External task
	else if(Object.getOwnPropertyNames(serviceTask).includes('type') && serviceTask.type === 'external'){
		serviceTaskType = 'externalTask';
		if(Object.getOwnPropertyNames(serviceTask).includes('topic') && serviceTask.topic.length == 0){
			isOK = false;
			errorMsg = 'Topic property not specified';
		}
	}
	
	
	//Expression
	else if(Object.getOwnPropertyNames(serviceTask).includes('expression')){
		serviceTaskType = 'expression';
		if(serviceTask.expression.length == 0){
			isOK = false;
			errorMsg = 'Expression property not specified';
		}
	}
	
	//Delegate expression
	else if(Object.getOwnPropertyNames(serviceTask).includes('delegateExpression')){
		serviceTaskType = 'delegateExpression';
		if(serviceTask.delegateExpression.length == 0){
			isOK = false;
			errorMsg = 'Delegate expression property not specified';
		}
	}
	
	//Connector
	else if(!!getConnectorElement(serviceTask)){
		serviceTaskType = 'connector';
		if(!isConnectorOK(serviceTask)){
			isOK = false;
			errorMsg = 'Connector is incomplete. Make sure the http-connector is set and both url and result parameters are specified';
		}
	}
	
	
	if(serviceTaskType === '' || !isOK){
		return errorMsg;
	}
	else{
		return 'ok';
	}
}


function getConnectorElement(serviceTask){
	const extensionElements = serviceTask.extensionElements || [];
	return getInnerElementsByType(extensionElements, "camunda:Connector");
}



function isConnectorOK(serviceTask) {
  const connectorElement = getConnectorElement(serviceTask);
  
  if(!!connectorElement){
	  // checks if the http-connector is set
	  const hasConnectorID = Object.getOwnPropertyNames(connectorElement).includes('connectorId') && connectorElement.connectorId === "http-connector";
	  
	  // checks if the necessary parameters (url & result) are set
	  if(Object.getOwnPropertyNames(connectorElement).includes('inputOutput') && Object.getOwnPropertyNames(connectorElement.inputOutput).includes('inputParameters')){
		  const inputOutputElements = connectorElement.inputOutput.inputParameters;	  
		  var inputs = [];
		  inputOutputElements.forEach( e => inputs.push(e.name));
		  var existsNecessaryParameters = true;
		  ['url', 'result'].forEach( e => {
			  if(!inputs.includes(e)){
				existsNecessaryParameters = false;
			  }
			});
		  
		  return existsNecessaryParameters && hasConnectorID;
	  }
  }else{
	  return false;
  }
  
}


function getInnerElementsByType(extensionElements, innerElementType) {
  if(extensionElements.values.length > 0){
	  const filter = (element) => element.$type === innerElementType;
	  return extensionElements.values.find(filter);
	}
}