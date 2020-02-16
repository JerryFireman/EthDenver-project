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

      struct Organization {
        string organizationName;
        mapping(uint => Group) groups;
        mapping(uint => Member) members;
    }

    Organization thisOrganization;
    
    // @dev Sets serviceProvider to the address that instantiated the project
    // @dev Sets the appropriate project details
    // when going back to vscode: string memory organizationName, thisOrganization.name = organizationName

    constructor()
        public
    {
        thisOrganization.organizationName = "Google";
    }
    
    function readOrganizationName() 
    public
    view
    returns(string memory)
    {
        return thisOrganization.organizationName;        
    }
    
    struct Member {
	    string memberName;
	    address memberAddress;
    }

    // @dev Used to track member numbers
    uint public memberIdGenerator = 1;

    function createMember(string memory memberName, address memberAddress)
        public
        returns(uint)
    {
        // require that member address not already belong to a member
        Member storage newMember = thisOrganization.members[memberIdGenerator];
        newMember.memberName = memberName;
        newMember.memberAddress = memberAddress;
        memberIdGenerator++;
        return memberIdGenerator - 1;
    }

    struct Group {
        uint subGroupOf;
        string groupName;
        uint[] membersInGroup;
        uint numberOfMembersInGroup;
    }

    // @dev Used to track group numbers
    uint public groupIdGenerator = 1;
    
    function createGroup(string memory groupName, uint subGroupOf)
        public
        returns(uint)
    {
        Group storage newGroup = thisOrganization.groups[memberIdGenerator];
        newGroup.groupName = groupName;
        newGroup.subGroupOf = subGroupOf;
        groupIdGenerator++;
        return groupIdGenerator - 1;
    }
    
    // @param number of member who will be joining
    // @param number of group that member will join
    function joinGroup(uint memberNumber, uint groupNumber)
    public
    {
        thisOrganization.groups[groupNumber].membersInGroup.push(memberNumber);
        thisOrganization.groups[groupNumber].numberOfMembersInGroup++;
    }

    function readGroup(uint groupNumber)
    public
    view
    returns(uint, uint, string memory, uint) // group number, subGroupOf, group name, number of members in group
    {
        uint subGroupOf = thisOrganization.groups[groupNumber].subGroupOf;
        uint numberOfMembersInGroup = thisOrganization.groups[groupNumber].numberOfMembersInGroup;
        string memory groupName = thisOrganization.groups[groupNumber].groupName;
        return (groupNumber, subGroupOf, groupName, numberOfMembersInGroup);
    }

    function readMember(uint memberNumber)
    public
    view
    returns (uint, string memory, address)
    {
        string memory memberName = thisOrganization.members[memberNumber].memberName;
        address memberAddress = thisOrganization.members[memberNumber].memberAddress;
        return (memberNumber, memberName, memberAddress);
    }
    
    
    function readMemberListInGroup(uint groupNumber)
    public
    view
    returns (uint[] memory)
    {
        uint[] memory membersInGroup = thisOrganization.groups[groupNumber].membersInGroup;
        return(membersInGroup);
    }
    
    struct Vote {
        uint memberNumber;
        bool yesIfTrue;
    }
    
    mapping (uint => Vote) votes;
    
    //return error if member has already voted
    function executeVote(uint memberNumber, bool yesIfTrue)
    public
    {
        votes[memberNumber].memberNumber = memberNumber;
        votes[memberNumber].yesIfTrue = yesIfTrue;
    }
    
    // i think this is not needed in UI, just for testing
    // return error if member has not voted
    function readMemberVote(uint memberNumber)
    public
    view
    returns (bool)
    {
        bool memberVote = votes[memberNumber].yesIfTrue;
        return memberVote;
    }

    // uses for loop to count votes from votes mapping
    // if majority in favor returns true
    // called by splitGroup function
    // i think this is not needed in UI, just for testing
    function countVotes(uint groupNumber)
    public
    view
    returns(bool)
    {
        uint yesVote = 0;
        uint noVote = 0;
        uint[] memory membersInGroup = readMemberListInGroup(groupNumber);
        for (uint i = 0; i < membersInGroup.length; i++) {
            if (readMemberVote(membersInGroup[i]) == true) {
                yesVote++;
            }
            if (readMemberVote(membersInGroup[i]) == false) {
                noVote++;
            }
            
        }
        if (yesVote > noVote) {
            return true;
        } else {
            return false;
        }
    }
      uint[] newOldArray; // state variable needs is global for solidity workaround
    function splitGroup(uint oldGroupNumber, uint[] memory membersToSplit, uint newGroupNumber)
        public
    {
        require(countVotes(oldGroupNumber) == true, "Cannot split group because members have not voted in favor");
        uint[] memory oldArray = thisOrganization.groups[oldGroupNumber].membersInGroup;
        //uint[] memory newArray = thisOrganization.groups[newGroupNumber].membersInGroup;
        //uint[] memory newOldArray; // this array will replace membersInGroup in old group
        bool found = false;
        for (uint i=0; i < oldArray.length; i++) {
            found = false;
            for (uint j=0; j < membersToSplit.length; j++) {
                if (oldArray[i] == membersToSplit[j]) {
                    found = true;
                    break;
                }
            }
            if (found == false) {
                newOldArray.push(oldArray[i]);
            }
        }
        
        thisOrganization.groups[oldGroupNumber].membersInGroup = newOldArray;
        thisOrganization.groups[newGroupNumber].membersInGroup = membersToSplit;
    }

    

}
