%lang starknet
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.alloc import alloc
from starkware.starknet.common.syscalls import get_caller_address, get_block_timestamp
from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.math import assert_le, assert_not_zero, unsigned_div_rem
from starkware.cairo.common.bool import TRUE

const ELAPSED_TIME = 300  # 5mns
const X_MAX = 99
const Y_MAX = 99
const COLOR_MAX = 255
const MAX_COLOR_PER_FELT = 31

@storage_var
func adress_player_timestamp_storage(address) -> (timestamp):
end

@storage_var
func position_colors_storage(position) -> (colors):
end

@view
func view_get_player_timeleft{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    address
) -> (timestamp):
    alloc_locals
    let (player_last_timestamp) = adress_player_timestamp_storage.read(address)
    let (current_timestamp) = get_block_timestamp()
    let (can_play) = is_le(player_last_timestamp + ELAPSED_TIME, current_timestamp)
    if can_play == TRUE:
        return (0)
    end
    return (player_last_timestamp + ELAPSED_TIME - current_timestamp)
end

@view
func view_get_board{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(params) -> (
    returns
):
    return (res)
end

func view_get_board_recursive{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    params
) -> (returns):
    # TODO FINISH HERE
    return (res)
end

@external
func play{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(x, y, color):
    alloc_locals
    assert_color_valid(color)
    assert_x_valid(x)
    assert_y_valid(y)
    let (caller_address) = get_caller_address()
    assert_player_can_play_valid(caller_address)
    let (current_timestamp) = get_block_timestamp()
    adress_player_timestamp_storage.write(caller_address, current_timestamp)
    let position = (y * Y_MAX) + x
    let (quotient, remainder) = unsigned_div_rem(position, MAX_COLOR_PER_FELT)
    let (current_felt_stored) = position_colors_storage.read(quotient)
    # TODO emit event!
    return ()
end

func assert_color_valid{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(color):
    with_attr error_message("Invalid color: out of bounds"):
        assert_le(color, COLOR_MAX)
    end
    return ()
end

func assert_x_valid{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(x):
    with_attr error_message("Invalid x: out of bounds"):
        assert_le(x, X_MAX)
    end
    return ()
end

func assert_y_valid{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(y):
    with_attr error_message("Invalid y: out of bounds"):
        assert_le(y, Y_MAX)
    end
    return ()
end
func assert_player_can_play_valid{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(address):
    with_attr error_message("Invalid address: zero address"):
        assert_not_zero(address)
    end
    let (player_timeleft) = view_get_player_timeleft(address)
    with_attr error_message("Invalid address: You cannot play yet"):
        assert player_timeleft = 0
    end
    return ()
end
