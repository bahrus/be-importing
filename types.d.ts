import {BeDecoratedProps} from 'be-decorated/types';
import {BeBasedVirtualProps} from 'be-based/types';

export interface BeImportingVirtualProps{
    path?: string;
    baseCDN?: string;
    beBased?: BeBasedVirtualProps;
}

export interface BeImportingProps extends BeImportingVirtualProps{
    proxy: Element & BeImportingVirtualProps;
}

export interface BeImportingActions{
    onPath(self: this): void;
}