import * as React from 'react'
import HookToast from '../toast/HookToast'

// * 合约
import Web3 from 'web3'
import ProBtn from '../ProBtn/ProBtn'
 import deployedContracts from './contracts/abi.json'
const account1 = '0xAF1A014725E003Ac2FA44Dbcb16ef5dcb86c5761'
const account2 = '0x701d28a1bf21b68cf60922530d70145f7bbf65f2'
const fromAddress = account1 // 账户地址

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3' // 合约地址
// const contractAddress = "0xD8f85c61F8a46BCE90403982964a761D3712abC0"; // 合约地址
// const contractAddress = "0x5a4360219bBB2603d4Fac96D2b59631da036C3ff"; // 合约地址
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545/'))
const getContract = async () => {
  try {
    // const res = await fetch('./HelloToken.json').then((resp) => resp.json())
    const res = deployedContracts
    console.log('res.abi--', res.abi)
    console.log('contractAddress--', contractAddress)
    console.log('fromAddress--', fromAddress)
    console.log('res', res)
    // const contract = new web3.eth.Contract((res as any).abi, contractAddress, {
    //   from: fromAddress,
    // })
    // var nonceCnt = await web3.eth.getTransactionCount(fromAddress)
    // console.log(`num transactions so far: ${nonceCnt}`)
    // return { contract, nonceCnt }
  } catch (error) {
    HookToast((error as any).toString())
  }
}/* */
export default function Contract() {
  const [Result, setResult] = React.useState('')
  const getContractHandle = async () => {
    const res = await getContract()
    // if (res) {
    //   const { contract } = res
    //   contract.methods
    //     .purpose()
    //     .call()
    //     .then((result: any) => {
    //       setResult(result)
    //     })
    // }
  }
  return (
    <>
    <div>123123</div>
      <h3>contract</h3>
      <h4>{Result}</h4>
      <ProBtn onClick={getContractHandle}>获取合约</ProBtn>
    </>
  )
}
