const g = (typeof window === 'undefined' ? {} : window) as any;

export default {
    BIT_API_PREFIX: import.meta.env.BIT_API_PREFIX || g.env?.BIT_API_PREFIX || '/api/'
}
