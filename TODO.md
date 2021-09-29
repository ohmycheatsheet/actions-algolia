- [x] query issue

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

- [ ] query all

```graphql
query Issues($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    issues(first: 20, states: OPEN, after:"Y3Vyc29yOnYyOpHOJHR-bw==") {
      edges {
        cursor
        node {
          id,
          number
          title,
          body,
          createdAt,
          updatedAt,
          state,
          labels(last: 10) {
            edges {
              node {
                id,
                color,
                description,
                name,
                createdAt,
                updatedAt
              }
            }
          }
        }
      },
      pageInfo {
        endCursor,
        hasNextPage
      }
    }
  }
}
```


- [x] upload to algolia