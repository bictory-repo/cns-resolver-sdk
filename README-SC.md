# CNS

## General structure

All registered names are stored in the registry. Registry is a `BictoryStorage` v1 key-value storage contract. Single
domain can resolve to various addresses, that user stores. User is allowed to store unlimited amount of data for each
domain.

Registry security is ensured by only allowing CNS contract to make changes to it.

CNS name ownership is entirely managed by CIS NFT contracts. This way name ownership could be purchased or sold on
NFT marketplace. To ensure that only NFT contracts compatible with CNS are used, only authorized NFT contract
addresses are allowed. Only authorized user is allowed to update compatible CNS NFT contract list.

### Types

```
Address ::= (tag: u8 = 0) (address: AccountAddress)
          | (tag: u8 = 1) (address: ContractAddress)
```

```
AccountAddress ::= (address: u8 * 32)
```

```
ContractAddress ::= (index: u8 * 8) (subindex: u8 * 8)
```

```
Timestamp ::= (milliseconds: u64 as LE)
```

```
DataValue ::= (tag: u8 = 0; Address) (value: Address)
            | (tag: u8 = 1; URL)     (url: String)
            | (tag: u8 = 2; Binary)  (bytes: Bytes)
            | (tag: u8 = 3; String)  (string: String)
```

```
AuthorityField ::= (tag: u8 = 0; Maintainer)
                 | (tag: u8 = 1; Admin)
```

```
AuthorityUpdateKind ::= (tag: u8 = 0; Remove)
                      | (tag: u8 = 1; Add)
```


### Key format

To allow predictable and optimal domain name search, names are hashed before storing them in registry contract.
Function to hash names is called `namehash` and it is identical to ENS. Keccak256 algorithm is used because it provides
smallest execution and binary size overhead in Concordium blockchain, which minimizes energy fees.

#### Algorithm description

1. Split domain names by `'.'`;
2. Reverse resulting list;
3. Hash first element with Keccak256 hashing algorithm;
4. Resulting hash join with next element and apply Keccak256 hashing again;
5. Repeat step 4 until there are no elements left in the list.

Resulting hash can be used as a key in the registry contract.


### Subdomains

Subdomains can be created for personal use, but can not be transfered or traded. This implementation does not mint NFT
tokes for new subdomains.


## User functions

### Function `register`

Full name: `BictoryCns.register`

If given domain name does not exist, create a new registry entry and a new CNS NFT token. CNS NFT token ID is equal to
`namehash(domain)`. Any compatible CNS NFT contract address can be used to update it. Only 1, 2 or 3 year period is
allowed for registration. This period can be extended, but total subscription duration can never exceed 3 years from
current date.

#### Parameters in binary

```
Parameter ::= (domain: String) (address: Address) (duration_years: u8)
```


### Function `extend`

Full name: `BictoryCns.extend`

Extend the subscription duration for given domain. Only 1, 2 or 3 years extension is allowed. Everyone is allowed to
extend subscription period for any domain.

#### Parameters in binary

```
Parameter ::= (domain: String) (duration_years: u8)
```


### Function `setAddress`

Full name: `BictoryCns.setAddress`

Performs NFT ownership check, after that updates the address in the registry.

#### Parameters in binary

```
Parameter ::= (domain: String) (address: Address)
```

#### Events

AddressChanged


### Function `resolve`

Full name: `BictoryCns.resolve`

#### Parameters in binary

```
Parameter ::= (domain: String)
```

#### Return value

```
Result ::= (address: Address)
```


### Function `setData`

Full name: `BictoryCns.setData`

Performs NFT ownership check, after that updates the entry in the registry.

#### Parameters in binary

```
Parameter ::= (domain: String) (key: String) (value: DataValue)
```

#### Events

DataChanged


### Function `getData`

Full name: `BictoryCns.getData`

Gets the data corresponding to the given key from the registry.

#### Parameters in binary

```
Parameter ::= (domain: String) (key: String)
```

#### Return value

```
Result ::= (value: DataValue)
```


### Function `createSubdomain`

Full name: `BictoryCns.createSubdomain`

Can be called by domain owner to create new subdomain. If given subdomain name does not exist, a new registry entry is
created. Subdomains can not be traded or transfered and expire together with the domain.

#### Parameters in binary

```
Parameter ::= (subdomain: String)
```


### Function `name`

Full name: `BictoryCns.name`

Reverse name resolution. Reserved for future implementation.


### Function `setName`

Full name: `BictoryCns.setName`

Set name for reverse name resolution. Reserved for future implementation.


## Admin functions

### Function `updateAuthority`

Full name: `BictoryCns.updateAuthority`

Update admin or maintainer list

#### Parameters in binary

```
Parameter ::= (field: AuthorityField) (update_kind: AuthorityUpdateKind) (address: Address)
```


### Function `updateInternalAddresses`

Full name: `BictoryCns.updateInternalAddresses`

Update CNS NFT, price oracle or beneficiary addresses.

#### Parameters in binary

```
CnsUpdate ::= (tag: u8 = 0; CNS NFT)     (address: ContractAddress)
            | (tag: u8 = 1; oracle)      (address: ContractAddress)
            | (tag: u8 = 2; beneficiary) (address: AccountAddress)

Parameter ::= (field: CnsUpdate)
```
