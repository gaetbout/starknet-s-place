
from starkware.starkware_utils.error_handling import StarkException
from starkware.starknet.business_logic.state.state import BlockInfo

async def assert_revert(fun, reverted_with=None):
    try:
        await fun
        assert False
    except StarkException as err:
        _, error = err.args
        if reverted_with is not None:
            assert reverted_with in error["message"]


def set_block_timestamp(starknet_state, block_timestamp):
    starknet_state.block_info = BlockInfo(
        starknet_state.block_info.block_number, block_timestamp, starknet_state.block_info.gas_price)