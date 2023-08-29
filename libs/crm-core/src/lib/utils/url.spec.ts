import * as url from './url';

describe('utils/url', () => {
    
    describe('urlPathJoin', () => {
        
        it('should join [a,b,c,d] to a/b/c/d', () => {
            
            const result = url.pathJoin('a', 'b', 'c', 'd');

            expect(result).toBe('a/b/c/d');

        });

        it('should join with start slash', () => {
            
            const result = url.pathJoin('/a/', 'b', 'c');

            expect(result).toBe('/a/b/c');

        });

        it('should join with end slash', () => {
            
            const result = url.pathJoin('a/', 'b', 'c/');

            expect(result).toBe('a/b/c/');

        });

        it('should join with start,end slash', () => {
            
            const result = url.pathJoin('/a/', 'b', 'c/');

            expect(result).toBe('/a/b/c/');

        });

        it('should return empty string if not args', () => {
            const result = url.pathJoin();
            expect(result).toBe('');
        });

    });

});