import { BeWritten, virtualProps, proxyPropDefaults as BWProxyPropDefaults, actions, } from 'be-written/be-written.js';
import { register } from 'be-hive/register.js';
import { define } from 'be-decorated/DE.js';
export class BeImporting extends BeWritten {
}
const tagName = 'be-importing';
const ifWantsToBe = 'importing';
const upgrade = '*';
export const proxyPropDefaults = {
    ...BWProxyPropDefaults,
    "between": ["<!--begin-->", "<!--end-->"],
    "shadowRoot": "open",
    "once": true
};
define({
    config: {
        tagName,
        propDefaults: {
            ifWantsToBe,
            upgrade,
            virtualProps,
            primaryProp: 'from',
            proxyPropDefaults
        },
        actions: actions
    },
    complexPropDefaults: {
        controller: BeImporting
    }
});
register(ifWantsToBe, upgrade, tagName);
