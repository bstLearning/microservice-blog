
    Follow tutorial of Microservices with Node JS and React in Udemy.

    Just a taste of microservice. !! NOT FOR PRODUCTION !!


# Architechure
## Front-End components
```mermaid
graph TD
    A[App] --> B[PostList]
    A[App] --> C[PostCreate]
    B --> D[CommentList]
    B --> E[CommentCreate]
```

## Back-End services 
```mermaid
graph LR
    subgraph Services
    A[Posts Service 4000]
    B[Comments Service 4001]
    C[Query Service 4002]
    end
    subgraph Event
    D[Event Bus]
    end
    A --> |create|D
    B --> |create| D
    D -.-> |event|A & B & C 
    E(Client) --> |fetch data|C
```

# Notes


## Redundent http request if seperated services
From commits w/ message "Add component comment-list", you can see that every time client page rendered, it request posts services once, and comments 3 times.

Ref the RESTful logic:
- GET: /posts
- GET: /posts/:id/comments 

### Strategy 1: monolith app. 
Conbine posts service and comments servince into one mono service.

Change the RESTful logic:
- GET: /posts
- GET: /posts?comments=true


### Strategy 2: micorservices w/ Sync communication (BAD)

```mermaid
graph TD
    A[Client] -->|GET: /post?comments=true| B[Post Service]
    B --> |give me all comments for posts w/ ID's 37, 5, 72 ...| C[Comments Service]
```

Cons:
- Introduce a dependency btw services
- If any inter-service request fails, the overall request fails
- The entire request is only as fast as the slowest request
- Can easily introduce webs of requests, which exagerate those 3 earlier problems

### Strategy 3: microservices w/ Async communication
```mermaid
graph LR
    A[Client] --> |emit event|D{Event Broker}
    B[Post Service] ---> |emit event|D
    C[Query Service] === |efficient data structure |D
```

Pros
- Query Service has zero dependencies on other services!
  - Meaning that event if others services is dead, your client react app works still!
- Query Service will be extremely fast!

Cons
- Data duplication
- Harder to understand
