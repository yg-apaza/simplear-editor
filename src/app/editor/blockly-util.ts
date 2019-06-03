import { ComponentModel } from '../shared/component/component.model';
import { AugmentMarkerComponent } from './components/augment-marker/augment-marker.component';

declare var Blockly: any;

export class BlocklyUtil {

  selectedComponent: ComponentModel;
  // TODO: Empty toolbox at the start
  toolbox = `
    <xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
      <category name="Events" colour="#5b80a5">
      </category>
      <category name="Actions" colour="#935ba5">
      </category>
    </xml>`;

  // TODO: Create function to generate toolbox based on the type of component
  toolboxAugmentMarker = `
    <xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
      <category name="Events" colour="#5b80a5">
        <block type="event_touch_resource">
          <statement name="NAME">
            <shadow type="action_nothing"></shadow>
          </statement>
        </block>
      </category>
      <category name="Actions" colour="#935ba5">
        <block type="action_rotation">
          <field name="angle">90</field>
          <field name="axis">x</field>
          <field name="direction">clock</field>
        </block>
      </category>
    </xml>`;

    constructor() { }

    static addBlocks() {
      // EVENT BLOCKS

      Blockly.Blocks.event_touch_resource = {
        init() {
          this.appendDummyInput()
              .appendField('On click on resource');
          this.appendStatementInput('ACTIONS')
              .setCheck('action')
              .setAlign(Blockly.ALIGN_RIGHT);
          this.setColour(210);
          this.setTooltip('');
          this.setHelpUrl('');
        }
      };

      // ACTION BLOCKS

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

      Blockly.Blocks.action_rotation = {
        init() {
          this.appendDummyInput()
              .appendField('Rotate resource')
              .appendField(new Blockly.FieldAngle(90), 'angle')
              .appendField('around')
              .appendField(new Blockly.FieldDropdown([['X', 'x'], ['Y', 'y'], ['Z', 'z']]), 'axis')
              .appendField('in direction')
              .appendField(new Blockly.FieldDropdown([['clockwise', 'clock'], ['counter clockwise', 'counterclock']]), 'direction');
          this.setInputsInline(true);
          this.setPreviousStatement(true, 'action');
          this.setNextStatement(true, 'action');
          this.setColour(290);
          this.setTooltip('');
          this.setHelpUrl('');
        }
      };
    }

    static generateToolboxForComponent(componentType: string): string {
      // TODO: Improve this method to generate toolbox based on the type of component
      const emptyToolbox = `
        <xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
          <category name="Events" colour="#5b80a5">
          </category>
          <category name="Actions" colour="#935ba5">
          </category>
        </xml>`;
      const augmentMarkerToolbox = `
        <xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
          <category name="Events" colour="#5b80a5">
            <block type="event_touch_resource">
              <statement name="NAME">
                <shadow type="action_nothing"></shadow>
              </statement>
            </block>
          </category>
          <category name="Actions" colour="#935ba5">
            <block type="action_rotation">
              <field name="angle">90</field>
              <field name="axis">x</field>
              <field name="direction">clock</field>
            </block>
          </category>
        </xml>`;
      switch (componentType) {
        case AugmentMarkerComponent.COMPONENT_TYPE:
          return augmentMarkerToolbox;
          break;
        case 'empty':
        default:
          return emptyToolbox;
          break;
      }
    }

}
