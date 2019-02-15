:: Use this if you are using Windows
:: setx.exe does not set the environment variable in the current command prompt, but it will be available in subsequent command prompts.

setx NODE_ENV "development"
setx DB_PRODUCTION "mongodb://jptrindade:d6C3KCPqbuTcRyQ@ds263571.mlab.com:63571/gce_base"
setx DB_SECRET "secret"
setx FENIX_CLIENT_ID "1977390058176570"
setx FENIX_CLIENT_SECRET "5fMaQkZjor0x+0VmBSntVx54CbuZf/PYenLziqp3kVYdLmHzzn/cNJkY26avmXVrGjlYZHPOlewBEip4at6plA=="
::For example
setx REDIRECT_URL "http://localhost:8080/login/student"
setx REDIRECT_URL_PROF "RedirectURLProfNotSet"

@echo off
set /p DUMMY=Environment variables set. ENTER to continue...
