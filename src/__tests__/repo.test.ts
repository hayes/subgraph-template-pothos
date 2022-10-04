
import { ApolloServer } from "@apollo/server";
import { schema } from "../schema";

const server = new ApolloServer({
  schema: schema,
});

describe("Repository Template Functionality", () => {
  it("Executes Location Entity Resolver", async () => {
    //Arrange
    const query = `query ($representations: [_Any!]!) {
      _entities(representations: $representations) {
        ...on Thing {
          name
        }
      }
    }`;
    const variables = {
      representations: [{ __typename: "Thing", id: "1" }],
    };
    const expected = {
      _entities: [{ name: "Name" }],
    };
    //Act
    const res = await server.executeOperation({
      query,
      variables,
    });
    //Assert
    expect(res.body.kind).toEqual("single");
    expect((res.body as any).singleResult.data).toEqual(expected);
  });
});
