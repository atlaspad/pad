pragma solidity ^0.8.19;
import "@mina-devnet/mina-verification-rust/contracts/MinaVerifier.sol";

contract APCampaignOracle {
    // _address APCampaign contract
    address public apCampaignAddress;

    // Merkle root of the tree containing method identifiers (hashes)
    bytes32 public merkleRoot; // will update merkle.js


    constructor(address _apCampaignAddress) {
        apCampaignAddress = _apCampaignAddress;
    }

    // Function to submit a Merkle proof and method identifier (hash) for verification
    function verifyMethod(bytes32[] calldata proof, bytes32 methodHash) public view returns (bool) {
        return MinaVerifier.verifyMerkleProof(merkleRoot, proof, methodHash);
    }

    // Function to update the Merkle root with a new set of method identifiers (hashes)
    // This should be called by a trusted entity off-chain after generating the Merkle tree
    function updateMerkleRoot(bytes32 newRoot) public onlyOwner {
        merkleRoot = newRoot;
    }

    // Restrict updateMerkleRoot function to owner (consider multi-sig for added security)
    modifier onlyOwner() {
        require(msg.sender == tx.origin, "Only owner can update Merkle root");
        _;
    }
}
