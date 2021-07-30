# QMobility Backend

## Introduction

This backend application was develop using [NestJS](https://nestjs.com)  as main Framework using Typescript as the Language Programming, and also using the following technologies:

* [GraphQL](https://graphql.org/)
  is used as a API Layer to our front end application.
* [TypeORM](https://typeorm.io/#/)
  is used as main Data abtraction layer, like his name say is a Object Relational Mapper.
* [MongoDB](https://www.mongodb.com/)
  is used as a general purpose no relational database.
* [Sendgrid]()
* [Azure Blob Storage]()
  
NestJS works in modules, example of that are the main modules of the application, as we can see in this solution we have the following modules:

1. Auth module, which is responsible for the users authentication.
2. User module, which is responsible for modifications on the users data.
3. Route module, which is responsible for get routes, store routes and all the operations based on that domain.
4. Vehicle module, which is responsible for manage information about the ICE and EVE vehicles.
5. Charger module, which is responsible for manage the information of the chargers who is obtained throught a CRON job who runs in the other application called qmobility-cron. 
6. Common module, which is responsible for the commons methods or helpers methods that we used along the application, example of this module responsabilities are the send email task, upload images, etc.