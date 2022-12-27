import {BeWritten, 
    virtualProps, 
    proxyPropDefaults as BWProxyPropDefaults, 
    actions,
} from 'be-written/be-written.js';
import {
    Actions
} from 'be-written/types.js';
import {ActionExt} from 'be-decorated/types';
import {register} from 'be-hive/register.js';
import { PPP, PP, VirtualProps } from '../be-written/types';
import {define, BeDecoratedProps} from 'be-decorated/DE.js';
export class BeImporting extends BeWritten{}

const tagName = 'be-importing';

const ifWantsToBe = 'importing';

const upgrade = '*';

export const proxyPropDefaults = {
    ...BWProxyPropDefaults,
    "between": ["<!--begin-->", "<!--end-->"],
    "shadowRoot": "open",
    "once": true
} as PPP;


define<PP & BeDecoratedProps<PP, Actions>, Actions>({
    config:{
        tagName,
        propDefaults:{
            ifWantsToBe,
            upgrade,
            virtualProps,
            primaryProp: 'from',
            proxyPropDefaults
        },
        actions: actions as Partial<{[key in keyof Actions]: ActionExt<PP & BeDecoratedProps<PP, Actions>, Actions>}>
    },
    complexPropDefaults: {
        controller: BeImporting
    }
});

register(ifWantsToBe, upgrade, tagName);