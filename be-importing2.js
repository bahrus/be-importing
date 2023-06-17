import { BeWritten, beWrittenPropDefaults, BeWrittenActions } from 'be-written/be-written.js';
import { XE } from 'xtal-element/XE.js';
import { propDefaults } from 'be-enhanced/BE.js';
import { register } from 'be-hive/register.js';
export class BeImporting extends BeWritten {
}
export const beImportingPropDefaults = {
    ...beWrittenPropDefaults,
    between: ['<!--begin-->', '<!--end-->'],
    shadowRootMode: 'open',
    once: true,
};
const tagName = 'be-importing';
const ifWantsToBe = 'importing';
const upgrade = '*';
const xe = new XE({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults,
            ...beImportingPropDefaults
        },
        actions: {
            ...BeWrittenActions
        }
    },
    superclass: BeImporting
});
register(ifWantsToBe, upgrade, tagName);