import os
import pytest
from utils import assert_revert, set_block_timestamp, assert_event_emitted

CONTRACT_FILE = os.path.join("contracts", "s_place.cairo")
VALID_NR = 3
pytest.user_address = 100
X = 99

@pytest.fixture(scope="session")
async def contract(starknet):
    return await starknet.deploy(source=CONTRACT_FILE,)
  
@pytest.fixture
async def user_address(starknet):
    # We start at 300 to avoid having to take into account the case where the user hassn't play yet == ( 0+300 <= 0)
    set_block_timestamp(starknet.state.state, 301) 
    pytest.user_address += 1
    return pytest.user_address 
  
@pytest.mark.asyncio
async def test_view_get_player_timeleft_player_didnt_play(contract, user_address):
    execution_info = await contract.view_get_player_timeleft(user_address).invoke()
    assert execution_info.result.timestamp == 0

@pytest.mark.asyncio
async def test_view_total_amount_of_batches(contract):
    execution_info = await contract.view_total_number_of_felt().invoke()
    assert execution_info.result.total_number_of_felt == 111


@pytest.mark.asyncio
@pytest.mark.parametrize("offset, batch_size, response",[
    (0, 10, 610),
    (0, 100, 6100),
    (100, 100, 6100),
])
async def test_view_get_board(contract, offset, batch_size, response):
    execution_info = await contract.view_get_board(offset, batch_size).invoke()
    assert len(execution_info.result.arr) == response


@pytest.mark.asyncio
@pytest.mark.parametrize("time_to_wait, response",[
    (0, 300),
    (10, 290),
    (150, 150),
    (210, 90),
    (300, 0),
    (400, 0),
])
async def test_view_get_player_timeleft_player_play(starknet, contract, user_address, time_to_wait,response):
    await contract.play(VALID_NR, VALID_NR, VALID_NR).invoke(caller_address=user_address)
    set_block_timestamp(starknet.state.state, 301 + time_to_wait) 
    execution_info = await contract.view_get_player_timeleft(user_address).invoke()
    assert execution_info.result.timestamp == response

@pytest.mark.asyncio
@pytest.mark.parametrize("x, y, offset, position",[
    (0, 0, 0, 0), # First position
    (10, 0, 0, 10),
    (60, 0, 0, 60),
    (61, 0, 1, 0),
    (119, 0, 1, 58),
    (0, 1, 1, 59),
    (1, 1, 1, 60),
    (2, 1, 2, 0),
    (2, 2, 3, 59),
    (119, 55, 110, 9), # Last position
])
async def test_play(contract, user_address, x, y, offset, position):
    await contract.play(x, y, VALID_NR).invoke(caller_address=user_address)
    execution_info = await contract.view_get_board(offset, 1).invoke()
    assert len(execution_info.result.arr) == 61
    print(execution_info.result.arr)
    assert execution_info.result.arr[position] == VALID_NR

@pytest.mark.asyncio
@pytest.mark.parametrize("x, y, position",[
    (0, 0, 0), # First position
    (10, 0, 10),
    (60, 0, 60),
    (61, 0, 61),
    (119, 0, 119),
    (0, 1, 120),
    (1, 1, 121),
    (2, 1, 122),
    (2, 2, 242)
])
async def test_play_without_offset(contract, user_address, x, y, position):
    await contract.play(x, y, VALID_NR).invoke(caller_address=user_address)
    execution_info = await contract.view_get_board(0, 4).invoke()
    assert len(execution_info.result.arr) == 244
    print(execution_info.result.arr)
    assert execution_info.result.arr[position] == VALID_NR


@pytest.mark.asyncio
@pytest.mark.parametrize("x, y, position",[
    (61, 0, 0),
    (119, 0, 58),
    (0, 1, 59),
    (1, 1, 60),
    (2, 1, 61),
    (2, 2, 181)
])
async def test_play_offset_1(contract, user_address, x, y, position):
    await contract.play(x, y, VALID_NR).invoke(caller_address=user_address)
    execution_info = await contract.view_get_board(1, 3).invoke()
    assert len(execution_info.result.arr) == 183
    print(execution_info.result.arr)
    assert execution_info.result.arr[position] == VALID_NR

    
@pytest.mark.asyncio
async def test_play_event(contract, user_address):
    execution_info = await contract.play(VALID_NR-1, VALID_NR+1, VALID_NR).invoke(caller_address=user_address)
    assert_event_emitted(execution_info, contract.contract_address, "PlayerPlayedAt", [user_address, VALID_NR-1, VALID_NR+1,VALID_NR])

@pytest.mark.asyncio
async def test_play_zero_address(contract):
    await assert_revert(contract.play(VALID_NR,VALID_NR,VALID_NR).invoke(), "Invalid address: zero address")


@pytest.mark.asyncio
async def test_play_color_invalid(contract):
    await assert_revert(contract.play(VALID_NR,VALID_NR,256).invoke(), "Invalid color: out of bounds")


@pytest.mark.asyncio
async def test_play_x_invalid(contract):
    await assert_revert(contract.play(120,VALID_NR,VALID_NR).invoke(), "Invalid x: out of bounds")

@pytest.mark.asyncio
async def test_play_y_invalid(contract):
    await assert_revert(contract.play(VALID_NR,56,VALID_NR).invoke(), "Invalid y: out of bounds")
