import React, { useState, useEffect } from 'react';




const TXConfirming = () => {


    return (
            <div class="ui segment">
                <div class="ui active inverted dimmer">
                    <div class="ui text loader">Please wait while the blockchain is confirming your transaction</div>
                </div>
                <p>You can check your metamask history or a block explorer to see progress</p>
            </div>
    );
};

export default TXConfirming;