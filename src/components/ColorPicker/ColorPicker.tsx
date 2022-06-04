import { useEffect } from 'react'
import EightBitColorPicker from './ColorPickerJS'


export function ColorPicker() {

    useEffect(() => {
        let el = (document.getElementById('colorPicker') as HTMLInputElement)
        var ebcp = new EightBitColorPicker({ el: el, color: 1 })
    }, [])
    return (
        <div>
            <div id="colorPicker"></div>
        </div>
    )
}
