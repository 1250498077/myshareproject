const delay = (time) => {
    return new Promise((resolve) => {
      let timers = setInterval(() => {
        clearInterval(timers);
        resolve();
      }, time);
    })
  };

module.exports = async (ctx, next) => {
  const body = ctx.request.body
  await delay(2000);
  next()
}

