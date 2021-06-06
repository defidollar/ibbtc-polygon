const childChainManagerProxy = '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa'

async function main() {
    const [ ProxyAdmin, TransparentUpgradeableProxy, ibBTC ] = await Promise.all([
        ethers.getContractFactory('ProxyAdmin'),
        ethers.getContractFactory('TransparentUpgradeableProxy'),
        ethers.getContractFactory('ibBTC')
    ])

    const proxyAdmin = await ProxyAdmin.deploy()
    console.log({ proxyAdmin: proxyAdmin.address })

    const _ibbtc = await ibBTC.deploy()
    console.log({ _ibbtc: _ibbtc.address })

    const args = [
        _ibbtc.address,
        proxyAdmin.address,
        _ibbtc.interface.encodeFunctionData('initialize', [ 'Interest-Bearing BTC', 'ibBTC', 18, childChainManagerProxy ])
    ]
    ibbtc = await TransparentUpgradeableProxy.deploy(...args)
    console.log({ ibbtc: ibbtc.address })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
});

// { proxyAdmin: '0xE449Ca7d10b041255E7e989D158Bee355d8f88d3' }
// { _ibbtc: '0x5BC25f649fc4e26069dDF4cF4010F9f706c23831' }
// { ibbtc: '0x4EaC4c4e9050464067D673102F8E24b2FccEB350' }
