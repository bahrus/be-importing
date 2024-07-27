export class HTMLElement {
}
export function makeXtalElement(xtalElementProps, scripts, className) {
    const { inherits, propDefaults, xform, lcXform, aka, actions, formAss, inferProps, propInferenceCriteria, propInfo, shadowRootMode, targetScope, mainTemplate } = xtalElementProps;
    if (scripts) {
        console.log(String.raw `<template onload=blow-dry-to-head><script type=module>
${scripts.map(x => x.toString() + '\n\r').join('\n\r')};
${className && inherits ? `customElements.define('${inherits}', ${className})` : ''}
</script></template>
`);
    }
    const end = String.raw `<!--end--><!--end-->`;
    const split = mainTemplate.split(end);
    console.log(split[0]);
    console.log('<xtal-element');
    if (inherits)
        console.log(` inherits=${inherits} `);
    if (propDefaults) {
        console.log(` prop-defaults='${JSON.stringify(propDefaults, undefined, 3)}'`);
    }
    if (propInfo) {
        console.log(` prop-info='${JSON.stringify(propInfo, undefined, 3)}' `);
    }
    if (xform) {
        console.log(` xform='${JSON.stringify(xform, undefined, 3)}' `);
    }
    if (lcXform) {
        console.log(` lc-xform='${JSON.stringify(lcXform, undefined, 3)}' `);
    }
    if (actions) {
        console.log(` actions='${JSON.stringify(actions, undefined, 3)}' `);
    }
    if (formAss) {
        console.log(` form-associated `);
    }
    if (inferProps) {
        console.log(` infer-props `);
    }
    if (shadowRootMode) {
        console.log(` shadow-root-mode=${shadowRootMode} `);
    }
    if (aka) {
        console.log(` aka=${aka} `);
    }
    console.log('></xtal-element>');
    console.log(end);
    console.log(split[1]);
}
