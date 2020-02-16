# DAOmocracy

## About Project

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

### 3Box

### Web3

## Features

## Applications


