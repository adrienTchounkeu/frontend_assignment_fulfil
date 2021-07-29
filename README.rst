Fronted API FULFIL.IO Assignment
================================


|Node-Versions| |axios-Version| |socketIO-Version|

``Frontend API FULFIL.IO Assignment`` is a Vue Frontend API that displays the views of the Fulfil.IO Assignment

--------------------------------------

.. contents:: Table of contents
   :backlinks: top
   :local:

Technologies used and Why ?
---------------------------

To resolve this problem, we have used ``vuejs``, ``axios`` ,and ``socketIO``.

* ``vuejs``: among the best javascript web frameworks.
* ``axios``: great module to send request.
* ``socketIO``: receive socket messages from the server. It's an alternative of SSE, not correctly working with Django Backend.


Installation
------------

To run my Frontend solution, you must have ``node``, and ``npm`` installed in your system

Download the project from GitHub
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To clone my code, run the command below in the CLI

.. code:: sh

    git clone "https://github.com/adrienTchounkeu/frontend_assignment_fulfil.git"

You can also download the project by clicking the link `Frontend_assignment_fulfil <https://github.com/adrienTchounkeu/frontend_assignment_fulfil.git>`_


Install Dependencies
~~~~~~~~~~~~~~~~~~~~~

After downloading the code, open the CLI in the root directory and execute the command :

.. code:: sh

   npm install


NB: *"package.json is a file which contains all the project dependencies"*

After all the project dependencies are installed, run the command

.. code:: sh

   npm run serve

NB: *The server generally starts on the port 8080*



Heroku Deploy and Backend app
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Frontend API is available through the link `https://frontend-assignment-fulfil.herokuapp.com <https://frontend-assignment-fulfil.herokuapp.com>`_

Backend App
############

* The Frontend communicate with the Backend app, written in Django. You can access through the link `Backend_assignment_fulfil <https://github.com/adrienTchounkeu/backend_assignment_fulfil.git>`_


Analyzing The Solution
----------------------

Before starting coding, we have to understand the problem and think of the solution. We have structured our project as follow :

* Two checkboxes to handle the create and update webhooks
* An Input File form to upload the csv files
* Forms to create, update a product, search and filter products
* Buttons for list of products and to delete products
* A Table to display the list of product

*NB :* You can see the view through the heroku link above

Solving ``Frontend API FULFIL.IO Assignment``
-------------------------------------------

Assumptions
~~~~~~~~~~~

To solve the problem, we did some hypothesis:

* No design implemented for our solution.

Solution
~~~~~~~~~~~

My solution is working perfectly !

Tests
~~~~~

*No tests* were done to test the components.


.. |Node-Versions| image:: https://img.shields.io/npm/v/node?label=node&logo=node   :alt: Node Version
.. |axios-Version| image:: https://img.shields.io/npm/v/axios?label=axios
.. |socketIO-Version| image:: https://img.shields.io/npm/v/socket.io?label=socket.io
