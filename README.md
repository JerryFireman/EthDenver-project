# DAOmocracy

## About Project
DAOmocracy is a platform that makes organizations more democratic by allowing members to determine the structure of their group through voting. Serving as a DAO that has a nested structure which can change over time, it enables companies and non-profits to have digital presences that better reflect the needs and desires of their employees as they adapt and grow. Through providing a flexible structure for groups, DAOmocracy lets workers gain more control and power over how they work and interact together.

## How to Run
```console
foo@bar:~$ ganache-cli
foo@bar:~$ cd ./<DAOmocracy>
foo@bar:DAOmocracy$ truffle compile
foo@bar:DAOmocracy$ truffle migrate
foo@bar:DAOmocracy$ cd client
foo@bar:DAOmocracy/client$ npm install
foo@bar:DAOmocracy/client$ npm start
```

## Technological Overview
### Solidity
```
Migrations.sol
```
The Migrations.sol contract is used by truffle to keep track of network migrations. After running truffle migrate, the contract stores a number correlated to the last applied migration script. 
```
SimpleStorage.sol
```
The SimpleStorage.sol contract provides all of the functionality used to change the structure of a DAO. It contains the following methods that enable token holders to vote on the structure of their organization:
* **createGroup**(string memory groupName, uint subGroupOf)
* **joinGroup**(uint memberNumber, uint groupNumber)
* **executeVote**(uint memberNumber, bool yesIfTrue)
* **readMemberVote**(uint memberNumber)
* **countVotes**(uint groupNumber)
* **splitGroup**(uint oldGroupNumber, uint[] memory membersToSplit, uint newGroupNumber)
### Truffle
Truffle is used to compile and migrate all of the contracts used in the project. This repo was initiated using ```truffle unbox react``` and basic smart contract functionality was first tested using ```truffle test``` with unit tests created to confirm that the functions in SimpleStorage.sol worked properly.
### 3Box

### Web3

## Features

## Applications


