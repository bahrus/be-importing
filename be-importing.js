import { BeWritten } from 'be-written/be-written.js';
export class BeImporting extends BeWritten {
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
        actions: {
            ...BeWritten.config.actions
        }
    };
}
