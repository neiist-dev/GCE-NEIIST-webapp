#Use this if you are using Linux

export NODE_ENV=development
export DB_PRODUCTION=mongodb://<dbuser>:<dbpassword>@ds263571.mlab.com:63571/gce_base
export DB_SECRET=secret
export FENIX_CLIENT_ID=ClientIDNotSet
export FENIX_CLIENT_SECRET=ClientSecretNotSet
export REDIRECT_URL=RedirectURLNotSet
export REDIRECT_URL_PROF=RedirectURLProfNotSet

read -p "Environment variables set. ENTER to continue..."
