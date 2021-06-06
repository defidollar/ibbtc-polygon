require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-web3')
require('hardhat-spdx-license-identifier')

const PRIVATE_KEY = `0x${process.env.PRIVATE_KEY || 'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'}`

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.6.12",
    networks: {
        polygon: {
            url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
            chainId: 137,
            gasPrice: 1000000000, // 1 gwei
            accounts: [ PRIVATE_KEY ]
        }
    },
    mocha: {
        timeout: 0
    },
    spdxLicenseIdentifier: {
        runOnCompile: true
    }
};
