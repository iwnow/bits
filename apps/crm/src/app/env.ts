const g = globalThis as any;

export default {
    BIT_API_PREFIX: g.env?.BIT_API_PREFIX || '/api/'
}
