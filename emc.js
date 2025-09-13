// @ts-check
import { MountObserver, seed, BeHive } from 'be-hive/be-hive.js';
import { emc as baseEMC } from 'be-written/emc.js';
export const emc = {
    ...baseEMC,
    base: 'be-importing',
    enhPropKey: 'beImporting',
    importEnh: async () => {
        const {BeImporting} = await import('./be-importing.js');
        return BeImporting;
    }
};
const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);
