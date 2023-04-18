# Temis

Framework typescript using express for requests, already set up for routes, middlewares, controllers and logs (./logs folder).

to start the development server run
```
npm run serve.
```

to build to production run
```
npm run build
```

.env file goes inside root folder. If not in .env, default port is 3000.

# Notes

Kernel is the core, which will be in a separate library in future.

For middlewares, follow the example in Middleware/Auth.ts, where the property isGlobal tells the system to load this to every route or not. priority is in ascent order (1 comes before 2).

Later on express will be replaced for http.
