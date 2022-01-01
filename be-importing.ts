import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeImportingVirtualProps, BeImportingActions, BeImportingProps} from './types';
import {register} from "be-hive/register.js";

export class BeImportingController implements BeImportingActions{
    onPath(self: this): void {
        
    }
} 

export interface BeImportingController extends BeImportingProps{}

const tagName = 'be-importing';

const ifWantsToBe = 'importing';

const upgrade = '*';

define<BeImportingProps & BeDecoratedProps<BeImportingProps, BeImportingActions>, BeImportingActions>({
    config:{
        tagName,
        propDefaults:{
            upgrade,
            ifWantsToBe,
            primaryProp: 'path',
            virtualProps: ['path']
        },
        actions:{
            onPath: 'path'
        }
    },
    complexPropDefaults:{
        controller: BeImportingController
    }

});

register(ifWantsToBe, upgrade, tagName);
