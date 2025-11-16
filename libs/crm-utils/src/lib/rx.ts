import { shareReplay } from 'rxjs';

export const shareLast = <T>() => shareReplay<T>({ refCount: true, bufferSize: 1 });
