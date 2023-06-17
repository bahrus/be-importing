import {BeWritten, beWrittenPropDefaults, BeWrittenActions } from 'be-written/be-written.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA} from './types';
import {XE} from 'xtal-element/XE.js';
import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {register} from 'be-hive/register.js';

export class BeImporting extends BeWritten implements Actions{
    static  override get beConfig(){
        return {
            parse: true,
            primaryProp: 'from'
        } as BEConfig
    }
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
        propInfo: {
           ...propInfo,  
        },
        actions: {
            ...BeWrittenActions
        }
    },
    superclass: BeImporting
});

register(ifWantsToBe, upgrade, tagName);