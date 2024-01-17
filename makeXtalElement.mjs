export class HTMLElement {
}
export function makeXtalElement(xtalElementProps, scripts, className) {
    const { superclass, propDefaults, xform, lcXform, aka, actions, beFormAssociated, inferProps, propInferenceCriteria, propInfo, shadowRootMode, targetScope } = xtalElementProps;
    if (scripts) {
        console.log(String.raw `<template onload=blow-dry-to-head><script type=module>
${scripts.map(x => x.toString() + '\n\r').join('\n\r')};
${className && superclass ? `customElements.define('${superclass}', ${className})` : ''}
</script></template>
`);
    }
    console.log('<xtal-element');
    if (superclass)
        console.log(`superclass=${superclass}`);
    if (propDefaults) {
        console.log(`prop-defaults='${JSON.stringify(propDefaults, undefined, 3)}'`);
    }
    if (propInfo) {
        console.log(`prop-info='${JSON.stringify(propInfo, undefined, 3)}'`);
    }
    if (xform) {
        console.log(`xform='${JSON.stringify(xform, undefined, 3)}'`);
    }
    if (lcXform) {
        console.log(`lc-xform='${JSON.stringify(lcXform, undefined, 3)}'`);
    }
    if (actions) {
        console.log(`actions='${JSON.stringify(actions, undefined, 3)}'`);
    }
    if (beFormAssociated) {
        console.log(`be-form-associated`);
    }
    if (inferProps) {
        console.log(`infer-props`);
    }
    if (shadowRootMode) {
        console.log(`shadow-root-mode=${shadowRootMode}`);
    }
    if (aka) {
        console.log(`aka=${aka}`);
    }
    console.log('></xtal-element>');
}
