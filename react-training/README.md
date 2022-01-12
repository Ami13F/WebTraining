# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npx create-react-app teams-networking --template typescript`

Project was created with:

### `npm start`

## Typescript vs JavaScript

- has autocomplete
- change types not allowed
  ```
  let str = 'string';
  str = false; //not allowed
  ```
- you have to specify parameter type

  ```
  function test(param: boolean){
    return {
        ready : param
    };
  }

  test(true);
  // if need to be a string can be
   function test(param: boolean | string){...}

   test("true")
  ```
