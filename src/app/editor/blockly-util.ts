declare var Blockly: any;

export class BlocklyUtil {

    toolbox = `
      <xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
        <category name="Position" colour="#5b6da5">
          <block type="position_xyz">
            <field name="x">0</field>
            <field name="x">0</field>
            <field name="x">0</field>
          </block>
          <block type="position_center"></block>
        </category>
        <category name="Rotation" colour="#5ba56d">
          <block type="action_rotate"></block>
          <block type="rotation">
            <field name="angle">90</field>
            <field name="axis">x</field>
            <field name="direction">clock</field>
          </block>
        </category>
      </xml>`;

    constructor() {
        Blockly.Blocks.component_augment_marker = {
          init() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage('https://img.icons8.com/metro/420/settings.png', 15, 15, '*'))
                .appendField('COMPONENT SETTINGS');
            this.appendValueInput('NAME')
                .setCheck('position')
                .appendField('Initial position');
            this.appendStatementInput('NAME')
                .setCheck('action')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('On click on resource');
            this.setInputsInline(false);
            this.setColour(230);
            this.setTooltip('');
            this.setHelpUrl('');
          }
        };

        Blockly.Blocks.action_nothing = {
          init() {
            this.appendDummyInput()
                .appendField('Do nothing');
            this.setPreviousStatement(true, 'action');
            this.setColour(120);
            this.setTooltip('');
            this.setHelpUrl('');
          }
        };

        Blockly.Blocks.position_xyz = {
          init() {
            this.appendDummyInput()
                .appendField('X')
                .appendField(new Blockly.FieldNumber(0), 'x');
            this.appendDummyInput()
                .appendField('Y')
                .appendField(new Blockly.FieldNumber(0), 'x');
            this.appendDummyInput()
                .appendField('Z')
                .appendField(new Blockly.FieldNumber(0), 'x');
            this.setInputsInline(true);
            this.setOutput(true, 'position');
            this.setColour(330);
            this.setTooltip('');
            this.setHelpUrl('');
          }
        };

        Blockly.Blocks.position_center = {
          init() {
            this.appendDummyInput()
                .appendField('center of marker');
            this.setOutput(true, 'position');
            this.setColour(330);
            this.setTooltip('');
            this.setHelpUrl('');
          }
        };

        Blockly.Blocks.action_rotate = {
          init() {
            this.appendValueInput('NAME')
                .setCheck('rotation')
                .appendField('Rotate resource');
            this.setInputsInline(true);
            this.setPreviousStatement(true, 'action');
            this.setNextStatement(true, 'action');
            this.setColour(120);
            this.setTooltip('');
            this.setHelpUrl('');
          }
        };

        Blockly.Blocks.rotation = {
          init() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldAngle(90), 'angle')
                .appendField('around')
                .appendField(new Blockly.FieldDropdown([['X', 'x'], ['Y', 'y'], ['Z', 'z']]), 'axis')
                .appendField('in direction')
                .appendField(new Blockly.FieldDropdown([['clockwise', 'clock'], ['counter clockwise', 'counterclock']]), 'direction');
            this.setOutput(true, 'rotation');
            this.setColour(330);
            this.setTooltip('');
            this.setHelpUrl('');
          }
        };
    }

    initialize(blocklyArea: HTMLElement, blocklyDiv: HTMLElement) {
      const workspace = Blockly.inject(blocklyDiv, { toolbox: this.toolbox });
      const onresize = () => {
        blocklyDiv.style.left = '0px';
        blocklyDiv.style.top = '0px';
        blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
        blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
        Blockly.svgResize(workspace);
      };
      window.addEventListener('resize', onresize, false);
      onresize();
      Blockly.svgResize(workspace);
    }

}
