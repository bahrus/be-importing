// @ts-check
import { BeWritten } from 'be-written/be-written.js';
class BeImporting extends BeWritten {
    static config = {
        propDefaults: {
            ...BeWritten.config.propDefaults,
            between: ['<!--begin-->', '<!--end-->'],
            shadowRootMode: 'open',
            once: true,
        },
        propInfo: {
            ...BeWritten.config.propInfo
        },
        compacts: {
            ...BeWritten.config.compacts,
        },
        actions: {
            ...BeWritten.config.actions
        }
    };
}
await BeImporting.bootUp();
export { BeImporting };
