import {
    EndUserProps as BeWrittenEndUserProps,
    VirtualProps as BeWrittenVirtualProps,
    Actions as BeWrittenActions,
} from 'be-written/types';

export interface EndUserProps extends BeWrittenEndUserProps{
    baseCDN?: string;
}

export interface VirtualProps extends EndUserProps, BeWrittenVirtualProps{}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps {
    proxy: Proxy
}

export type PP = ProxyProps;

export interface Actions{
    onPath(pp: PP): void;
    
}