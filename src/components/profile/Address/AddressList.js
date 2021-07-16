import React from 'react'
import AddressItem from './AddressItem'

function AddressList({addresses}) {
    return (
        <div>
            {addresses.map((address,index)=>
                <AddressItem key={index} address={address}/>
            )}
        </div>
    )
}

export default AddressList
