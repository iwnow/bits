export async function waitFor<R>(
  check: () => boolean,
  action: () => any,
  opt = { timeout: 5, interval: -1 }
) {
  if (check()) {
    return action();
  }
  return new Promise<R>((res, rej) => {
    const to = setTimeout(() => {
      rej(new Error('timeout wait'));
    }, opt.timeout * 1000);
    function run() {
      if (check()) {
        clearTimeout(to);
        try {
          const r = action();
          res(r);
        } catch (error) {
          rej(error);
        }
      } else {
        if (opt.interval > 0) {
          setTimeout(() => {
            run();
          }, opt.interval);
        } else {
          requestAnimationFrame(run);
        }
      }
    }
    run();
  });
}
