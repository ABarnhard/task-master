Task Master
=========
### Code Badges
[![Build Status](https://travis-ci.org/ABarnhard/task-master.svg)](https://travis-ci.org/ABarnhard/task-master)
[![Coverage Status](https://coveralls.io/repos/ABarnhard/task-master/badge.png)](https://coveralls.io/r/ABarnhard/task-master)

### About
Task Master is is a simple To Do list manager built on MongoDB and Node. It is a massive upgrade from Task Manager, 
however we still won't allow you to delete tasks. That's just how we roll.
### Models
```
Priority
--------------
name
color
value
--------------
-.collection
--------------
#save
--------------
.all
.findById
```

```
Task
--------------
name
due
photo
isComplete
tags
priorityId
--------------
-.collection
--------------
#save
--------------
.update
.findById
.count
.find3
```

### Features
- Object Oriented
- MVC
- TDD
- Mocha
- MongoDB
- Jade
- Express

### Running Tests
```bash
$ npm install
$ npm test
```

### Contributors
- [Adam Barnhard](https://github.com/abarnhard)
- [Mikey Badr](https://github.com/mfbadr)

### License
[MIT](LICENSE)
