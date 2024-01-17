import {XtalElementEndUserProps} from 'xtal-element/types';
export class HTMLElement{}

export function makeXtalElement<Props, Methods>(
    scripts: Array<any>,
    xtalElementProps: XtalElementEndUserProps<Props, Methods>,
    className?: string
){
    const {
        superclass, 
        propDefaults, 
        xform, 
        aka, 
        actions, 
        beFormAssociated,
        inferProps,
        propInferenceCriteria,
        propInfo,
        shadowRootMode,
        targetScope
    } = xtalElementProps;
    console.log(String.raw `<template onload=blow-dry-to-head><script type=module>
${scripts.map(x => x.toString() + '\n\r').join('\n\r')};
${className && superclass ? `customElements.define('${superclass}', ${className})` : ''}
</script></template>
`);
    console.log('<xtal-element');

    if(superclass) console.log(`superclass=${superclass}`);
    if(propDefaults){
        console.log(`prop-defaults='${JSON.stringify(propDefaults, undefined, 3)}'`)
    }
    if(xform){
        console.log(`prop-defaults='${JSON.stringify(xform, undefined, 3)}'`)
    }
    console.log('></xtal-element');
}