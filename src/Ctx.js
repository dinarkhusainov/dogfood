import React from 'react'

export default React.createContext({
    user: {},
    token: "",
    api: {},

    setUser: () => {},
    setToken: () => {},
    setApi: () => {},
    modalActive: false, 
    setModalActive: () => {},
    products: [], 
    setProducts: () => {},
    visibleProducts: [],
    setVisibleProducts: () => {},
    cart: [],
    setCart: () => {},

});