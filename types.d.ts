import {
    EndUserProps as BeWrittenEndUserProps,
    AllProps as BeWrittenAllProps,
    Actions as BeWrittenActions,
} from 'be-written/types';
import { ActionOnEventConfigs } from "trans-render/froop/types";

export interface EndUserProps extends BeWrittenEndUserProps{
    baseCDN?: string;
}

export interface AllProps extends EndUserProps {}

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>];

export interface Actions extends BeWrittenActions{
    //onPath(self: this): void;
    
}