import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeImportingVirtualProps, BeImportingActions, BeImportingProps} from './types';
import {register} from "be-hive/register.js";
import('be-active/be-active.js');

const inProgress : {[key: string]: boolean} = {};
export class BeImportingController implements BeImportingActions{
    async onPath({path, proxy, baseCDN}: this) {
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
        const dp = new DOMParser();
        const doc = dp.parseFromString(text, 'text/html');
        const sr = doc.querySelector('template[shadowroot]') as HTMLTemplateElement;
        if(sr !== null){
            const mode = sr.getAttribute('shadowroot') as 'open' | 'closed';
            proxy.attachShadow({mode});
            const headerSD = proxy.querySelector('template[slot="header-sd"]') as HTMLTemplateElement;
            if(headerSD !== null){
                proxy.shadowRoot!.appendChild(headerSD.content.cloneNode(true));
                headerSD.remove();
            }
            proxy.shadowRoot!.appendChild(sr.content.cloneNode(true));
            const footerSD = proxy.querySelector('template[slot="footer-sd"]') as HTMLTemplateElement;
            if(footerSD !== null){
                proxy.shadowRoot!.appendChild(footerSD.content.cloneNode(true));
                footerSD.remove();
            }


        }
        const el = doc.querySelector(proxy.localName);
        if(el !== null){
            this.copyAttribs(el, proxy);
        }
        const script = doc.querySelector('script[nomodule]') as HTMLScriptElement;
        if(script !== null){
            proxy.insertAdjacentElement('afterend', script);
        }
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
            virtualProps: ['path', 'baseCDN', 'headerHTML', 'footerHTML', ],
            proxyPropDefaults:{
                baseCDN: 'https://cdn.jsdelivr.net/npm/',
            }
        },
        actions:{
            onPath: 'path',

        }
    },
    complexPropDefaults:{
        controller: BeImportingController
    }

});

register(ifWantsToBe, upgrade, tagName);
