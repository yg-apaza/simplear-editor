import { EditComponentService } from '../shared/component/edit-component.service';
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

    constructor(
      private editComponentService: EditComponentService
    ) {

      this.editComponentService.currentComponent.subscribe(component => {
        this.selectedComponent = component;
        // TODO: Save workspace to database
        Blockly.mainWorkspace.clear();
        switch (component.type) {
          case AugmentMarkerComponent.COMPONENT_TYPE:
            Blockly.mainWorkspace.updateToolbox(this.toolboxAugmentMarker);
            break;
        }
        // TODO: Load workspace from database

      });

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

    initialize(blocklyArea: HTMLElement, blocklyDiv: HTMLElement) {
      const workspace = Blockly.inject(
        blocklyDiv,
        {
          toolbox: this.toolbox,
          horizontalLayout: true,
          maxBlocks: Infinity,  // Disable all blocks first time
          grid : {
            spacing : 20,
            length : 1,
            colour : '#888',
            snap : false
          },
          zoom : {
            controls : true,
            wheel : true,
            startScale : 0.9,
            maxScale : 3,
            minScale : 0.5,
            scaleSpeed : 1.2
          }
        }
      );
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

      Blockly.mainWorkspace.addChangeListener(event => {
        if (
          event.type === Blockly.Events.CREATE ||
          event.type === Blockly.Events.DELETE ||
          event.type === Blockly.Events.MOVE ||
          event.type === Blockly.Events.CHANGE ) {
          // Auto-save for every change detected
          console.log('SAVE in component ' + this.selectedComponent.id);
        }
      });
    }

}
