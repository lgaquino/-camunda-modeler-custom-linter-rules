const {
  is
} = require('bpmnlint-utils');


/**
 * Rule that reports incomplete call activities
 */
module.exports = function() {

  function check(node, reporter) {
    if (is(node, 'bpmn:CallActivity')){
		var result = checkCallActivity(node);
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
function checkCallActivity(callActivity){
	var hasCallActivityType = false;
	var isOK = true;
	var errorMsg = 'Call activity incomplete';
	
	if(Object.getOwnPropertyNames(callActivity).includes('calledElement') ){
		hasCallActivityType = true;
		if(callActivity.calledElement.length == 0){
			isOK = false;
			errorMsg = 'Called element property not specified';
		}
	}
	
	if(!hasCallActivityType || !isOK){
		return errorMsg;
	}
	else{
		return 'ok';
	}
}
