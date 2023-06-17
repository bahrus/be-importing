import {BeWritten, beWrittenPropDefaults, BeWrittenActions } from 'be-written/be-written.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA} from './types';
import {XE} from 'xtal-element/XE.js';
import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {register} from 'be-hive/register.js';

export class BeImporting extends BeWritten implements Actions{

}

export interface BeImporting extends AllProps{}

export const beImportingPropDefaults = {
    ...beWrittenPropDefaults,
    between: ['<!--begin-->', '<!--end-->'],
    shadowRootMode: 'open',
    once: true,
} as PAP;

const tagName = 'be-importing';
const ifWantsToBe = 'importing';
const upgrade = '*';

const xe = new XE<AP, Actions>({
    config:{
        tagName,
        propDefaults:{
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