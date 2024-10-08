# Data Builder

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

## How to run
```
npm run build
```
