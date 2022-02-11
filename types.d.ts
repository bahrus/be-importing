import {BeDecoratedProps} from 'be-decorated/types';
import {BeBasedVirtualProps} from 'be-based/types';
import {TransformPluginSettings} from 'trans-render/lib/types';

export interface BeImportingVirtualProps{
    path?: string;
    baseCDN?: string;
    beBased?: BeBasedVirtualProps;
    //TODO:  Does it make sense to do a transform?  what is the "host"?
    // transform?: any;
    // transformPlugins?: {[key: string]: TransformPluginSettings | string};
    model: any,
    modelSrc: string | IObserve,
}

export interface BeImportingProps extends BeImportingVirtualProps{
    proxy: Element & BeImportingVirtualProps;
}

export interface BeImportingActions{
    onPath(self: this): void;
}