// @ts-check
import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
/** @import {EMC} from './node_modules/trans-render/be/types.d.ts' */

/**
 * @type {EMC}
 */
export const emc = {
    base: 'be-importing',
    map: {
        '0.0': 'from'
    },
    enhPropKey: 'beImporting',
    importEnh: async () => {
        const { BeImporting } =
        /** @type {{new(): IEnhancement<Element>}} */ 
        /** @type {any} */
        (await import('./be-importing.js'));
        return BeImporting;
    }
};
const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);
