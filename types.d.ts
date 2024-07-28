export {Localizer} from "./node_modules/trans-render/lib/mixins/types";
export {XForm} from "./node_modules/trans-render/types";
export {Actions as A, PropInfo} from './node_modules/trans-render/froop/types';

import {
    EndUserProps as BeWrittenEndUserProps,
    AllProps as BeWrittenAllProps,
    Actions as BeWrittenActions,
} from './node_modules/be-written/types';
import { ActionOnEventConfigs } from "./node_modules/trans-render/froop/types";

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