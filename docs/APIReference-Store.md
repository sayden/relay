---
id: api-reference-relay-store
title: Relay.Store
layout: docs
category: API Reference
permalink: docs/api-reference-relay-store.html
next: interfaces-relay-network-layer
---

The Relay `Store` provides an API for dispatching mutations to the server.

## Overview

*Methods*

<ul class="apiIndex">
  <li>
    <a href="#update-static-method">
      <pre>static update(mutation, callbacks)</pre>
      Initiate processing of a mutation.
    </a>
  </li>
</ul>

## Methods

### update (static method)

```
static update(mutation: RelayMutation, callbacks: {
  onFailure?: (transaction: Transaction) => void;
  onSuccess?: (response: Object) => void;
}): void

// Argument to `onFailure` callback
type Transaction = {
  getError(): ?Error;
}
```

The `update` method is analagous to dispatching an action in Flux. Relay processes
the mutation as follows:

- If the mutation defines an optimistic payload - a set of data to apply locally while waiting for the server response - Relay applies this change and updates any affected React components (note that optimistic updates do not overwrite known server data in the cache).
- If the mutation would not 'collide' (overlap) with other pending mutations - as specified by its `getCollisionKey` implementation - it is sent to the server. If it would conflict, it is enqueued until conflicting mutations have completed.
- When the server response is received, one of the callbacks is invoked:
  - `onSuccess` is called if the mutation succeeded.
  - `onFailure` is called if the mutation failed.


#### Example

```
var onSuccess = () => {
  console.log('Mutation successful!');
};
var onFailure = (transaction) => {
  var error = transaction.getError() || new Error('Mutation failed.');
  console.error(error);
};
var mutation = new MyMutation({...});

Relay.update(mutation, {onFailure, onSuccess});
```
