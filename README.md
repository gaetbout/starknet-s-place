# starknet-s-place
![Tests](https://github.com/gaetbout/starknet-s-place/actions/workflows/nile-tests.yml/badge.svg)

# Important note 

This is a Work In Progress and will have to be updated to use: https://github.com/gaetbout/starknet-felt-packing

## Description
Uint128, Uint256, Uint1024. Ok I get it... We  can do big integers.  
But why not going smaller, what about uint8, uint16, ...  

The idea is to store multiple smaller numbers into one felt. A felt is encoded on 252 bits so you'd think that we can use all the bits? Actually we can't because the biggest felt is a prime number, therefore the effective number of bits we can use is 251. And since 251 is a prime number, there will alway be some bit losses... For example if we want to encode numbers going up to 256 (0-255) we'll use 8 bits. Then we have to use an euclidian division to know how much how the felt we can use:  
251 // 8 = quotient=31, remainder=3.  
This means that we'll be able to encode 31 numbers with a leftover of 3 bits that won't be useable.  

To demonstrate this is working I tried to make a simple proof of concept based on the [reddit game: r/place](https://www.reddit.com/r/place/).  
You can find it [here on testnet](https://odd-art-7900.on.fleek.co/), it has been deployed on IPFS through fleek.  
Since I'm no front-end developer I tried my best, but there are few stuff that could be enhanced or reworked (if you want to get involved, don't hesitate to open a PR, or ping me and I'll open some issues).  
It follow the same simple rule which is that a user can put a pixel every 5 minutes. For memory reason, I had to limit the colors to be encoded to 4 bits (which provides 16 colors).  
Therefore it allows to encode:
251 // 4 = quotient=62, remainder=3
62 colors per felt!  
One the current board 120*56 it which makes 6720 coordinates, it is all encoded on 109 felts.

The library is accessible [here](https://github.com/gaetbout/starknet-felt-packing) with some more technical explanation on how I achieved it.

## TODO 
 + More interactions: update timeleft every sec (client side), when play is called: set timer to "currently playing" and already set the tile to the color with some animation, there is an event emitted whenever play is successful
 + Better board ==> could be better done
 + Loading could be done much faster if loading is parallelize and done by chuncks
 + hover square ==> border 
 + have a text explaining the game
 + uncompressed and compressed size? ==> not in the contract
 + Refactoring to use the extensibilty/proxy pattern of OZ  https://github.com/OpenZeppelin/cairo-contracts/blob/main/docs/Extensibility.md
 + Should fix: https://github.com/gaetbout/starknet-s-place/commit/833eb472a3535156c9b4437cced962eecfaacda2 instead of ignore it

## 🌡️ Test

*Prerequisite - Have a working cairo environment.*  
To run the test suite, copy this repository and put yourself at the root.  
Compile the contracts using `make build` or `nile compile`.  
Run the tests using `make test` or, for more details, `pytest -v`.   
For more  details check the Actions tab of this GitHub repository.


## 📄 License

**starknet-s-place** is released under the [MIT](LICENSE).




