%lang starknet
from starkware.cairo.common.cairo_builtins import HashBuiltin, BitwiseBuiltin
from starkware.cairo.common.alloc import alloc
from starkware.starknet.common.syscalls import get_caller_address, get_block_timestamp
from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.math import assert_le, assert_not_zero, unsigned_div_rem
from starkware.cairo.common.bool import TRUE
from starkware.cairo.common.memcpy import memcpy
from contracts.uint4_packed import view_set_element_at, decompose

const ELAPSED_TIME = 300  # 5mns
const X_MAX = 99
const Y_MAX = 99
const COLOR_MAX = 15
const MAX_COLOR_PER_FELT = 62

@storage_var
func adress_player_timestamp_storage(address) -> (timestamp):
end

@storage_var
func position_colors_storage(position) -> (colors):
end

@event
func PlayerPlayedAt(address, x, y, color):
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
func view_total_number_of_felt{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    ) -> (total_number_of_felt):
    let (total_number_of_felt, _) = unsigned_div_rem(
        ((X_MAX + 1) * (Y_MAX + 1)), MAX_COLOR_PER_FELT
    )
    return (total_number_of_felt + 1)
end

# Had to make an offset/batch because otherwise it takes too much steps
@view
func view_get_board{
    bitwise_ptr : BitwiseBuiltin*, syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(offset, batch_size) -> (arr_len, arr : felt*):
    alloc_locals
    let (local arr : felt*) = alloc()
    return view_get_board_recursive(offset, offset + batch_size, 0, arr)
end

func view_get_board_recursive{
    bitwise_ptr : BitwiseBuiltin*, syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(current_index, loop_max, arr_len, arr : felt*) -> (arr_len, arr : felt*):
    alloc_locals
    if current_index == loop_max:
        return (arr_len, arr)
    end
    let (felt_to_decompose) = position_colors_storage.read(current_index)
    let (arr_current_index_len, arr_current_index) = decompose(felt_to_decompose)
    memcpy(arr + arr_len, arr_current_index, arr_current_index_len)
    return view_get_board_recursive(
        current_index + 1, loop_max, arr_len + arr_current_index_len, arr
    )
end

@external
func play{
    bitwise_ptr : BitwiseBuiltin*, syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(x, y, color):
    alloc_locals
    assert_color_valid(color)
    assert_x_valid(x)
    assert_y_valid(y)
    let (caller_address) = get_caller_address()
    assert_player_can_play_valid(caller_address)
    let (current_timestamp) = get_block_timestamp()
    adress_player_timestamp_storage.write(caller_address, current_timestamp)
    let position = (y * (Y_MAX + 1)) + x
    let (quotient, remainder) = unsigned_div_rem(position, MAX_COLOR_PER_FELT)
    let (current_felt_stored) = position_colors_storage.read(quotient)
    let (new_felt_to_store) = view_set_element_at(current_felt_stored, remainder, color)
    position_colors_storage.write(quotient, new_felt_to_store)
    PlayerPlayedAt.emit(caller_address, x, y, color)
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
