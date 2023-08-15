///<reference types="cypress"/>
import { faker } from '@faker-js/faker';
const randomName = faker.person.fullName();

describe('tarefas', () => {

    let testData;
    before (() => {
        cy.fixture('tasks').then(t => {
            testData = t
        })
    })

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
        it.only('Não deve permitir tarefa duplicada', ()=> {
            const task = testData.dup

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
        it('deve concluir uma tarefa',()=> {
            const task3 ={
                name:'contas',
                is_done:false
            }

            cy.deleteTaskName(task3.name)
            cy.createTaskApi(task3)

            cy.visit('/')
            cy.contains('p', task3.name)
                .parent()
                .find('._listItemToggle_1kgm5_16')
                .click()

            cy.contains('p', task3.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })
    })
})