function delay(timeoutMS) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeoutMS)
  });
}

function add(a: number, b: number): number {
  return a + b
}

function addAsync(a: number, b: number): Promise<number> {
  return new Promise((resolve) => {
    delay(1000).then(() => {
      resolve(a + b)
    })
  });
}

export {
  add,
  addAsync,
}
