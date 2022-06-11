# starknet-s-place
![Tests](https://github.com/gaetbout/starknet-s-place/actions/workflows/nile-tests.yml/badge.svg)

## Description
Uint128, Uint256, Uint1024. Ok I get it... We  can do big integers.  
But why not going smaller?  
What about uint8, uint16, ... 

To demonstrate this is working I tried to make a simple proof of concept based on the [reddit game: r/place](https://www.reddit.com/r/place/).  
It follow the same simple rule which is that a user can put a pixel every 5 minutes. For memory reason, I had to limit the colors to be encoded to 4 bits (which provides 16 colors).  
Therefore it allows to encore 61 colors per felt!  
One the current board 120*56 it which makes 6720 points, it is all encoded on 111 felts.

I should be releasing another library to support uint10, uint16, any uint basically!

## TODO 
 + More interactions: update timeleft every sec (client side), when play is called, set timer to currently playing and already set the tile to the color with animation
 + Better board ==> could be better done
 + hover square ==> border 
 + have a text explaining the game
 + uncompressed and compressed size? ==> not in the contract
 + Refactoring to use the extensibilty/proxy pattern of OZ  https://github.com/OpenZeppelin/cairo-contracts/blob/main/docs/Extensibility.md

## 🌡️ Test

*Prerequisite - Have a working cairo environment.*  
To run the test suite, copy this repository and put yourself at the root.  
Compile the contracts using `make build` or `nile compile`.  
Run the tests using `make test` or, for more details, `pytest -v`.   
For more  details check the Actions tab of this GitHub repository.


## 📄 License

**starknet-s-place** is released under the [MIT](LICENSE).




