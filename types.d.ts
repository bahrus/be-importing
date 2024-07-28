import {
    EndUserProps as BeWrittenEndUserProps,
    AllProps as BeWrittenAllProps,
    Actions as BeWrittenActions,
} from './node_modules/be-written/types';

export interface EndUserProps extends BeWrittenEndUserProps{
    baseCDN?: string;
}

export interface AllProps extends EndUserProps {}

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;


export interface Actions extends BeWrittenActions{
    //onPath(self: this): void;
    
}