import React from 'react'

export default React.createContext({
    user: {},
    token: "",
    api: {},
    gds: [],
    setUser: () => {},
    setToken: () => {},
    setApi: () => {},
    modalActive: false, 
    setModalActive: () => {},
    products: [], 
    setProducts: () => {},
    visibleProducts: [],
    setVisibleProducts: () => {},
    basket: [],
    setBasket: () => {},
    favorites: [],
    setFavorites: () => {},
    setGds: () => {},

});