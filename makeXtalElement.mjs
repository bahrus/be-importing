// @ts-check
/** @import {EndUserProps} from './ts-refs/xtal-element/types.d.ts' */
export class HTMLElement {
}
/**
 * @template Props
 * @template Actions
 * @param {EndUserProps<Props, Actions>} xtalElementProps 
 * @param {((...data: any) => void)=} writer
 * @param {Array<string>=} scripts 
 * @param {string=} className 
 */
export function makeXtalElement(xtalElementProps, writer=console.log, scripts, className) {
    const { 
        inherits, propDefaults, xform, lcXform, aka, actions, fa, inferProps, 
        propInferenceCriteria, propInfo, shadowRootMode, targetScope, mainTemplate,
        compacts, 
    } = xtalElementProps;
    if (scripts) {
        writer(String.raw `<template onload=blow-dry-to-head><script type=module>
${scripts.map(x => x.toString() + '\n\r').join('\n\r')};
${className && inherits ? `customElements.define('${inherits}', ${className})` : ''}
</script></template>
`);
    }
    if(typeof mainTemplate !== 'string') throw 400;
    const end = String.raw `<!--end--><!--end-->`;
    const split = mainTemplate.split(end);
    writer(split[0]);
    writer('<xtal-element');
    if (inherits)
        writer(` inherits=${inherits} `);
    if (propDefaults) {
        writer(` prop-defaults='${JSON.stringify(propDefaults, undefined, 3)}'`);
    }
    if (propInfo) {
        writer(` prop-info='${JSON.stringify(propInfo, undefined, 3)}' `);
    }
    if (xform) {
        writer(` xform='${JSON.stringify(xform, undefined, 3)}' `);
    }
    if (lcXform) {
        writer(` lc-xform='${JSON.stringify(lcXform, undefined, 3)}' `);
    }
    if (actions) {
        writer(` actions='${JSON.stringify(actions, undefined, 3)}' `);
    }
    if(compacts){
        writer(` compacts='${JSON.stringify(compacts, undefined, 3)}'`);
    }
    if (fa) {
        writer(` form-associated `);
    }
    if (inferProps) {
        writer(` infer-props `);
    }
    if (shadowRootMode) {
        writer(` shadow-root-mode=${shadowRootMode} `);
    }
    if (aka) {
        writer(` aka=${aka} `);
    }

    writer('></xtal-element>');
    writer(end);
    writer(split[1]);
}
