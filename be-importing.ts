import {BE, BEConfig} from 'be-enhanced/BE.js';
import {Actions, AllProps, AP, PAP, ProPAP} from './types';
import {IEnhancement,  BEAllProps} from 'trans-render/be/types';
import {BeWritten} from 'be-written/be-written.js';

class BeImporting extends BeWritten implements Actions{
    static override config: BEConfig<AP & BEAllProps, Actions & IEnhancement, any> = {
        propDefaults: {
            ...BeWritten.config.propDefaults,
            between: ['<!--begin-->', '<!--end-->'],
            shadowRootMode: 'open',
            once: true,
        },
        propInfo: {
            ...BeWritten.config.propInfo
        },
        actions: {
            ...BeWritten.config.actions
        }
    }
}

interface BeImporting extends AP{}

await BeImporting.bootUp();

export {BeImporting}