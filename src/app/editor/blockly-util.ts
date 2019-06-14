import { ComponentModel } from '../shared/component/component.model';
import { AugmentMarkerComponent } from './components/augment-marker/augment-marker.component';

declare var Blockly: any;

export class BlocklyUtil {

  constructor() { }

  selectedComponent: ComponentModel;

  static addBlocks() {
    // EVENT BLOCKS
    Blockly.Blocks.event_touch_resource = {
      init() {
        this.jsonInit({
          type: 'event_touch_resource',
          message0: Blockly.Msg.BKY_EVENT_TOUCH_RESOURCE,
          args0: [
            {
              type: 'input_dummy'
            },
            {
              type: 'input_statement',
              name: 'ACTIONS',
              check: 'action',
              align: 'RIGHT'
            }
          ],
          colour: 210,
          tooltip: '',
          helpUrl: ''
        });
      }
    };

    // ACTION BLOCKS
    Blockly.Blocks.action_nothing = {
      init() {
        this.jsonInit({
          type: 'action_nothing',
          message0: Blockly.Msg.BKY_ACTION_NOTHING,
          previousStatement: 'action',
          colour: 290,
          tooltip: '',
          helpUrl: ''
        });
      }
    };

    Blockly.Blocks.action_rotation = {
      init() {
        this.jsonInit({
          type: 'action_rotation',
          message0: Blockly.Msg.BKY_ACTION_ROTATION,
          args0: [
            {
              type: 'field_angle',
              name: 'angle',
              angle: 90
            },
            {
              type: 'field_dropdown',
              name: 'axis',
              options: [
                ['X', 'x'],
                ['Y', 'y'],
                ['Z', 'z']
              ]
            },
            {
              type: 'field_dropdown',
              name: 'direction',
              options: [
                [Blockly.Msg.BKY_ACTION_ROTATION_CLOCK, 'clock'],
                [Blockly.Msg.BKY_ACTION_ROTATION_COUNTERCLOCK, 'counterclock']
              ]
            }
          ],
          inputsInline: true,
          previousStatement: 'action',
          nextStatement: 'action',
          colour: 290,
          tooltip: '',
          helpUrl: ''
        });
      }
    };
  }

  static generateToolboxForComponent(componentType: string): string {
    // TODO: Improve this method to generate toolbox based on the type of component
    const emptyToolbox = `
      <xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
      </xml>`;

    const augmentMarkerToolbox = `
      <xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
        <category name="${Blockly.Msg.TLX_EVENTS}" colour="#5b80a5">
          <block type="event_touch_resource">
            <statement name="ACTIONS">
              <shadow type="action_nothing"></shadow>
            </statement>
          </block>
        </category>
        <category name="${Blockly.Msg.TLX_ACTIONS}" colour="#935ba5">
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
