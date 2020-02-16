# DAOmocracy
## About Project
DAOmocracy is a platform that makes organizations more democratic by allowing members to determine the structure of their group through voting. Serving as a DAO that has a nested structure which can change over time, it enables companies and non-profits to have digital presences that better reflect the needs and desires of their employees as they adapt and grow. Through providing a flexible structure for groups, DAOmocracy lets workers gain more control and power over how they work and interact together.

## How to Run
```console
foo@bar:~$ ganache-cli
foo@bar:~$ cd ./<EthDenver-project>
foo@bar:EthDenver-project$ truffle compile
foo@bar:EthDenver-project$ truffle migrate
foo@bar:EthDenver-project$ cd client
foo@bar:EthDenver-project/client$ npm install
foo@bar:EthDenver-project/client$ npm start
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
Social interaction between members in DAOs is provided through the integration of the following 3Box plugins:
* Chatbox Plugin
* Profile Hover Plugin
### Web3
The Web3 library is used to get member accounts and instantiate contracts:
```javascript
// Get network provider and web3 instance.
const web3 = await getWeb3();

// Use web3 to get the user's accounts.
const accounts = await web3.eth.getAccounts();

// Get the contract instance.
const networkId = await web3.eth.net.getId();
const deployedNetwork = SimpleStorageContract.networks[networkId];
const instance = new web3.eth.Contract(
	SimpleStorageContract.abi,
	deployedNetwork && deployedNetwork.address
);
```
## Features
* Create, split, and merge groups in DAO
* Permissioned group messaging with 3Box
* Dynamic tree diagram of DAO structures
* Y/N split and merge voting for members
