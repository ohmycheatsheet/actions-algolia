- [ ] query issue

```graphql
# Type queries into this side of the screen, and you will 
# see intelligent typeaheads aware of the current GraphQL type schema, 
# live syntax, and validation errors highlighted within the text.

# We'll get you started with a simple query showing your username!
query Issues {
  repository(owner: "spring-projects", name: "spring-boot") {
    issues(last: 3) {
      edges {
        node {
          number
          title
        }
      }
    }
  }
}
```

- [ ] upload to algolia