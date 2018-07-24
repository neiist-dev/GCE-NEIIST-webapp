:: Use this if you are using Windows
:: setx.exe does not set the environment variable in the current command prompt, but it will be available in subsequent command prompts.

setx NODE_ENV "development"
setx DB_PRODUCTION "mongodb://localhost:27017/gce_base"
setx DB_SECRET "secret"
setx FENIX_CLIENT_ID "1132965128044599"
setx FENIX_CLIENT_SECRET "laFeZo1LnvOcw7/6yRHPB39aB7t2YhRx2IqR60PpIVJpBlTpOxR8aqFu+qQYmCnKSj43oCy3J1BOTdZ7A2TieA=="
setx REDIRECT_URL "http://localhost:8080/login/student"
setx REDIRECT_URL_PROF "RedirectURLProfNotSet"

@echo off
set /p DUMMY=Environment variables set. ENTER to continue...