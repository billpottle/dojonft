# dojonft
A NFT generator for Marital Arts Schools (and anyone else!)

It's easy to run the tool locally, just clone the repo and run 

```
npm install
```
and then 

```
npm start
```

# Welcome to Dojo NFT!

If I give you one dollar, and you give me back one dollar, we are **EXACTLY** even, because every dollar is exactly the same as every other. This property is called being _fungible_.

**Non-Fungible Tokens (NFTs)**, on the other hand, represent anything unique. For instance, you cannot switch one student's belt rank certificate with that of another student. The properties that make belt certificates non-fungible include the name, date, and rank.

NFTs have been taking the world by storm, and unlock tremendous possibilities, but also require coding skills where the market demand currently far outstrips the supply. Thus, I have created this tool to allow martial arts schools (and others) to be able to create their own NFT collections and badges with absolutely no coding required.

Potential use cases for NFTs include issuing verifiable **rank certificates**, issuing badges to people who attended certain **events**, someone who is the **demo team captain**, instructor or **student of the month**, **full splits club**, **25 gold medal club**, promotional materials, **"Founding Member, new location"**, coupons that cannot be forged/reused, etc.

---

## How Does it Work?

Although you can view this site on mobile, this is a tool designed for desktop browsers.

There are three main items. Each school will organize all of their NFTs in a **Collection**. Each collection will have several **Badges**. Then, each of those badges can be used to mint individual **Tokens**. For example:

| **Collection**          | **Badges**                                  | **Tokens (NFTs)**                                      |
|--------------------------|---------------------------------------------|-------------------------------------------------------|
| **Name:** Cobra Cai Dojo | Badge 1 - All Valley Tournament Competitor  | Token 0 - Johnny Lawrence Badge-1                     |
| **Symbol:** COB          | Badge 2 - All Valley Tournament Champion   | Token 1 - Miguel Diaz Badge-1                         |
|                          | Badge 3 - December 1984 Perfect Attendance | Token 2 - Johnny Lawrence Badge-2                     |
|                          | Badge 4 - 1st Dan Black Belt               | Token 3 - Johnny Lawrence Badge-2                     |
|                          | Badge 5 - 2 Weeks Free Classes             | Token 4 - Miguel Diaz Badge-2                         |
|                          |                                             | Token 5 - Johnny Lawrence Badge-3                     |
|                          |                                             | Token 6 - Johnny Lawrence Badge-4                     |
|                          |                                             | Token 7 - Jane Smith Badge-5                          |

You don’t have to keep track of token IDs; they will increment automatically. One badge can be awarded multiple times to the same person, as Lawrence won the **All Valley Tournament** in 82 and 83. 

Here is some more information about each item type:

---

### **Collection**
- A collection has an **owner** (the initial creator) who can create and change badges as well as add and remove staff and award tokens. 
- Staff are optional, and they can create badges and award tokens (NFTs).

---

### **Badges**
- A badge has an **image or animation** as well as a **title**.
- You may include any other attributes for a badge that you wish.

---

### **Tokens (NFTs)**
- A token has an **owner**, an **ID** (automatically assigned), and a **badge type** that it is set when created.
- It then inherits the image, title, and other attributes from its badge type.
