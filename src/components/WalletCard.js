import { ethers } from 'ethers';
import React from 'react'
import {useState} from 'react'

const WalletCard = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null)
    const [connectButtonText, setconnectButtonText] = useState('Connect Wallet');

    const connectWalletHandler = () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(result => {
                accountChangeHandler(result[0]);
            })
        } else setErrorMessage('Install metamask')
    }
    const accountChangeHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount.toString());
    }
    const getUserBalance = (address) => {
        window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] })
        .then(balance => {
            setUserBalance(ethers.utils.formatEther(balance));
        })
    }
    window.ethereum.on('accountsChanged', accountChangeHandler);

    return (
        <div className="walletCard">
            <h4> {"Connection to metamask using window.ethereum"} </h4>
                <button onClick={connectWalletHandler}> {connectButtonText} </button>
                <div className="accountDisplay">
                    <h3> Address: { defaultAccount } </h3>
                </div>
                <div className="balanceDisplay">
                    <h3> Balance: { userBalance } </h3>
                </div>
                { errorMessage }
        </div>
    )
}

export default WalletCard
