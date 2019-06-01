[![Build Status](https://travis-ci.com/RafaelAPB/GCE-NEIIST.svg?token=XFiDrRAqvqphcoasyH7N&branch=master)](https://travis-ci.com/RafaelAPB/GCE-NEIIST)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

# GCE-NEIIST webapp
![GCE-Thesis][logo]

[logo]: https://web.ist.utl.pt/~ist180970/assets/img/favicon.png
[GCE-NEIIST][GCE] is the home for our student's group, Grupo de Contacto com Empresas.

This platform aims to provide services for [Técnico Lisboa](www.tecnico.ulisboa.pt) students, such as:
* Informative service about the group.
* Events sign up (i.e. programming competitions, open-days)
* GCE-Inside View: A project that shows different careers on Computer Science and Engineering.
* GCE-Thesis: Using AI to classify MEIC masters' theses proposals. We provide a simple and intuitive interface to navigate through them.
* Mr Thesis: a friendly chatbot, complementary to GCE-Thesis, that helps student to find a suitable thesis for themselves.

Note that this is a **WIP** project, and it is on alpha phase.

---

####
## Setup and Run
1. Fork the project (for more info see [Fork, Clone, Remote](https://github.com/GCE-NEIIST/GCE-NEIIST-webapp/wiki/Fork,-Clone,-Remote))

2. Set the backend environment variables, by duplicating .env.example (home directory of the project). Rename it to .env and set its values.
This step includes the configuration of [Mlab][mlab]
3. Set the frontend environment variables, by duplicating angular-src/.scripts/set-env.env.example. Rename it to set-env.env, and set its values.
### Run the App

In order to run the project the required libraries need to be installed.

1. Install [node][node].

2. On the home directory of the project, run ```npm run first-setup```.

3. If you wish, [follow our recommendations](https://github.com/GCE-NEIIST/GCE-NEIIST-webapp/wiki/Recommendations).
1. In case of errors, see our  [Troubleshooting page](https://github.com/GCE-NEIIST/GCE-NEIIST-webapp/wiki/Troubleshooting).

## Running the server
1. Go to the main directory and run ``npm run start`` or ``nodemon gce_base``. 
1. To access the user interface, open a browser (Chrome is recommended) and go to ``localhost:8080``.




### Run Tests

To run the tests, run ``npm test``.

# Contributing
If you are wondering if you should contribute, this is a  [fine reading][open-source].

Please read our [Contribution Guidelines](https://github.com/GCE-NEIIST/GCE-NEIIST-webapp/blob/master/.github/CONTRIBUTING.md).
Please follow our [Commit Message Style Guide](https://github.com/GCE-NEIIST/GCE-NEIIST-webapp/wiki/Commit-Message-Style-Guide) while sending Pull Requests.

If you want to report bugs or requests features, open an issue, with the respective label.



### A list of contributors (add yourself if you wish)

+ Rafael Belchior, [GCE][GCE]

+ Daniel Ramos,[GCE][GCE]

+ Inês Sequeira,[GCE][GCE]

+ Jorge Heleno, [GCE][GCE]



---

# Branches

The repository has the following permanent branches:

``master`` This contains the production code which has been released.

``develop`` This contains the latest stable code. 
**All the contributing Pull Requests must be sent to this branch**. When we want to release the next version of the app, this branch is merged into the master branch.

# License
This is a WIP, and it is covered by the MIT license. 

You acknowledge and agree that we don't take any responsability of the outcome 
from the usage of this code.
For more information, read [LICENSE.md][license].

# Contact
You can reach GCE's team @gce on [our Discord channel](https://discordapp.com/channels/485382921872605205/485382921872605207)

Alternatively, feel free to contact us using the feedback form at <a href="https://gce-neiist.org">gce-neiist.org</a>.
# Code of Conduct
We follow [Convenant Code Of Conduct][CC].

[fenix]: http://fenixedu.org/dev/api/
[python]: https://www.python.org/
[GCE]: https://gce-neiist.org/
[npm]: https://npmjs.org/
[travis]: https://travis-ci.org/
[contributing]: https://github.com/RafaelAPB/GCE-Thesis/blob/master/CONTRIBUTING.md
[license]: https://github.com/RafaelAPB/GCE-Thesis/blob/master/LICENSE.md
[nodemon]: https://nodemon.io/
[open-source]: https://opensource.guide/how-to-contribute/
[CC]: https://www.contributor-covenant.org/version/1/4/code-of-conduct.html
[compass]: https://www.mongodb.com/products/compass
[postman]: https://www.getpostman.com/
[web]: https://www.jetbrains.com/webstorm/
[node]: http://nodejs.org/
[angular]: https://angular.io/
[express]: https://expressjs.com/
[mon]: http://www.mongodb.org/
[mlab]: https://docs.mlab.com/

