import mapPage from '../support/pages/Map'
import foodtruckPage from '../support/pages/Foodtruck'

describe('Avaliações', () => {
    it('deve enviar uma nova avaliação', () => {

        cy.fixture('review').as('userReview')

        cy.get('@userReview').then((data)=> {
            cy.apiCreateUser(data.user)
            cy.apiLogin(data.user)
            cy.apiCreateFoodTruck(data.foodtruck)

            cy.uiLogin(data.user)

            mapPage.goToFoodtruck(data.foodtruck.name)

            foodtruckPage.addReview(data.review)
            foodtruckPage.reviewShouldBe(data.user, data.review)

        })



        // percorre pelos foodtrucks
        // cy.get('.leaflet-marker-pane img').as('maplist')

        // cy.get('@maplist').each((element, index, list) => {

        //     cy.get('@maplist')
        //         .eq(index)
        //         .click({ force: true })
        //     cy.wait(1000)

        //     cy.get('.leaflet-popup-content').as('ftname')

        //     cy.get('@ftname')
        //         .invoke('text')
        //         .then((txt) => {
        //             cy.log(txt)
        //             if (txt === foodtruck.name) {
        //                 cy.get('@ftname').find('a').click()
        //                 return false
        //             }
        //         })
        // })
        //cy.wait(10000)
    })
})