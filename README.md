# Hydraulik

[![Build Status](https://travis-ci.org/doodzik/hydraulik.svg?branch=master)](https://travis-ci.org/doodzik/hydraulik)
[![Dependencies Status](https://david-dm.org/doodzik/hydraulik.svg)](https://david-dm.org/doodzik/hydraulik)
[![DevDependencies Status](https://david-dm.org/doodzik/hydraulik/dev-status.svg)](https://david-dm.org/doodzik/hydraulik#info=devDependencies)

Hydraulik is an experimental react library for writing state handling components.

# Usage

There is a separate documentation for the [cli] (https://github.com/doodzik/hydraulik-cli) and [types] (https://github.com/doodzik/hydraulik-types) available.

```jsx
import React, { Component }          from 'react'
import { Schema, type, skip, Klass } from 'hydraulik'
import { Str }                       from 'hydraulik-types'

@type(Str, name = 'first_name')
class Users extend Schema {}

var klass = new Klass()
    klass.push(Users)
    klass.push(User)

var users = klass.sets.users,
    user  = klass.sets.user

users.create({ name: 'testName'})
users.create({ name: 'Second' })

// these components automatically listen for changed data
var UserList = users.Component(class {
  render(){
    let Lis = this.params.users.map(user => <li>user.first_name</li>)
    return <ul><Lis /></ul>
  }
}

var UserCreate = users.ComponentError(class {
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
      <UserCreateState />
    )
  }
// ...
```

#Motivation

After writing several apis and single page apps I've got frustrated with repeating myself over and over again. I want to define how my data behaves declaritive. With as little mental overhead as possible.

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

#Test

Hydraulik uses jest for testing. You can run its test by
`$ npm test`.
If it dosn't work try running `$ nvm use` in the hydraulik dir and reinstall the dependencies.

#API
##Schema - Set

###`@type(type: Type, [name = typeName], [preset = null])`

Takes a Type that implement this [interface] (https://github.com/doodzik/hydraulik-types).
The name of the type is the Types name downcased.
You can overwrite the type behavior on an child class.
preset == default value. Only if value null or undefiend.

###`@skip([val: Int])`

@skip() skips as many matches as provided in props.skip. defaults to 0 if params.skip isn't defined
@skip(int) skips as many as are defined for int

if skip is 0 nothing is skiped

###`@limit([val: Int])`

@limit() limits as many matches as provided in props.limit. defaults to 0 if params.limit isn't defined
@limit(int) limits as many as are defined for int

if limit is 0 nothing is limited
if limit is 1 it returns the element without the surrounding array

###`#filter(filterFn: function(val))`

filters the set. FilterFn has to return a boolean. Val is an element of the set. You can access args from outside via val.params. Params from the component

##ObserverSet/ObserverSubset

instances of the ObserverSet/ObserverSubset are stored in the Klass instance variable sets.

###`create(argObj: Object)`

###`update(argObj: Object, query: Object)`

###`destroy(query: Object)`

###`Component(ComposedComponent: Component)`

###`ComponentError(ComposedComponent: Component)`

#Contributing

##[Code of Conduct] (https://github.com/doodzik/hydraulik/blob/master/CODE_OF_CONDUCT.md)

##Issues & Feature Requests

If you encounter a bug, inconsistencies or if anything isn't clear or clear enough open an issue.
If you want a feature. Open an issue and we will discuss it. I'm happy to introduce you to hydraulik's code base.
Feel free to reopen issues and claim unassigned issues for yourself to solve.
The issue doesn't have to be code relatet. If you think that there can be something done with this projects organization open an issue.

##Guide

The source code lives in the src folder.
The master branch is always the last released version. On the development branch is the working code.

###hydraulik.jsx
exports all classes that can be accessible through `import * from 'hydraulik'`

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

###schema-decorators.jsx
decorators for the schema.

###\*-set.jsx
TODO - move to own module
sets provide crud operations and validation for an data table

###setEvents.jsx
The events an observer set listens to.

##Roadmap

1. add a server/websocket set
2. add relations and co-dependent constrains.
3. remove the need to register a schema manually.

#[License] (http://www.gnu.org/licenses/gpl-3.0.en.html)

