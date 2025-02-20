**Edit a file, create a new file, and clone from Bitbucket in under 2 minutes**


## Clone a repository

Use these steps to clone from SourceTree, our client for using the repository command-line free. Cloning allows you to work on your files locally. If you don't yet have SourceTree, [download and install first](https://www.sourcetreeapp.com/). If you prefer to clone from the command line, see [Clone a repository](https://confluence.atlassian.com/x/4whODQ).

1. You’ll see the clone button under the **Source** heading. Click that button.
2. Now click **Check out in SourceTree**. You may need to create a SourceTree account or log in.
3. When you see the **Clone New** dialog in SourceTree, update the destination path and name if you’d like to and then click **Clone**.
4. Open the directory you just created to see your repository’s files.

Now that you're more familiar with your Bitbucket repository, go ahead and add a new file locally. You can [push your change back to Bitbucket with SourceTree](https://confluence.atlassian.com/x/iqyBMg), or you can [add, commit,](https://confluence.atlassian.com/x/8QhODQ) and [push from the command line](https://confluence.atlassian.com/x/NQ0zDQ).

## Dependencies

 1. Make sure that your  Node Version >= 14.0.0 and npm Verision >= 5.6
 2. Current Node version used while creating the application is v16.14.0 
    and npm version 8.3.1.
 3. After checking these dependencies, you can clone the repo from the bitbucket.
 4. After successful cloning, just navigate to the root folder which contains package.json and execute the command npm install (npm i as well).
 5. If all the dependencies are followed correctly it will be installed successfully, if not try this command npm i --legacy-peer-deps. This is automatically decrepts the 
    installed dependencies and keeps the way clear for opening the project.

## Developer Instructions 

 1. npm start is the command for hosting the app in local environment.
 2. package.json is the base file, where you find all tha packages.
 3. Inorder to change the API endpoint, check the .env file which includes the variables to change the end point URL.

## Build Instructions

  1. We have created various environment based files in the code base, which include the following.
  2. .env.gritwell-client.qa --- this will contain the base url and API Url to be pointed for the QA enviroment.
  3. .env.gritwell-client.stage --- this will contain the base url and API Url to be pointed for the Stage enviroment.
  4. .env.gritwell-client.production --- this will contain the base url and API Url to be pointed for the Production enviroment.
  5. Inorder to create a specific environment build, we need to follow these commands.
     ... npm run build:qa  ===> creates a build for QA environment based on the URls in .env.gritwell-client.qa file
     ... npm run build:stage  ===> creates a build for Stage environment based on the URls in .env.gritwell-client.stage file
     ... npm run build:prod  ===> creates a build for Production environment based on the URls in .env.gritwell-client.production file
  6. Successful builds can be deployed in server. The above commands helps in doing them.   
    
