const { expect } = require("chai");

const _1e18 = ethers.constants.WeiPerEther

describe("ibBTC", function() {
    before('setup contracts', async function() {
        ;([alice, childChainManager] = (await ethers.getSigners()).map(a => a.address))

        const [ ProxyAdmin, TransparentUpgradeableProxy, ibBTC ] = await Promise.all([
        ethers.getContractFactory('ProxyAdmin'),
        ethers.getContractFactory('TransparentUpgradeableProxy'),
        ethers.getContractFactory('ibBTC')
        ])

        const proxyAdmin = await ProxyAdmin.deploy()
        const _ibbtc = await ibBTC.deploy()
        const args = [
            _ibbtc.address,
            proxyAdmin.address,
            _ibbtc.interface.encodeFunctionData('initialize', [ 'Interest-Bearing BTC', 'ibBTC', 18, childChainManager ])
        ]
        ibbtc = await TransparentUpgradeableProxy.deploy(...args)
        ibbtc = await ethers.getContractAt('ibBTC', ibbtc.address)
    })

    it('deposit', async function() {
        depositAmount = _1e18.mul(9)
        const depositData = web3.eth.abi.encodeParameter('uint', depositAmount)
        await ibbtc.connect(ethers.provider.getSigner(childChainManager)).deposit(alice, depositData)
        expect(await ibbtc.balanceOf(alice)).to.eq(depositAmount)
    })

    it('withdraw', async function() {
        const withdrawAmount = _1e18.mul(5)
        await ibbtc.withdraw(withdrawAmount)
        expect(await ibbtc.balanceOf(alice)).to.eq(depositAmount.sub(withdrawAmount))
    })
});
