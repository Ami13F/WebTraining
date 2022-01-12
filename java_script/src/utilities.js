export function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.warn("sleep instant");
      resolve();
    }, ms);
  });
}

export function myDefaultStuff() {
  return "hello";
}

export function debounce(fn, delay) {
  let timer;
  return function () {
    const scope = this,
      args = arguments; // take arguments from function
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(scope, args); // or use fn.call(this, ...args)
    }, delay); // call function with delay
  };
}

export function $(selector) {
  return document.querySelector(selector);
}

export function $$(selector) {
  return document.querySelectorAll(selector);
}

// // self invoke anonymus function
// (() => {
//   console.time("sleep");
//   sleep(200).then(() => {
//     console.timeEnd("sleep");
//     console.warn("much better after sleep");
//   });

//   console.time("stringCompute");
//   let str = "";
//   for (let i = 0; i < 500000; i++) {
//     str += "x".toUpperCase() + i.toString().toLowerCase();
//   }
//   console.timeEnd("stringCompute");
//   console.warn("after looong string computations....");
// })();

// (async () => {
//   await sleep(2000); // will execute code after sleep is done
//   console.info("after sleep 2");
// })();
