import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
//import {BeBasedVirtualProps} from 'be-based/types';
import {TransformPluginSettings} from 'trans-render/lib/types';
import {IObserve} from 'be-observant/types';

export interface BeImportingVirtualProps extends MinimalProxy{
    path?: string;
    baseCDN?: string;
    //beBased?: BeBasedVirtualProps;
    //TODO:  Does it make sense to do a transform?  what is the "host"?
    transform?: any;
    transformPlugins?: {[key: string]: boolean};
    model: IObserve,
    modelVal: any,
}

export interface BeImportingProps extends BeImportingVirtualProps{
    proxy: Element & BeImportingVirtualProps;
}

export interface BeImportingActions{
    onPath(self: this): void;
    onModel(self: this): void;
    doTransform(self: this): void;
}