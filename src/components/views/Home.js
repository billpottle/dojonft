import React from "react";

const Home = () => {
  return (
    <>
      <div className="ui  container" style={{ backgroundColor: "black" }}>
        <div className="ui center aligned inverted huge header title">
          Welcome to Dojo NFT!
        </div>

        <div className="ui segment info-segment">
          <p>
            If I give you one dollar, and you give me back one dollar, we are{" "}
            <b>EXACTLY</b> even, because every dollar is exactly the same as
            every other. This property is called being <b>fungible.</b>
          </p>

          <p>
            Non Fungible Tokens (NFTs), on the other hand represent anything
            <b> unique</b>. For instance, you cannot switch one student's belt
            rank certificate with that of another student. The properties that
            make belt certificates non-fungible include the name, date, and
            rank.
          </p>
          <p>
            {" "}
            <b>NFTs</b> have been taking the world by storm, and unlock
            trememdous possibilities, but also require coding skills where the
            market demand currently far outstrips the supply. Thus, I have
            created this tool to allow martial arts schools (and others) to be
            able to create their own NFT collections and badges with absolutely
            no coding required.{" "}
          </p>
          <p>
            {" "}
            Potential use cases for NFTs include issuing verifiable{" "}
            <b>rank certificates</b>, issuing badges to people who attended
            certain <b>events</b>, someone who is the <b>demo team captain</b>,
            instructor or <b> student of the month</b>, <b>full splits club</b>,{" "}
            <b>25 gold medal club</b>, promotional materials,
            <b>"Founding Member, new location"</b>, coupons that cannot be
            forged/reused, etc.
          </p>
        </div>
        <div className="ui segment info-segment">
          <h4>How does it Work?</h4>
          <p>
                      Although you can view this site on mobile, this is a tool designed for desktop browsers. </p>
                  <p>
                      There are three main items. Each school will organize all of their
            NFTs in a <b>Collection. </b> Each collection will have several{" "}
            <b>Badges</b>. Then, each of those badges can be used to mint
            individual <b>Tokens</b>. For example:{" "}
          </p>
          <table className="ui celled table">
            <thead>
              <tr>
                <th>Collection</th>
                <th>Badges</th>
                <th>Tokens (NFTs)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Collection">
                  <div>
                    <b>Name: </b> Cobra Cai Dojo
                  </div>
                  <div>
                    <b>Symbol: </b> COB
                  </div>
                </td>
                <td data-label="Badges">
                  <div>Badge 1 - All Valley Tournament Competitor</div>
                  <div>Badge 2 - All Valley Tournament Champion</div>
                  <div>Badge 3 - December 1984 Perfect Attendance</div>
                  <div>Badge 4 - 1st Dan Black Belt</div>
                  <div> Badge 5 - 2 Weeks Free Classes </div>
                </td>
                <td data-label="Tokens">
                  <div>Token 0 - Johnny Lawrence Badge-1 </div>
                  <div>Token 1 - Miguel Diaz Badge-1 </div>
                  <div>Token 2 - Johnny Lawrence Badge-2 </div>
                  <div>Token 3 - Johnny Lawrence Badge-2 </div>
                  <div>Token 4 - Miguel Diaz Badge-2 </div>
                  <div>Token 5 - Johnny Lawrence Badge-3</div>
                  <div>Token 6 - Johnny Lawrence Badge-4</div>
                  <div>Token 7 - Jane Smith Badge-5</div>
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            You don't have to keep track of token ids, they will increment
            automatically. One badge can be awarded multiple times to the same
            person, as Lawrence{" "}
            <a href="https://thekaratekid.fandom.com/wiki/All_Valley_Karate_Tournament">
              won the All Valley Tournament in 82 and 83.
            </a>{" "}
            Here is some more information about each item type{" "}
          </p>
          <table className="ui celled table">
            <thead>
              <tr>
                <th>Collection</th>
                <th>Badges</th>
                <th>Tokens (NFTs)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Collection">
                  A collection has an <b>owner</b> (the initial creator) who can
                  create and change badges as well as add and remove
                  <b> staff</b> and award tokens. Staff are optional, and they
                  can create badges and award tokens (NFTs)
                </td>
                <td data-label="Badges">
                  A badge has an image or animation as well as a title. You may
                  include any other attributes for a badge that you wish.
                </td>
                <td data-label="Tokens">
                  A token has an <b>owner</b>, an id (automatically assigned)
                  and a badge type that it is set when it is created. It then
                  inherits the image, title, and other attributes from its badge
                  type.
                </td>
              </tr>
            </tbody>
          </table>
          <h4>What are the fees?</h4>
          <p>
            Rather than use this tool to make a for-profit company, I decided to
            release it as a free and open source public good. The only fees you
            will pay will be the fees for the blockchain to mint and store your
            NFTs. However, if you want to show your appreciation, I do accept
            donations (and cool NFTs!) at <b>dojonft.eth</b>. As of 1/2021,
            creating a new collection costs about 25 cents, adding badges about
            6 cents, and issuing NFTs about 2 cents each.
          </p>
          <h4>What can my students do with their NFTs?</h4>
          <p>
            They <b>really</b> own them, and can do with them whatever they wish
            including trading them on Opensea, transfering them to friends,
            fractionalizing them, burn them, take out a loan against them, etc.
            Who knows? This space moves faster than any one person can keep up
            with.{" "}
          </p>
          <p>
            Because these NFTs follow the ERC721 standard, they will
            automatically be displayed in compatible wallets, marketplaces,
            games, metaverse worlds, etc.
          </p>
          <h4>Are NFTs bad for the environment?</h4>
          <p>
            This debate has come up because Ethereum is currently using Proof of
            Work until around June 2022. However, the NFTs generated by this
            tool are on Polygon, an environmentally friendly and inexpensive
            Ethereum sidechain.{" "}
          </p>
          <h4>What do I need to get started?</h4>
          <p>
            You will need a desktop computer and the <b>metamask</b>{" "}
            <a href="https://metamask.io"> https://www.metamask.io </a> wallet
            which is a browser extension for Chrome and other browsers. Make sure your metamask account is connected to Polygon. You will
            also need a way to <b>pin</b> images to the Interplanetary File
            System (IPFS). An easy and free way is to get an account at
            <a href="https://www.pinata.cloud"> https://www.pinata.cloud </a>.
            Finally, you will need maybe <b>$5 worth of Matic tokens</b> on the
            Polygon network. If you have an account with Crypto.com you can buy
            this with a credit card, and then withdraw the tokens to your
            metamask address. (Make sure to withdraw to the polygon network)
          </p>
          <h4>What do my students need to get started?</h4>
          <p>
            Your students only need to provide you with their Ethereum address.
            They do NOT need to fund the address with anything. They do not need
            any account on any exchange, credit card, id documents, etc. They
            can just create the account for free in metamask. It's also recommended for
            privacy purposes that students create a NEW address only for
            collecting NFTs from your school. For instance, if someone was the
            'student of the month' and used his regular address, then others
            would be able to know his transaction history or balance. They will
            only need to put some matic in their address if they ever want to
            transfer the NFT or sell it.
          </p>
          <h4>
            What is the rarity of each token and is the total supply limited?
          </h4>
          <p>
            As the owner of the collection, you (and staff you designate) are
            100% responsible for determining this. The only NFTs that can exist
            in the collection are those you issue. Similarly, there is no
            maximum supply of tokens.
          </p>
          <p>
            {" "}
            Keep in mind that you could also create multiple collections if you
            think that this will help with organization or value. For instance,
            one collection for promotional NFTs like <i>'2 weeks free'</i>, one
            collection for <i>'rank certifications'</i>, one for{" "}
            <i>'event attendance' </i>
            etc.
          </p>
          <h4>I like most of this but I want to change something</h4>
          <p>
                      The code is open source and free for you to use for any purpose!
            Fork the project at the <a href="https://github.com/billpottle/dojonft">github repo page</a>
          </p>
          <p>
            {" "}
            I am also happy to accept pull requests if you make the project
            better in any way.
          </p>
          <h4>What if something goes wrong? </h4>
          <p>
            This tool is made to be easy to use, but you are still using
            cutting-edge technology. The following steps can help solve most
            issues:
          </p>
          <p>
            1. If you are having trouble loading something, try refreshing the
            browser.
          </p>
          <p>
            2. Make sure you are logged in to metamask and connected to the
            site. Make sure metamask is connected to Polygon. There should be a
            green 'logged in' button with the first few digits of your address
            in the upper right corner
          </p>
          <p>
            3. Metamask will usually choose the correct gas price. However, it's
            possible that if there is a surge of activity right before you mint,
            your transactions may take a while to go through. You can wait or
            click 'speed up.' To see the current gas prices on Polygon, check
            out this{" "}
            <a href="https://polygonscan.com/gastracker"> Gas Tracker.</a>
          </p>{" "}
          <p>
            4. You can open the browser console to see helpful debug messages{" "}
          </p>
          <p>
            5. This site itself is also hosted on IPFS, so no need to worry
            about it ever disappearing! You can also copy the code and build
            locally for 100% confidence in what it is doing.
          </p>
          <p>
            6. If you still have any problems, please open an issue on github.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
