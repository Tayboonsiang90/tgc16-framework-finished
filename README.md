If you wish to continue from this checkpoint, you have to do the following.

1. At the terminal, run `yarn install`

2. Create the database user `foo` with the password `bar` (follow the lab 6 for this step).

3. Create your `.env` file and fill in the values below:

```
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_UPLOAD_PRESET=
DB_DRIVER=mysql
DB_USER=foo
DB_PASSWORD=bar
DB_DATABASE=organic
DB_HOST=localhost
SESSION_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_SUCCESS_URL=
STRIPE_CANCELLED_URL=
STRIPE_ENDPOINT_SECRET=
TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

4. Run migrations with `./db-migrate.sh up`