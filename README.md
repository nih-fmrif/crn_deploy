# CRN - Docker Deployment

This repository contains a docker configuration setup to build the full CRN stack. This includes:
- [bids-core](https://github.com/poldracklab/bids-core)
- [crn-app](https://github.com/poldracklab/crn_appmongodb.com - MongoDB Official Site‎)
- [crn-server](https://github.com/poldracklab/crn_server)
- [mongodb](https://www.mongodb.com/)
- [nginx](https://nginx.org/)

## Configuration

You must configure the system by copying `config.env.example` to `config.env` and `.env` to `.env.example` and filling in any empty values. Other values may be modified, but changes to the defaults could cause issues. Below is a list of descriptions of each variable.

### config.env

| variable                            | description                                             |
|-------------------------------------|---------------------------------------------------------|
| SCITRAN_URL                         | The url where SciTran is listening                      |
| SCITRAN_RUNTIME_PORT                | The Port SciTran will listen on                         |
| SCITRAN_CORE_DRONE_SECRET           | A secret string shared between this service and SciTran |
| SCITRAN_PERSISTENT_DATA_PATH        | The file system location of SciTran's data store        |
| SCITRAN_PERSISTENT_DB_URI           | The URI to the mongo database SciTran will use          |
| SCITRAN_AUTH_CLIENT_ID              | The OAuth client ID used to authenticate w/ SciTran     |
| SCITRAN_AUTH_ID_ENDPOINT            | The OAuth ID endpoint of the auth provider              |
| SCITRAN_AUTH_VERIFY_ENDPOINT        | The OAuth verify endpoint of the auth provider          |
|                                     |                                                         |
| CRN_SERVER_URL                      | The url where this service is listening                 |
|                                     |                                                         |
| CRN_SERVER_AGAVE_URL                | The root url to the AGAVE API                           |
| CRN_SERVER_AGAVE_USERNAME           | An AGAVE API username                                   |
| CRN_SERVER_AGAVE_PASSWORD           | The corresponding AGAVE API password                    |
| CRN_SERVER_AGAVE_CLIENT_NAME        | The name of a registered AGAVE client                   |
| CRN_SERVER_AGAVE_CLIENT_DESCRIPTION | The description of the AGAVE client                     |
| CRN_SERVER_AGAVE_CONSUMER_KEY       | The AGAVE client API key                                |
| CRN_SERVER_AGAVE_CONSUMER_SECRET    | The AGAVE client API secret                             |
| CRN_SERVER_AGAVE_STORAGE            | The root path of the associated AGAVE storage system    |
| CRN_SERVER_MAIL_SERVICE             | The name of the mail service for email notifications    |
| CRN_SERVER_MAIL_USER                | The username for the mail service                       |
| CRN_SERVER_MAIL_PASS                | The password for the mail service                       |

### .env

| variable                            | description                                             |
|-------------------------------------|---------------------------------------------------------|
| CRN_BRANCH                          | The branch to build the CRN server and app from         |
| PERSISTENT_DIR                      | The local directory to mount persistent data to         |
| SFTP_USER                           | The local user used for SFTP authentication             |


If you would like to be able to expose datasets over SFTP to AGAVE you must ensure your `BIDS_CORE_PERSISTENT_DIR` and `CRN_SERVER_PERSISTENT_DIR` are accessible as AGAVE storage systems.
- `/srv/bids-core/persistent/data`
- `/srv/crn-server/persistent`

## Usage

To build the CRN stack you must first install [docker](https://www.docker.com/). Once you've updated the configuration, from the root of this project you can run `docker-compose build` to build all of the containers. This may take a while. Once your containers are built you can run `docker-compose up` and the application will be available at the localhost's port 80.

## CircleCI integration
- E2E tests need 4-5 minutes to run

### Configuration files used

#### config.env
- See config.env.example

### Required environment variables to set in CircleCI
| variable                            | description                                                            |
|-------------------------------------|------------------------------------------------------------------------|
| DOCKER_USER                         | Docker Hub username where the private docker images are stored         |
| DOCKER_PASS                         | Docker Hub password                                                    |
| NODE_ENV                            | Has to be "staging"                                                    |
| PERSISTENT_DIR                      | Use "~/crn_data" - temporary library during CircleCI build             |
| CRN_APP_TAG                         | Use "latest" - crn_app docker image tag to test                                       |
| CRN_SERVER_TAG                      | Use "latest" - crn_server docker image tag to test                                    |
| BIDS_CORE_TAG                       | Use "latest" - bids_core docker image tag to test                                    |

### Used Docker Hub images for testing
- ${DOCKER_USER}/bids_core:${BIDS_CORE_TAG}
- ${DOCKER_USER}/crn_app:${CRN_APP_TAG}
- ${DOCKER_USER}/crn_server:${CRN_SERVER_TAG}
