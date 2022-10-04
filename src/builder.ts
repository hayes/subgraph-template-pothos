import SchemaBuilder from "@pothos/core";
import PothosDirectivesPlugin from "@pothos/plugin-directives";
import PothosFederationPlugin from "@pothos/plugin-federation";
import { DataSourceContext } from "./types/DataSourceContext";

export const builder = new SchemaBuilder<{
    Context: DataSourceContext
    Scalars: {
        ID: { Input: string, Output: string | number }
    }
}>({
    plugins: [PothosDirectivesPlugin, PothosFederationPlugin],
})
