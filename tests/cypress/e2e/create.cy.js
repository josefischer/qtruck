import loginPage from '../support/pages/Login'
import mapPage from '../support/pages/Map'
import createPage from '../support/pages/Create'

describe('Recomendação', () => {

    it('deve recomendar um food truck', () => {

        const user = {
            name: 'Benson',
            instagram: '@benson',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-23.706876949318694',
            longitude: '-46.850652488624824',
            name: 'Tienda Del Chavo',
            details: 'O melhor lugar para tomar suco de limão que parece de groselha',
            opening_hours: 'das 14h às 20h',
            open_on_weekends: false
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.createLink()
        createPage.form(foodtruck)
        createPage.submit()
        createPage.modal.haveText('Food truck cadastrado com sucesso!')

    })

    it('não deve cadastrar foodtruck com o nome duplicado', () => {
        //Dado que eu tenho um food truck cadastrado
        const user = {
            name: 'Margaret',
            instagram: '@margaret',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-23.706700126627684',
            longitude: '-46.84986693791227',
            name: 'Churros da Dona Florinda',
            details: 'O melhor churros mexicano da região',
            opening_hours: 'das 15h às 19h',
            open_on_weekends: false
        }

        cy.apiCreateUser(user)
        cy.apiLogin(user)
        cy.apiCreateFoodTruck(foodtruck)

        cy.uiLogin(user)

        //mapPage.createLink()
        //createPage.form(foodtruck)
        //createPage.submit()
        //createPage.modal.haveText('Food truck cadastrado com sucesso!')

        //cy.visit('/map')        

        //Quando tento cadastrar esse food truck de novo

        mapPage.createLink()
        createPage.form(foodtruck)
        createPage.submit()

        //Então devo ver a mensagem de alerta duplicado
        createPage.modal.haveText('Esse food truck já foi cadastrado!')
    })

    it('todos os campos são obrigatórios', () => {
        const user = {
            name: 'Mordacai',
            instagram: '@mordecai',
            password: 'pwd123'
        } 

        const foodtruck = {
            latitude: '-23.706876949318694',
            longitude: '-46.850652488624824'       
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.createLink()
        cy.setGeolocation(foodtruck.latitude, foodtruck.longitude)
        createPage.submit()

        const message = 'Os campos nome, descrição e horário de funcionamento devem ser informados para recomendar um food truck!'
        createPage.modal.haveText(message)


    })
})