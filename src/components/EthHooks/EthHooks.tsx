import * as React from 'react'
import { useContractLoader } from 'eth-hooks'
import useStaticJsonRPC from 'Src/hooks/useStaticJsonRPC'
import deployedContracts from './contracts/hardhat_contracts.json'
import externalContracts from './contracts/external_contracts'
import { TContractLoaderConfig, TEthersProviderOrSigner, TDeployedContractsJson } from 'eth-hooks/models'
export interface IAppProps {}

const NETWORKS = {
  localhost: {
    name: 'localhost',
    color: '#666666',
    chainId: 31337,
    blockExplorer: '',
    rpcUrl: 'http://' + (global.window ? window.location.hostname : 'localhost') + ':8545',
    // rpcUrl: 'http://' + (global.window ? window.location.hostname : 'localhost') + ':8545',
  },
}

export default function EthHooks(props: IAppProps) {
  const targetNetwork = NETWORKS['localhost']
  const localProvider: TEthersProviderOrSigner = useStaticJsonRPC([targetNetwork.rpcUrl])
  const contractConfig: TContractLoaderConfig = {
    customAddresses: { address: 'YourContract' },
    deployedContractsJson: deployedContracts || {},
    externalContracts: externalContracts || {},
  }
  // const contractConfig: TContractLoaderConfig = {
  //   hardhatNetworkName: 'localhost',
  //   // customAddresses: {},
  //   deployedContractsJson: deployedContracts,
  //   externalContracts: externalContracts || {},
  // }
  // const localProvider = useStaticJsonRPC([targetNetwork.rpcUrl])
  console.log('localProvider---', localProvider)
  console.log('contractConfig---', contractConfig)

  const readContracts = useContractLoader(contractConfig, localProvider)
  console.log('readContracts--->', readContracts)

  return (
    <div>
      <h3>use Eth</h3>
    </div>
  )
}
