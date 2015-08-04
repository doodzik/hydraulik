# Hydraulik

[![Build Status](https://travis-ci.org/doodzik/hydraulik.svg?branch=master)](https://travis-ci.org/doodzik/hydraulik)
[![Dependencies Status](https://david-dm.org/doodzik/hydraulik.svg)](https://david-dm.org/doodzik/hydraulik)


Hydraulik is an experimental library for writing state handling React components.
It is based on react and the flux architecture. And of such you should be familiar with both of them to use hydraulik properly.

#Contributing

##[Code of Conduct] (https://github.com/doodzik/hydraulik/blob/master/CODE_OF_CONDUCT.md)

##Issues & Feature Requests

If you encounter a bug, inconsistencies or if anything isn't clear or clear enough open an issue.
If you want a feature open an issue and we will discuss it. I'm happy to introduce you to hydraulik's code base.
Feel free to reopen issues and claim unassigned issues for yourself to solve.

##Guide

The source code lives in the src folder.
Hydraulik uses jest for testing. You can run its test by `$ npm test`.

###hydraulik.jsx
exports all classes that should be accessible through `import * from 'hydraulik'`

###klass.jsx
The [Class] (http://en.wikipedia.org/wiki/Class_(set_theory)) contains all sets.
Builds sets if #sets is called the first time. Build with the klassBuilder.

###klassBuilder.jsx
It makes that the BaseSet and SubSet share the same storage.
Converts sets into observed sets

###observerSet.jsx
inherits from observerSubset and registers new action to the dispatcher

###observerSubset.jsx
The adapter for the different set types.
The user interacts with its methods.

###schema.jsx
The DSL for Hydraulik.

###set.jsx
A set type example that is stores its values in an array structure.
Values arn't persisted in any form.

###setEvents.jsx
The events an observer set listens to.

##Roadmap

The next step for this Project is to provide different Set types. The Set types should implement different storage types and different ways to interact with them.
And to remove the need to register a schema manually.

#Installation

Requirements: [nvm] (https://github.com/creationix/nvm)

```bash
mkdir $projectName
cd $_
npm init
npm install hydraulik-cli --save-dev
(npm bin)/hydraulik init
npm install

# or in one line
mkdir $projectName && cd $_ && npm init && npm install hydraulik-cli --save-dev && (npm bin)/hydraulik init && npm install

```

# Usage

There is a separate documentation for the [cli] (https://github.com/doodzik/hydraulik-cli) and [types] (https://github.com/doodzik/hydraulik-types) available.

```jsx
import React, { Component }          from 'react'
import { Schema, type, skip, Klass } from 'hydraulik'
import { Str }                       from 'hydraulik-types'

@type(Str, name = 'name')
class Users extend Schema {
}

class User extend Users {
    @limit(1)
    @skip()
    filter(user) {
      return super.filter(user) && user.params.name == user.name
    }
}

var klass = new Klass()
    klass.push(Users)
    klass.push(User)

users         = klass.sets.users,
user          = klass.sets.user

users.create({ name: 'testName'})
users.create({ name: 'Second' })

// these components automatically listen for changed data
// and rerender automatically
var UserList = users.Component(class {
  render(){
    var lis = this.params.users.map(user => <li>user.name</li>)
    return <ul>{ lis }</ul>
  }
}

var UserShow = user.Component(class {
  render(){
    return <div>{this.params.user.name}</div>
  }
})

var UserCreateState = users.ComponentError(class UserCreate {
  onClick() {
    users.create({ name: '' })
  }

  render(){
    return (
      <div>
        <span>
          { this.params.users_error.name }
        </span>
        <button onClick={this.onClick} />
      </div>
    )
  }
})

// ...
  render(){
    return (
      <UserList />
      <UserShow name={'testName'} />
      <UserCreateState />
    )
  }
// ...
```
#API
##Schema - Set

###`@type(type: Type, [name = typeName])`

Takes a Type that implement this [interface] (https://github.com/doodzik/hydraulik-types).
The name of the type is the Types name downcased.

###`@skip([val: Int])`

@skip() skips as many matches as provided in props.skip. defaults to 0 if props.skip isn't defined
@skip(int) skips as many as are defined for int

if skip is 0 nothing is skiped

###`@limit([val: Int])`

@limit() limits as many matches as provided in props.limit. defaults to 0 if props.limit isn't defined
@limit(int) limits as many as are defined for int

if limit is 0 nothing is limited
if limit is 1 it returns the element without the surrounding array

###`#filter(filterFn: function(val))`

filters the set. FilterFn has to return a boolean. Val is an element of the set. You can access args from outside via val.params

##ObserverSet/ObserverSubset

instances of the ObserverSet/ObserverSubset are stored in the Klass instance variable sets.

###`create(argObj: Object)`

###`update(query: Object, argObj: Object)`

###`destroy(query: Object)`

###`Component(ComposedComponent: Component)`

###`ComponentError(ComposedComponent: Component)`
