:: Use this if you are using Windows
:: setx.exe does not set the environment variable in the current command prompt, but it will be available in subsequent command prompts.

setx NODE_ENV "development"
setx DB_PRODUCTION "mongodb://<dbuser>:<dbpassword>@<dbid>.mlab.com:63571/gce_base"
setx DB_SECRET "secret"
setx FENIX_CLIENT_ID "id"
setx FENIX_CLIENT_SECRET "secret"
::For example
setx REDIRECT_URL "http://localhost:8080/login/student"
setx REDIRECT_URL_PROF "RedirectURLProfNotSet"

@echo off
set /p DUMMY=Environment variables set. ENTER to continue...
