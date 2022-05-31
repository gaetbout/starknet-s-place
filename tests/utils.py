
from starkware.starkware_utils.error_handling import StarkException
from starkware.starknet.business_logic.state.state import BlockInfo
from starkware.starknet.business_logic.execution.objects import Event
from starkware.starknet.public.abi import get_selector_from_name

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
        block_number=starknet_state.block_info.block_number, block_timestamp=block_timestamp, gas_price=starknet_state.block_info.gas_price)

def assert_event_emitted(tx_exec_info, from_address, name, data):
    assert Event(
        from_address=from_address,
        keys=[get_selector_from_name(name)],
        data=data,
    ) in tx_exec_info.raw_events
