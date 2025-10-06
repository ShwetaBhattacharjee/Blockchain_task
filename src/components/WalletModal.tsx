import React from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalState, setGlobalState, truncate } from "../store";
import { connectWallet, isMetaMaskInstalled } from "../Blockchain.services";

const WalletModal: React.FC = () => {
  const [walletModal] = useGlobalState("walletModal");
  const [connectedAccount] = useGlobalState("connectedAccount");

  const closeModal = () => {
    setGlobalState("walletModal", "scale-0");
  };

  const handleConnectMetaMask = async () => {
    if (!isMetaMaskInstalled()) {
      alert("MetaMask is not installed. Please install MetaMask extension.");
      window.open("https://metamask.io/download/", "_blank");
      return;
    }
    await connectWallet();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
        justify-center bg-black bg-opacity-50 transform
        transition-transform duration-300 z-50 ${walletModal}`}
    >
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl w-11/12 md:w-96 p-6">
        <div className="flex flex-row justify-between items-center mb-6">
          <h2 className="font-semibold text-gray-900 dark:text-white text-xl">
            {connectedAccount ? "Wallet Connected" : "Connect Wallet"}
          </h2>
          <button
            type="button"
            onClick={closeModal}
            className="border-0 bg-transparent focus:outline-none hover:opacity-70"
          >
            <FaTimes className="text-gray-600 dark:text-gray-400 text-xl" />
          </button>
        </div>

        {connectedAccount ? (
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-sm text-green-800 dark:text-green-200 font-medium mb-2">
                Connected Successfully!
              </p>
              <p className="text-xs text-green-700 dark:text-green-300 font-mono break-all">
                {connectedAccount}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Select a wallet to connect to this dApp
            </p>

            <button
              onClick={handleConnectMetaMask}
              className="w-full flex items-center justify-between bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:border-orange-500 dark:hover:border-orange-500 rounded-lg p-4 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 318.6 318.6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon
                      fill="#E2761B"
                      points="274.1,35.5 174.6,109.4 193,65.8"
                    />
                    <polygon
                      fill="#E4761B"
                      points="44.4,35.5 143.1,110.1 125.6,65.8"
                    />
                    <polygon
                      fill="#E4761B"
                      points="238.3,206.8 211.8,247.4 268.5,263 284.8,207.7"
                    />
                    <polygon
                      fill="#E4761B"
                      points="33.9,207.7 50.1,263 106.8,247.4 80.3,206.8"
                    />
                    <polygon
                      fill="#E4761B"
                      points="103.6,138.2 87.8,162.1 144.1,164.6 142.1,104.1"
                    />
                    <polygon
                      fill="#E4761B"
                      points="214.9,138.2 175.9,103.4 174.6,164.6 230.8,162.1"
                    />
                    <polygon
                      fill="#E4761B"
                      points="106.8,247.4 140.6,230.9 111.4,208.1"
                    />
                    <polygon
                      fill="#E4761B"
                      points="177.9,230.9 211.8,247.4 207.1,208.1"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    MetaMask
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Connect using MetaMask wallet
                  </p>
                </div>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {!isMetaMaskInstalled() && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mt-4">
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  ⚠️ MetaMask not detected. Please{" "}
                  <a
                    href="https://metamask.io/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium hover:text-yellow-900 dark:hover:text-yellow-100"
                  >
                    install MetaMask
                  </a>{" "}
                  to continue.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletModal;
