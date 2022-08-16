import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeImportingVirtualProps, BeImportingActions, BeImportingProps} from './types';
import {register} from "be-hive/register.js";
import {RenderContext} from 'trans-render/lib/types';

const inProgress : {[key: string]: boolean} = {};
export class BeImportingController implements BeImportingActions{
    #ctx: RenderContext | undefined;
    async onPath({path, proxy, baseCDN, transform, transformPlugins, modelVal}: this) {
        if(customElements.get(proxy.localName) !== undefined){
            return;
        }
        if(inProgress[proxy.localName]){
            return;
        }
        inProgress[proxy.localName] = true;
        let href = path!;
        if(!path!.includes('//') && path![0] !== '/' && path![0] !== '.'){
            const linkPreload = (<any>self)[path!] as HTMLLinkElement | undefined;
            if(linkPreload !== undefined){
                href = linkPreload.href;
            }else{
                if(!baseCDN!.endsWith('/')){
                    baseCDN += '/';
                }
                href = baseCDN! + path;
            }            
        }

        const resp = await fetch(href);
        const text = await resp.text();
        const dp = new DOMParser() as any;
        const iPosOfOpenTempl = text.indexOf('<template ');
        const iPosOfEndOfOpenTempl = text.indexOf('>', iPosOfOpenTempl);
        const iPosOfLastClosedTempl = text.lastIndexOf('</template>');
        const textInsideTemplate = text.substring(iPosOfEndOfOpenTempl + 1, iPosOfLastClosedTempl);
        const textOutsideTemplate = text.substring(0, iPosOfEndOfOpenTempl + 1) + text.substring(iPosOfLastClosedTempl);
        const docOutsideTemplate = dp.parseFromString(textOutsideTemplate, 'text/html');
        const docInsideTemplate = dp.parseFromString(textInsideTemplate, 'text/html', {includeShadowRoots: true});
        if(transform !== undefined){
            const {DTR} = await import('trans-render/lib/DTR.js');
            this.#ctx = {
                match: transform,
                host: modelVal as HTMLElement,
                plugins: {...transformPlugins},
            };
            await DTR.transform(docInsideTemplate, this.#ctx);
        }
        const shadowRootTempl = docOutsideTemplate.querySelector('template[shadowroot]') as HTMLTemplateElement;
        if(shadowRootTempl !== null){
            const mode = shadowRootTempl.getAttribute('shadowroot') as 'open' | 'closed';
            proxy.attachShadow({mode});
            proxy.shadowRoot!.append(...docInsideTemplate.body.children);
        }
        const el = docOutsideTemplate.querySelector(proxy.localName);
        if(el !== null){
            this.copyAttribs(el, proxy);
        }
        const script = docOutsideTemplate.querySelector('script[nomodule]') as HTMLScriptElement;
        if(script !== null){
            proxy.insertAdjacentElement('afterend', script);
        }
    }

    async doTransform({transform, modelVal, proxy}: this) {
        if(this.#ctx === undefined) return;
        const root = proxy.shadowRoot;
        if(root === null) return;
        this.#ctx.match = transform;
        this.#ctx.host = modelVal;
        const {DTR} = await import('trans-render/lib/DTR.js');
        await DTR.transform(root, this.#ctx);
    }

    copyAttribs(from: Element, to: Element){
        for(let i = 0, ii = from.attributes.length; i < ii; i++){
            const attr = from.attributes[i];
            try{
                to.setAttribute(attr.name, attr.value);
            }catch(e){
                console.warn(e);
            }
        }
    }

    async onModel({model, proxy}: this){
        const {hookUp} = await import('be-observant/hookup.js');
        hookUp(model, proxy, 'modelVal');
    }
} 

export interface BeImportingController extends BeImportingProps{}

const tagName = 'be-importing';

const ifWantsToBe = 'importing';

const upgrade = '*';

define<BeImportingProps & BeDecoratedProps<BeImportingProps, BeImportingActions>, BeImportingActions>({
    config:{
        tagName,
        propDefaults:{
            upgrade,
            ifWantsToBe,
            primaryProp: 'path',
            virtualProps: ['path', 'baseCDN', 'model', 'modelVal', 'transform', 'transformPlugins'],
            proxyPropDefaults:{
                baseCDN: 'https://cdn.jsdelivr.net/npm/',
            }
        },
        actions:{
            onPath: 'path',
            onModel: 'model',
            doTransform: {
                ifAllOf: ['modelVal', 'transform']
            }
        }
    },
    complexPropDefaults:{
        controller: BeImportingController
    }

});

register(ifWantsToBe, upgrade, tagName);
