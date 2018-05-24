## Simple JS/Node Developer Challenge

### Goal
Clone this repo and build a simple dictionary key/value store script using only core NodeAPI and ECMAScript 5 or 6.  
Store the key/value dictionary using filesystem.
The client should be a standalone terminal tool.
Commit and track your work history in a new GitLab repo. Once finished email the link to your repo.

### Store Commands

`$ node store.js add mykey myvalue`

`$ node store.js list`

`$ node store.js get mykey`

`$ node store.js remove mykey`

`$ node store.js clear`

### Bonus

- Write clean, modular and testable code.
- Instead of running `node store.js` alter the runtime so it can be run as `./store`.
- Add ability to deploy in Docker container.
- Add GitLab compatible CI/CD to perform a server deploy.