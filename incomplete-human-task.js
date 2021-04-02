const {
  is
} = require('bpmnlint-utils');


/**
 * Rule that reports incomplete user tasks
 */
module.exports = function() {

  function check(node, reporter) {
    if (is(node, 'bpmn:UserTask')){
		if(!hasInputParameters(node)) {
			reporter.report(node.id, 'User task needs input parameters');
		}
		if(!hasDocumentation(node)) {	
			reporter.report(node.id, 'User task needs documentation');
		}
    }
  }

  return {
    check: check
  };
};




// helpers /////////////////////////////
function hasInputParameters(userTask) {
  const extensionElements = userTask.extensionElements || [];  
  
  if(extensionElements.values.length > 0){
	  const inputOutput = getInnerElementsByType(extensionElements, "camunda:InputOutput");
	  
	  //checks if every input parameter was filled
	  const hasBodyFilled = (body) => body != null;
	  const allParametersWithBody = inputOutput.inputParameters.every(hasBodyFilled);
	  
	  //checks if an input parameter named 'urlExecucao' exists
	  const hasParameterUrlExecucao = (input) => input.name === 'urlExecucao';
	  const existsUrlExecucao = inputOutput.inputParameters.some(hasParameterUrlExecucao);
	  
	  return allParametersWithBody && existsUrlExecucao;
  }else{
	  return false;
  }
  
}

function hasDocumentation(userTask) {
	return !!userTask.documentation && userTask.documentation.length > 0 && !!userTask.documentation[0].text
	
}

function getInnerElementsByType(extensionElements, innerElementType) {
  if(extensionElements.values.length > 0){
	  const filter = (element) => element.$type === innerElementType;
	  return extensionElements.values.find(filter);
	}
}