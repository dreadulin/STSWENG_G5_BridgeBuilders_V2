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
Once you run this command, the code automatically inserts data.

## .env file
*test-builder* needs its own .env file. Below is the template.

```
MONGODB_URI = mongodb+srv://<username>:<password>@bridgebase-db.ztsxd.mongodb.net/<database name>?retryWrites=true&w=majority&appName=bridgebase-db
CHILD_COUNT = # Number of children to be generated
DELETE_DATA = # 1 - delete existing data
              # 0 - do not delete existing data. The new data will append on top of the existing data instead of replacing them

NUM_LABELS = # Number of labels
NUM_STATS = # Number of stats
NUM_FAMILIES = # Number of families

OLDEST_YEAR = # For generating range of years from OLDEST_YEAR to current year
                   # e.g. [2021, 2022, 2023, 2024]
                   # This is for child.date and stat.date
```

## Change the number of children
You can change the number of children to be generated.
This also affects the number of parents. The number of siblings
per child is randomized.

```
// make-data.js

13| const childCount = 5; // <--- change this to any number
```

## Change the name of the database
The name of the database is in the `<database name>` of your MongoDB URI in the `.env`.
