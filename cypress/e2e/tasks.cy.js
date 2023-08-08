///<reference types="cypress"/>
import { faker } from '@faker-js/faker';
const randomName = faker.person.fullName();

describe('tarefas', () => {
  it('deve cadastrar uma nova tarefa', ()=> {
    ///limpa a massa de teste faz um delete na requisição
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
    ///Validando task
    // cy.get('main div p')
    // .should('text', 'Ler um livro')
    cy.contains('main div p', 'Ler um livro')
  }) 

  it.only('Não deve permitir tarefa duplicada', () =>{

    cy.request({
        url: 'http://localhost:3333/helper/tasks',
        method: 'DELETE',
        body: {name:"Academia"}
    }).then((response)=>{
        expect(response.status).to.eq(204)
    })
    
      ///Dado que eu tenho uma tarefa duplicada
    cy.request({
        url: 'http://localhost:3333/tasks',
        method: 'POST',
        body: {name:"Academia", is_done:false }
    }).then((response)=>{
        expect(response.status).to.eq(201)
    })

    // cy.visit('http://localhost:3000')
    // cy.get('#newTask')
    //     .type('Academia')
    // cy.get('button[type=submit]')
    //     .click()

    cy.visit('http://localhost:3000')
    cy.get('#newTask')
        .type('Academia')
    cy.get('button[type=submit]')
        .click()
    cy.contains('#swal2-html-container', 'Task already exists!')

  })
})