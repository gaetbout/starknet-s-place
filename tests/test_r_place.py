import os
import pytest
from utils import assert_revert, set_block_timestamp

CONTRACT_FILE = os.path.join("contracts", "r_place.cairo")
VALID_NR = 9
pytest.user_address = 100
X = 99

@pytest.fixture(scope="session")
async def contract(starknet):
    return await starknet.deploy(source=CONTRACT_FILE,)
  
@pytest.fixture
async def user_address():
    pytest.user_address += 1
    return pytest.user_address 

  
@pytest.mark.asyncio
async def test_view_get_player_timeleft_player_didnt_play(starknet, contract, user_address):
    set_block_timestamp(starknet.state.state, 301)
    execution_info = await contract.view_get_player_timeleft(user_address).invoke()
    assert execution_info.result.timestamp == 0

@pytest.mark.asyncio
async def test_view_get_player_timeleft_player_play(starknet, contract, user_address):
    # TODO
    set_block_timestamp(starknet.state.state, 301)
    execution_info = await contract.view_get_player_timeleft(user_address).invoke()
    assert execution_info.result.timestamp == 0

@pytest.mark.asyncio
async def test_play_zero_address(contract):
    await assert_revert(contract.play(VALID_NR,VALID_NR,VALID_NR).invoke(), "Invalid address: zero address")


@pytest.mark.asyncio
async def test_play_color_invalid(contract):
    await assert_revert(contract.play(VALID_NR,VALID_NR,256).invoke(), "Invalid color: out of bounds")


@pytest.mark.asyncio
async def test_play_x_invalid(contract):
    await assert_revert(contract.play(100,VALID_NR,VALID_NR).invoke(), "Invalid x: out of bounds")

@pytest.mark.asyncio
async def test_play_y_invalid(contract):
    await assert_revert(contract.play(VALID_NR,100,VALID_NR).invoke(), "Invalid y: out of bounds")
