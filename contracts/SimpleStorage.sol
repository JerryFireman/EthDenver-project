pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  uint storedData;

  event LogSet(address sender, uint newValue);

  function set(uint x) public {
    storedData = x;
    emit LogSet(msg.sender, x);
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
