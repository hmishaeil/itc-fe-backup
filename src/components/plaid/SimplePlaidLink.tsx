import React, { useCallback, useState } from 'react';

import { usePlaidLink, PlaidLinkOnSuccess } from 'react-plaid-link';

//
const beUrl = process.env.REACT_APP_ITC_API_ENDPOINT

const SimplePlaidLink = () => {
    const [token, setLinkToken] = useState<string | null>(null);

    // get link_token from your server when component mounts
    React.useEffect(() => {
        const createLinkToken = async () => {

            const response = await fetch(beUrl + "/p/create-link-token", { method: 'POST' });
            const { link_token } = await response.json();
            setLinkToken(link_token);
        };
        createLinkToken();
    }, []);


    const onSuccess = useCallback<PlaidLinkOnSuccess>((publicToken, metadata) => {
        // send public_token to your server
        // https://plaid.com/docs/api/tokens/#token-exchange-flow

        // public token and account id
        console.log(publicToken, metadata);

        const exchangePublicToken = async (metadata) => {
            await fetch(beUrl + "/p/exchange-public-token?token=" + publicToken + "&id=" + metadata.account.id, { method: 'POST' });
        };
        exchangePublicToken(metadata);
    }, []);

    const { open, ready } = usePlaidLink({
        token,
        onSuccess,
        // onEvent
        // onExit
    });

    return (
        <button onClick={() => open()} disabled={!ready}>
            Connect a bank account
        </button>
    );
};

export default SimplePlaidLink;