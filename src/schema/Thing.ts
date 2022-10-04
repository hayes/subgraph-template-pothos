import { builder } from "../builder";

export interface ThingShape {
    id: string;
    name?: string | null;
}

export const Thing = builder.objectRef<ThingShape>("Thing").implement({
    fields: (t) => ({
        id: t.exposeID("id"),
        name: t.exposeString("name", { nullable: true }),
    }),
})

builder.asEntity(Thing, {
    key: builder.selection<{ id: string }>('id'),
    resolveReference (ref) {
        return { id: ref.id, name: "Name" };
    }
})

builder.queryField('thing', t => t.field({
    type: Thing,
    args: {
        id: t.arg.id({ required: true }),
    },
    resolve: async (_, args) => {
        return { id: args.id, name: "Name" };
    }
}))



const CreateThing = builder.inputType('CreateThing', {
    fields: t => ({
        id: t.id({ required: true }),
        name: t.string(),
    }),
})

builder.mutationField('createThing', t => t.field({
    type: Thing,
    args: {
        input: t.arg({ type: CreateThing, required: true }),
    },
    resolve: async (_, args) => {
        return { id: args.input.id, name: args.input.name };
    }
}))
