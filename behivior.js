import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
const base = 'be-importing';
export const emc = {
    base,
    map: {
        '0.0': 'from'
    },
    enhPropKey: 'beWritten',
    importEnh: async () => {
        const { BeImporting } = await import('./be-importing.js');
        return BeImporting;
    }
};
const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);
