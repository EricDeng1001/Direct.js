import * as MUI from "material-ui/RadioButton";
import makeStateOnlyUI from "HOC/makeStateOnlyUI";

const RadioButton = makeStateOnlyUI( MUI.RadioButton );
const RadioButtonGroup = makeStateOnlyUI( MUI.RadioButtonGroup );

export { RadioButton, RadioButtonGroup };
