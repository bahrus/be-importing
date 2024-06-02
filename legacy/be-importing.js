import { BeWritten, beWrittenPropDefaults, BeWrittenActions } from 'be-written/be-written.js';
import { XE } from 'xtal-element/XE.js';
import { propDefaults, propInfo } from 'be-enhanced/BE.js';
export class BeImporting extends BeWritten {
    static get beConfig() {
        return {
            parse: true,
            primaryProp: 'from'
        };
    }
}
export const beImportingPropDefaults = {
    ...beWrittenPropDefaults,
    between: ['<!--begin-->', '<!--end-->'],
    shadowRootMode: 'open',
    once: true,
};
export const tagName = 'be-importing';
const xe = new XE({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults,
            ...beImportingPropDefaults
        },
        propInfo: {
            ...propInfo,
        },
        actions: {
            ...BeWrittenActions
        }
    },
    superclass: BeImporting
});
