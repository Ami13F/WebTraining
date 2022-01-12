export function getConfig(ready: boolean) {
  return {
    x: "json",
    ready: ready
  };
}

const config = getConfig(true);
config.ready = false;

let color: string | number;
color = "green";

type Status = string | number; // custom TYPE

let status: Status;

type Config = {
  name: String;
  x: number;
  ready?: boolean; // optional prop
};

function getConfig2(): Config {
  return {
    name: "Space",
    x: 13
  };
}

const conf = getConfig2();
conf.ready = true;

function add(a: number, b: number | string) {
  // we use many types for param because js doesn't support overloading
  // @ts-ignore //ignore what I'm doing on next line
  return a + b;
}

console.log(add(3, 1));
