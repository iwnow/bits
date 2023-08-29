export function pathJoin(...paths: string[]): string {

    if (!paths.length) {
        return '';
    }

    const startWithSlash = paths[0].startsWith('/');
    const endWithSlash = paths[paths.length - 1].endsWith('/');

    let result = paths.join('/').split('/').filter(Boolean).join('/');

    if (startWithSlash) {
        result = '/' + result;
    }
    if (endWithSlash) {
        result += '/';
    }

    return result;
}