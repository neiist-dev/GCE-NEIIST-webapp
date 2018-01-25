[![Build Status](https://travis-ci.com/RafaelAPB/GCE-NEIIST.svg?token=XFiDrRAqvqphcoasyH7N&branch=master)](https://travis-ci.com/RafaelAPB/GCE-NEIIST)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

# GCE-NEIIST
![GCE-Thesis][logo]

[logo]: https://groups.ist.utl.pt/~gce-neiist.daemon/assets/gce.png "GCE-Thesis"
The home repository for our student's group, Grupo de Contacto com Empresas, [GCE][GCE]. 
This is a **WIP** project.

## Features
- [X] Informative service about the group.
- [X] Sign-up functionality to programming competitions.

## TODO
- [ ] Interface to navigate through DEI theses
- [ ] Theses' repository per topic (lacks confirmation)

---
####
## Technical Frameworks

### MEAN Stack
MEAN stands for MongoDB, Express.js, Angular (4) and Node.js. All these technologies are open-source. The stack is simply a code and technologies reorganization, migrated from the Linux platform to an execution environment based on JS.

#### Node 

Using [Node.js][node] primarily for the base server component in this version.  is a software platform built on Google’s V8 Javascript engine, designed to build scalable network applications. It makes use of an event-driven, asynchronous, non-blocking I/O model and a single-threaded event loop which allows high throughput and application scalability.

#### Angular

[Angular][angular] is developed and maintained by Google and allows us to modularize our front-end code and minimize development issues.

#### Express

[Express.js][express]is a web framework over Node.js, which allows us to abstract from the HTTP complexity.

#### MongoDB

[MongoDB][mon] grants replication, scalability, high availability and it is document-oriented. A relational database might be found more efficient in which case the data 
layer should be interchangeable.

---

####
## Getting Started

In order to run the project the required libraries need to be installed.

1. Install [node][node].
2. Installation of required [NPM][npm] packages can be installed by running ```npm install``` from the base project directory.
3. Install [MongoDB][mon]. Configure your DB access, by editing ``config/db``
4. (OPTIONAL) When you use node.js libraries that require node.gyp, you need to install [Python][python].
5. On the project main directory, run ```npm install```
6. Configure environment variables:
    1. NODE_ENV = "development" OR "production"
    2. DB_PRODUCTION = [INSER DATABASE PATH]
    2. DB_SECRET = [YOUR DATABASE SECRET]
    3. FENIX_CLIENT_ID = [INSERT VALUE]
    4. FENIX_CLIENT_SECRET = [INSERT VALUE]
    5. REDIRECT_URL = [INSERT VALUE]
    6. REDIRECT_URL_PROF = [INSERT VALUE]
    
    Note: If you wish to integrate your app with FenixEdu, using [FenixApi][Fenix] set variables from 4 to 7.
   
7. Set the appropriate public path on staticRoot, in order index.html to be loaded, if necessary.
8. Rename ``.env.example`` to ``.env``. Set the environment variables for the front end, by editing ``.env``.
9. Go to ``angular-src`` and run ``npm install``. **In case of error, make sure you have set ``.env``**.

OPTIONAL:
1. I recommend installing and using [nodemon][nodemon], in order to reload changes automatically. It's a big time saver.
2. When building the front-end, you can run ``ng build --watch``, in order to reload changes automatically.
3. We use [Travis-CI][travis] to help us achieve continuous testing to our project. Feel free to configure an account there.

## Running the server
1. Go to ``angular/src`` and run ```ng build --watch```. 
2. Go to the main directory and run ``node gce_base`` or ``nodemon gce_base``.

Note that on ``package.json`` (both on the root folder and angular-src)
we are requiring for the lastest version of some packages. If the app does not work, it might be because of 
the version change. Read the documentation and/or changelog of the new version of the package that is causing errors.  

---
#####
# Contributing
If you want to report bugs or requests features, open an issue, with the respective label.

In case of a bug, please always write steps to reproduce the error. That way we can focus on fixing the bug. If you have a fix, read [CONTRIBUTING.md][contributing] and open a Pull Request (follow steps). 

If it is a question about philosophy or similar, feel free to contact me.

### A list of contributors (add yourself if you wish)

+ Rafael Belchior, (project lead), [GCE][GCE]

+ Daniel Ramos, (committer),[GCE][GCE]

+ Inês Sequeira, (committer),[GCE][GCE]

+ Jorge Heleno, [GCE][GCE]

If you are interested in contributing, this is a  [fine reading][open-source].


---

# License
This is a WIP, and it is covered by the MIT license. 

You acknowledge and agree that we don't take any responsability of the outcome 
from the usage of this code.
For more information, read [LICENSE.md][license].

# Contact
Feel free to contact us using the form at <a href="https://groups.ist.utl.pt/gce-neiist/">here</a>.
Alternatively, <a href="mailto:rafael.belchior@tecnico.ulisboa.pt?Subject=Hello%20again" target="_top">send me an e-mail</a>.

# Code of Conduct
We follow [Convenant Code Of Conduct][CC].

[fenix]: http://fenixedu.org/dev/api/
[python]: https://www.python.org/
[GCE]: https://gce-neiist.org/
[node]: http://nodejs.org/
[angular]: https://angular.io/
[express]: https://expressjs.com/
[mon]: http://www.mongodb.org/
[npm]: https://npmjs.org/
[travis]: https://travis-ci.org/
[contributing]: https://github.com/RafaelAPB/GCE-Thesis/blob/master/CONTRIBUTING.md
[license]: https://github.com/RafaelAPB/GCE-Thesis/blob/master/LICENSE.md
[nodemon]: https://nodemon.io/
[open-source]: https://opensource.guide/how-to-contribute/
[CC]: https://www.contributor-covenant.org/version/1/4/code-of-conduct.html