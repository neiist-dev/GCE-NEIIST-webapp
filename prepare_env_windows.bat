:: Use this if you are using Windows
:: setx.exe does not set the environment variable in the current command prompt, but it will be available in subsequent command prompts.

setx NODE_ENV "development"
setx DB_PRODUCTION "mongodb://localhost:27017/gce_base"
setx DB_SECRET "secret"
setx FENIX_CLIENT_ID "ClientIDNotSet"
setx FENIX_CLIENT_SECRET "ClientSecretNotSet"
setx REDIRECT_URL "RedirectURLNotSet"
setx REDIRECT_URL_PROF "RedirectURLProfNotSet"

@echo off
set /p DUMMY=Environment variables set. ENTER to continue...