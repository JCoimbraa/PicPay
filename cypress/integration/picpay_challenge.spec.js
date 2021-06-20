/// <reference types="Cypress" />

describe("PicPay Challenge", () => {

    const token = 'Bearer 2275e2cbbf8dc1d113b25fb018cdb2e07e088b35bb5f7b7c13ca160ed96a82ba';
    const faker = require('faker-br');
    var gender_option = ["Male", "Female"];
    var gender = gender_option[Math.floor(Math.random() * gender_option.length)];
    var status_option = ["Active", "Inactive"];
    var status = status_option[Math.floor(Math.random() * status_option.length)];
    var id = "";

    context('User Creation', () => {

        it('User Creation and List Validation', () => {

            var firstName = faker.name.firstName();
            var lastName = faker.name.lastName();
            name = firstName + " " + lastName
            var email = faker.internet.email();

            cy.create_user(token, name, email, gender, status).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.statusText).to.eq("OK");
                expect(response.body.data.email).to.eq(email);
                expect(response.body.data.name).to.eq(name);
                id = response.body.data.id
            })
            cy.list_all_user_pagination()
            cy.list_all_user(token).then((response) => {
                response.body.data.reverse()
                expect(response.body.data[0]).property('id').to.eq(id);
                expect(response.body.data[0]).property('email').to.eq(email);
                expect(response.body.data[0]).property('name').to.eq(name);
            });
        });
    })

    context('Change User', () => {

        var firstName = faker.name.firstName();
        var lastName = faker.name.lastName();
        name = firstName + " " + lastName
        var email = faker.internet.email();

        beforeEach(() => {

            cy.create_user(token, name, email, gender, status).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.statusText).to.eq("OK");
                expect(response.body.data.email).to.eq(email);
                expect(response.body.data.name).to.eq(name);
                id = response.body.data.id
            })
        })

        it('Change User and List Validation', () => {

            var name_edit = 'Edit Test'

            cy.edit_user(token, name_edit, id).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.statusText).to.eq("OK");
                expect(response.body.data.name).to.eq(name_edit);
            })

            cy.list_one_user(token, id).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.statusText).to.eq("OK");
                expect(response.body.data.name).to.eq(name_edit);
                expect(response.body.data.id).to.eq(id);
            })
        });
    })

    context('Delete User', () => {

        var firstName = faker.name.firstName();
        var lastName = faker.name.lastName();
        name = firstName + " " + lastName
        var email = faker.internet.email();

        beforeEach(() => {

            cy.create_user(token, name, email, gender, status).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.statusText).to.eq("OK");
                expect(response.body.data.email).to.eq(email);
                expect(response.body.data.name).to.eq(name);
                id = response.body.data.id
            })
        })

        it('Delete User and List Validation', () => {

            cy.del_user(token, id).then((response) => {

                expect(response.status).to.equal(200);
                expect(response.body.code).to.equal(204);
            })
            cy.list_all_user_pagination()
            cy.list_all_user(token).then((response) => {
                expect(response.body.data[0]).property('id').not.eq(id);
            });

        });
    })

});