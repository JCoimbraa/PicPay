let number_page = "";
Cypress.Commands.add('create_user', (token, name, email, gender, status) => {
    cy.request({
        method: 'POST',
        url: Cypress.config('baseUrl'),
        failOnStatusCode: false,
        headers: {
            'Authorization': token,
            'content-type': 'application/json'
        },
        body:
        {
            "name": name,
            "email": email,
            "gender": gender,
            "status": status
        }
    })
})

Cypress.Commands.add('list_all_user', (token) => {
    cy.request({
        method: 'GET',
        url: Cypress.config('baseUrl') + `?page=${number_page}`,
        failOnStatusCode: false,
        headers: {
            'Authorization': token,
            'content-type': 'application/json'
        }
    })
})

Cypress.Commands.add('list_all_user_pagination', (token) => {
    cy.request({
        method: 'GET',
        url: Cypress.config('baseUrl'),
        failOnStatusCode: false,
        headers: {
            'Authorization': token,
            'content-type': 'application/json'
        }
    }).then((response) => {
        number_page = response.body.meta.pagination.pages
    });
})

Cypress.Commands.add('edit_user', (token, name_edit, id) => {
    cy.request({
        method: 'PUT',
        url: Cypress.config('baseUrl') + "/" + id,
        failOnStatusCode: false,
        headers: {
            'Authorization': token,
            'content-type': 'application/json'
        },
        body:
        {
            "name": name_edit,
        }
    })
})

Cypress.Commands.add('list_one_user', (token, id) => {
    cy.request({
        method: 'GET',
        url: Cypress.config('baseUrl') + "/" + id,
        failOnStatusCode: false,
        headers: {
            'Authorization': token,
            'content-type': 'application/json'
        }
    })
})

Cypress.Commands.add('del_user', (token, id) => {
    cy.request({
        method: 'DELETE',
        url: Cypress.config('baseUrl') + "/" + id,
        failOnStatusCode: false,
        headers: {
            'Authorization': token,
            'content-type': 'application/json'
        }
    })
})