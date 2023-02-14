class Api {
    constructor(token) {
        this.path = "https://api.react-learning.ru";
        this.group = "sm8";
        this.token = token;
    }
    signUp(body) { 
        body.group = this.group;
        return fetch(`${this.path}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
    signIn(body) { 
        return fetch(`${this.path}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
    getProducts() {
        return fetch(`${this.path}/products`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    getProduct(id) {
        return fetch(`${this.path}/products/${id}`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    addProduct(body) {
        return fetch(`${this.path}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }
    delProduct(id) {
        return fetch(`${this.path}/products/${id}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    setLike(id, isLike) {
        return fetch(`${this.path}/products/likes/${id}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    updUser(body, img = false) {
        return fetch(`${this.path}/v2/${this.group}/users/me${img ? "/avatar" : ""}`, {
            method: "PATCH",
            headers: {
                "authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    addReview(id, body) {
        return fetch(`${this.path}/products/review/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }

    delReview(id, idReview) {
        return fetch(`${this.path}/products/review/${id}/${idReview}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }

    getUsers() {
        return fetch(`${this.path}/users`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
}

export {Api};