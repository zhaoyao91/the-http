# Motivation

Why yet another HTTP toolkit? We already have [express](https://expressjs.com/), [koa](http://koajs.com/), 
[micro](https://github.com/zeit/micro), and [node http](https://nodejs.org/docs/latest-v8.x/api/http.html), but all of 
them apply a side-effect handling model, say, user handles the request by manipulating the response object. This is 
neither intuitive nor convenient, because it doesn't match the http request-response (RR) handling model, which is just 
a simple function: 

```
async (request) => response
```

By applying such a model, handling http request becomes straight forward. Extending the handler also becomes simple and 
easy, with no magic, by just composing wrappers, as what 
[recompose](https://github.com/acdlite/recompose) do to React.
