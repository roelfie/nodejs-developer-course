Jest looks in the folder tests/__mocks__ for mocks.

If you require('mymodule') in your SUT, 
by adding a file __mocks__/mymodule.js
Jest will ensure that the mock is loaded 
instead of the real npm module

If your module is of the name 'company/mod'
you will have to create a mock as follows:
__mocks__/company/mod.js

