import loginPage from '../pages/Login'
import mapPage from '../pages/Map'


Cypress.Commands.add('uiLogin', (user) => {
    loginPage.go('-23.70726255913845', '-46.849767460084436')
    loginPage.form(user)
    loginPage.submit()

    mapPage.loggedUser(user.name)
})

Cypress.Commands.add('setGeolocation', (lat, long) => {
    localStorage.setItem('qtruck:latitude', lat)
    localStorage.setItem('qtruck:longitude', long)
})