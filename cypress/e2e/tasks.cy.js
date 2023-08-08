///<reference types="cypress"/>
import { faker } from '@faker-js/faker';
const randomName = faker.person.fullName();

describe('tarefas', () => {
  it('deve cadastrar uma nova tarefa', ()=> {
    cy.request({
        url: 'http://localhost:3333/helper/tasks',
        method: 'DELETE',
        body: {name:"Ler um livro"}
    }).then((response)=>{
        expect(response.status).to.eq(204)
    })

    cy.visit('http://localhost:3000')
    cy.get('#newTask')
        .type('Ler um livro')
    cy.get('button[type=submit]') 
    ///(//button[contains(text(), "Create")])
    /// cy.contains("button", "Create").click()
        .click()
    
    
  })  
})