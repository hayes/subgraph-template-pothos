import { printSubgraphSchema } from '@apollo/subgraph'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { builder } from '../builder'
import './Thing'

builder.queryType({})
builder.mutationType({})

export const schema = builder.toSubGraphSchema({})

console.log(resolve(__dirname, '../../schema.graphql'))
writeFileSync(
    resolve(__dirname, '../../schema.graphql'),
    printSubgraphSchema(builder.toSchema())
)
