import * as React from 'react'
import { mount } from '@cypress/react'
import Button from './Button'

it('<Button/> => render', () => {
    mount(<Button label='Test' />)
    cy.get('button').should("be.visible")
    cy.get('button').contains('Test').click()
})

it('<Button/> => defualt', () => {
    mount(<Button label='Test' />)
    cy.get('button').should("have.class", 'bg-indigo-500')
})


it('<Button/> => primary', () => {
    mount(<Button design='primary' label='Test' />)
    cy.get('button').should("have.class", 'bg-indigo-500')
})

it('<Button/> => primary => hover', () => {
    mount(<Button design='primary' label='Test' />)
    cy.get('button').should("have.class", 'hover:bg-indigo-700')
})

it('<Button/> => secondary', () => {
    mount(<Button design='secondary' label='test' />)
    cy.get('button').should("have.class", 'bg-transparent')
    cy.get('button').should("have.class", 'border-indigo-500')
})

it('<Button/> => secondary => hover', () => {
    mount(<Button design='secondary' label='Test' />)
    cy.get('button').should("have.class", 'hover:border-indigo-700')
})

it('<Button/> => inline', () => {
    mount(<Button design='inline' label='test' />)
    cy.get('button').should("have.class", 'text-blue-500')
})

it('<Button/> => inline => hover', () => {
    mount(<Button design='inline' label='test' />)
    cy.get('button').should("have.class", 'hover:text-blue-700')
})

it('<Button/> => disabled', () => {
    mount(<Button disabled label='Test' />)
    cy.get('button').should("be.disabled")
})

it('<Button/> => click', () => {
    mount(<Button label='Test' />)
    cy.get('button').should("be.visible")
    cy.get('button').click()
})

