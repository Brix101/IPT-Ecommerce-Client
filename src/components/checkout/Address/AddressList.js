import React from 'react'
import AddressItem from './AddressItem'

function AddressList({addresses,onChooseClick}) {
    return (
        <div>
            {addresses.map((address,index)=>
                <AddressItem key={index} _address={address} onChooseClick={onChooseClick}/>
            )}
        </div>
    )
}

export default AddressList
