import os

import time
import pytest

CONTRACT_FILE = os.path.join("contracts", "storage.cairo")

@pytest.fixture(scope="session")
async def contract(starknet):
    return await starknet.deploy(source=CONTRACT_FILE,)
  
@pytest.mark.asyncio
async def test_view_get_up_to(contract ):
    numbers = []
    print("\nStarting generation")
    print(time.time())
    limit = 1666
    for x in range(limit):
        numbers.append(x)
        await contract.at_put(x, x).invoke()
    print("\nGetting view generation")
    ts1 = time.time()
    print(ts1)
    execution_info = await contract.view_get_up_to(limit).invoke()
    assert execution_info.result.arr == numbers
    print("\nEnd")
    ts2  = time.time()
    print(ts2)
    print ("\nActual elapsed time (s): " + str(ts2 - ts1) )
  
