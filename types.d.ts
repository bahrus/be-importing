import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
//import {BeBasedVirtualProps} from 'be-based/types';
import {TransformPluginSettings} from 'trans-render/lib/types';
import {IObserve} from 'be-observant/types';


export interface EndUserProps{
    path?: string;
    baseCDN?: string;
    //beBased?: BeBasedVirtualProps;
    //TODO:  Does it make sense to do a transform?  what is the "host"?
    transform?: any;
    transformPlugins?: {[key: string]: boolean};
    model: IObserve,
}

export interface VirtualProps extends EndUserProps, MinimalProxy{

    modelVal: any,
}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps {
    proxy: Proxy
}

export type PP = ProxyProps;

export interface Actions{
    onPath(pp: PP): void;
    onModel(pp: PP): void;
    doTransform(pp: PP): void;
}