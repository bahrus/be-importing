// @ts-check
import { MountObserver, seed, BeHive } from 'be-hive/be-hive.js';
import { emc as baseEMC } from './emc.js';
/** @import  {EMC} from './ts-refs/trans-render/be/types' */;
/**
 * @type {EMC}
 */
export const emc = {
    ...baseEMC,
    base: '📥',
    enhPropKey: '📥',
};
const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);
