import {BeDecoratedProps} from 'be-decorated/types';

export interface BeImportingVirtualProps{
    path?: string;
    baseCDN?: string;
    headerHTML?: string;
    footerHTML?: string;
}

export interface BeImportingProps extends BeImportingVirtualProps{
    proxy: Element & BeImportingVirtualProps;
}

export interface BeImportingActions{
    onPath(self: this): void;
}