import {
    EndUserProps as BeWrittenEndUserProps,
    AllProps as BeWrittenAllProps,
    Actions as BeWrittenActions,
} from 'be-written/types';

export interface EndUserProps extends BeWrittenEndUserProps{
    baseCDN?: string;
}

export interface AllProps extends EndUserProps{}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps {
    proxy: Proxy
}

export type PP = ProxyProps;

export interface Actions{
    onPath(pp: PP): void;
    
}