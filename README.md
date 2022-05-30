# starknet-r-place
![Tests](https://github.com/gaetbout/starknet-r-place/actions/workflows/nile-tests.yml/badge.svg)

## Description
integer packing, store multiple integer in the same felt.  
I had to make a concession ==> 8 bits ==> 256 colors  
Lib ot handle 10 bits coming later.  
POC to show a use case of it  

## TODO 

 + Description  
 + Decompose meth to have all in 1 array
 + encode all?
 + time until next block that can be put
 + uncompressed and compressed size? ==> not in the contract
 + Refactoring to use the extensibilty/proxy pattern of OZ  https://github.com/OpenZeppelin/cairo-contracts/blob/main/docs/Extensibility.md

## 🌡️ Test

*Prerequisite - Have a working cairo environment.*  
To run the test suite, copy this repository and put yourself at the root.  
Compile the contracts using `make build` or `nile compile`.  
Run the tests using `make test` or, for more details, `pytest -v`.   
For more  details check the Actions tab of this GitHub repository.


## 📄 License

**starknet-r-place** is released under the [MIT](LICENSE).




