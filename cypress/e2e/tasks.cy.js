///<reference types="cypress"/>
import { faker } from '@faker-js/faker';
const randomName = faker.person.fullName();

describe('tarefas', () => {
    context('cadastro', () => {
        it('deve cadastrar uma nova tarefa', ()=> {

            const task1 = {
                name:"compras",
                is_done:false
            }
            cy.deleteTaskName(task1.name)
            cy.createTask(task1.name)
            cy.contains('main div p', task1.name)
          
        }) 
        it('Não deve permitir tarefa duplicada', ()=> {
            const task = {
                name:"Academia",
                is_done:false
            } 
            cy.createTask(task.name)
            cy.createTask(task.name)
            cy.contains('#swal2-html-container', 'Task already exists!')
        
        })
        it('Validar campo obrigatório', ()=> {          
            cy.createTask()
            cy.get('#newTask')
                .invoke('prop', 'validationMessage')
                .should((text) => {
                    expect(
                    'This is a required field'
                    ).to.eq(text)
            })
        })
    })
    context('atualização',() =>{
        it.only('deve concluir uma tarefa',()=> {
            const task3 ={
                name:'contas',
                is_done:false
            }

            cy.deleteTaskName(task3.name)
            cy.createTaskApi(task3)

            cy.visit('http://localhost:3000/')
            cy.contains('p', task3.name)
                .parent()
                .find('._listItemToggle_1kgm5_16')
                .click()

            cy.contains('p', task3.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })
    })
})