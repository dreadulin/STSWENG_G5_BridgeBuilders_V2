# Data Builder
## IMPORTANT
You need to make your own .env file **inside** test-builder,
not in the root directory (STSWENG_G5_BridgeBuilders_V2).

## How to run
*test-builder* is its own NodeJS app, so you need to install
its packages first

```
npm install
```

Then run the command below:

```
npm run build
```
Once you run this command, the code automatically inserts data

```
// .env

MONGODB_URI=<your mongodb uri here>
```

## Change the number of children
You can change the number of children to be generated.
This also affects the number of parents. The number of siblings
per child is randomized.

```
// make-data.js

13| const childCount = 5; // <--- change this to any number
```

## Change the name of the collection 

```
// make-data.js

48| const localDb = mongodb.db("populated-data");
```

