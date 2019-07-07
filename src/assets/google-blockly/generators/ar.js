Blockly.ar = new Blockly.Generator('ar');

Blockly.ar.event_touch_threedmodel = function(block) {
  var statements_actions = Blockly.ar.statementToCode(block, 'ACTIONS');
  var code = `"touch_threedmodel": [${statements_actions}],`;
  return code;
};

Blockly.ar.action_rotation = function(block) {
  var angle = block.getFieldValue('angle');
  var axis = block.getFieldValue('axis');
  var direction = block.getFieldValue('direction');
  var code = `{"type": "rotation", "inputs": ["${angle}", "${axis}", "${direction}"]}`;
  if(block.nextConnection && block.nextConnection.targetBlock()) {
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock()
    var nextCode = Blockly.ar.blockToCode(nextBlock);
    return code + ", " + nextCode; 
  }
  return code;  
};

Blockly.ar.action_translate = function(block) {
  var units = block.getFieldValue('units');
  var axis = block.getFieldValue('axis');
  var code = `{"type": "translation", "inputs": ["${units}", "${axis}"]}`;
  if(block.nextConnection && block.nextConnection.targetBlock()) {
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock()
    var nextCode = Blockly.ar.blockToCode(nextBlock);
    return code + ", " + nextCode; 
  }
  return code;  
};


Blockly.ar.action_nothing = function(block) {
  return '';
}