// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC20, SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// Hata durumlarını tanımlamak için kullanılan özel hata mesajları
error StartInPast(); // Başlangıç zamanı geçmiş durumda
error AlreadyClaimed(); // Daha önce talep edilmiş
error InvalidProof(); // Geçersiz Merkle ağacı ispatı
error NotInClaimWindow(); // Talep penceresi dışında

contract Airdrop is Ownable {
    using SafeERC20 for IERC20;

    // Değişkenlerin tanımlanması
    address public immutable token; // Dağıtılacak tokenın adresi
    bytes32 public root; // Merkle ağacının kökü
    uint256 public start; // Dağıtımın başlangıç zamanı
    uint256 public duration; // Dağıtımın süresi
    uint256 public distributed; // Dağıtılan toplam token miktarı
    mapping(address => uint256) public history; // Adreslerin dağıtımdan aldığı miktarlar
    uint256 public count; // Toplam adres sayısı
    mapping(uint256 => uint256) private claimed; // Talep edilmiş adreslerin kaydedildiği bit dizisi

    event Claimed(uint256 index, address account, uint256 amount);

    // Kurucu fonksiyon, sözleşme oluşturulurken çağrılır
    constructor(address _token, address _owner) Ownable(_owner) {
        token = _token;
    }

    // Güncelleme fonksiyonu, sahibin kök ve zamanı güncellemesine izin verir
    function update(
        bytes32 _root,
        uint256 _start,
        uint256 _duration
    ) public onlyOwner {
        if (_start <= block.timestamp) revert StartInPast(); // Başlangıç zamanı geçmiş mi kontrolü
        root = _root;
        start = _start;
        duration = _duration;
    }

    // Talep edilmiş bir indeksin işaretlenip işaretlenmediğini kontrol eder
    function isClaimed(uint256 index) public view returns (bool) {
        uint256 rowIndex = index / 256;
        uint256 colIndex = index % 256;
        uint256 row = claimed[rowIndex];
        uint256 mask = (1 << colIndex);
        return row & mask == mask;
    }

    // İşaretlenmiş bir indeksi ayarlar
    function _setClaimed(uint256 index) private {
        uint256 rowIndex = index / 256;
        uint256 colIndex = index % 256;
        claimed[rowIndex] = claimed[rowIndex] | (1 << colIndex);
    }

    // Hava atışı tokenlarını talep etmek için kullanılan fonksiyon
    function claim(
        uint256 index,
        uint256 amount,
        bytes32[] calldata proofs
    ) public {
        if (isClaimed(index)) revert AlreadyClaimed(); // Daha önce talep edilmiş mi kontrolü
        if (start == 0 || block.timestamp < start) revert NotInClaimWindow(); // Talep penceresi kontrolü
        if (block.timestamp > start + duration) revert NotInClaimWindow(); // Talep penceresi kontrolü
        if (distributed + amount > IERC20(token).balanceOf(address(this)))
            revert NotInClaimWindow(); // Dağıtımın bakiyesi kontrolü

        // Merkle ağacı ispatını doğrulama
        bytes32 leaf = keccak256(
            abi.encode(index, msg.sender, amount)
        );
        if (!MerkleProof.verify(proofs, root, leaf)) revert InvalidProof();

        // Talep edildi olarak işaretle ve tokenları gönder
        _setClaimed(index);
        IERC20(token).safeTransfer(msg.sender, amount);

        // İlk defa talep edenlerin sayısını artır
        if (history[msg.sender] == 0) {
            count++;
        }
        history[msg.sender] += amount;
        distributed += amount;
        emit Claimed(index, msg.sender, amount);
    }

    // Fonksiyon airdrop süresi dolana kadar tokenları geri çekmeyi sağlar
    // function withdraw() external onlyOwner {
    //     if (block.timestamp < start + duration) revert NoWithdrawDuringClaim();
    //     IERC20(token).safeTransfer(
    //         msg.sender,
    //         IERC20(token).balanceOf(address(this))
    //     );
    // }
}
